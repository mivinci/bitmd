import type { Plugin } from "./types";

const icons = {
  headding: `<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12h10M7 5v14M17 5v14m-2 0h4M15 5h4M5 19h4M5 5h4"/></svg>`,
  bold: `<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 5h6a3.5 3.5 0 0 1 0 7H7zm6 7h1a3.5 3.5 0 0 1 0 7H7v-7"/></svg>`,
  italic: `<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5h6M7 19h6m1-14l-4 14"/></svg>`,
  link: `<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.068 5.068 0 0 1-7.127 0a4.972 4.972 0 0 1 0-7.071L6 11"/></svg>`,
  code: `<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 7l5 5l-5 5m7 2h7"/></svg>`
};

type ClampTitle = "headding" | "bold" | "italic" | "link" | "code";

function h(i: number): Plugin {
  return {
    title: `h${i}`,
    icon: icons["headding"],
    listener: (e) => {
      const { selectionStart, selectionEnd } = e.textarea;
      const selected = e.value.slice(selectionStart, selectionEnd);
      const value = `${e.value.slice(0, selectionStart)}\n${"#".repeat(i)} ${selected}\n${e.value.slice(selectionEnd)}`;
      e.textarea.focus();
      return { value };
    }
  }
}

function clamp(title: ClampTitle, l: string, r: string): Plugin {
  return {
    title,
    icon: icons[title],
    listener: (e) => {
      const { selectionStart, selectionEnd } = e.textarea;
      const selected = e.value.slice(selectionStart, selectionEnd);
      const value = `${e.value.slice(0, selectionStart)}${l}${selected}${r}${e.value.slice(selectionEnd)}`;
      e.textarea.focus();
      return { value };
    }
  }
}

export const builtin_plugins = [
  h(1),
  clamp("bold", "**", "**"),
  clamp("italic", "*", "*"),
  clamp("link", "[", "](url)"),
  clamp("code", "\n```\n", "\n```\n"),
];
