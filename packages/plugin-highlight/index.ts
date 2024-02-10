import type { Plugin } from "bitmd";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

function highlight(): Plugin {
  return {
    title: "highlight",
    extension: markedHighlight({
      langPrefix: "hljs lang-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      }
    })
  };
}

export default highlight;
