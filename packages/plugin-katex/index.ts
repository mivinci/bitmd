import type { Plugin } from "bitmd";
import type { TokenizerAndRendererExtension } from "marked";
import __katex, { type KatexOptions } from "katex";

const regex_inline = /^(\${1,2})(?!\$)((?:\\.|[^\\\n])*?(?:\\.|[^\\\n\$]))\1(?=[\s?!\.,:？！。，：]|$)/;
const regex_block = /^(\${1,2})\n((?:\\[^]|[^\\])+?)\n\1(?:\n|$)/;

export type Options = KatexOptions & {};

function inline(opts: Options): TokenizerAndRendererExtension {
  return {
    name: 'katex_inline',
    level: 'inline',
    start(src) {
      let index;
      let index_src = src;

      while (index_src) {
        index = index_src.indexOf('$');
        if (index === -1) {
          return;
        }
        if (index === 0 || index_src.charAt(index - 1) === ' ') {
          const possible_katex = index_src.substring(index);
          if (possible_katex.match(regex_inline)) {
            return index;
          }
        }
        index_src = index_src.substring(index + 1).replace(/^\$+/, '');
      }
    },
    tokenizer(src, tokens) {
      const match = src.match(regex_inline);
      if (match) {
        return {
          type: 'katex_inline',
          raw: match[0],
          text: match[2].trim(),
          displayMode: match[1].length === 2
        };
      }
    },
    renderer(token) {
      return __katex.renderToString(token.text, opts);
    }
  };
}

function block(opts: Options): TokenizerAndRendererExtension {
  return {
    name: 'katex_block',
    level: 'block',
    tokenizer(src, tokens) {
      const match = src.match(regex_block);
      if (match) {
        return {
          type: 'katex_block',
          raw: match[0],
          text: match[2].trim(),
          displayMode: match[1].length === 2,
        };
      }
    },
    renderer(token) {
      return __katex.renderToString(token.text, {
        ...opts,
        displayMode: true,
      });
    }
  }
}

function katex(opts?: Options): Plugin {
  const options = opts ?? {
    throwOnError: false,
  };
  return {
    title: "math",
    icon: `<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 5h-7L8 19l-3-6H3m11 0l6 6m-6 0l6-6"/></svg>`,
    position: "left",
    onclick: async (e) => {
      let updated;
      const { selectionStart, selectionEnd, value } = e.textarea;
      if (selectionStart === selectionEnd) {
        updated = `${value.substring(0, selectionStart)}\n\n$$\n\n$$\n\n${value.substring(selectionStart)}`;
        e.textarea.selectionStart += 4;
        e.textarea.selectionEnd = e.textarea.selectionStart;
      } else {
        const selected = value.substring(selectionStart, selectionEnd);
        updated = `${value.substring(0, selectionStart)} $${selected}$ ${value.substring(selectionEnd)}`;
        e.textarea.selectionStart = e.textarea.selectionEnd;
      }
      return { value: updated };
    },
    extension: {
      extensions: [
        inline(options),
        block(options),
      ],
    }
  };
}

export default katex;
