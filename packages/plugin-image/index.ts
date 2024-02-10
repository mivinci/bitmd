import type { Plugin, EventListenerResult } from "bitmd";

export type Options = {
  upload?: (f: File) => Promise<string>,
};

function image(opts?: Options): Plugin {
  const options = opts ?? {}
  options.upload ??= async (f: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(f);
    });
  }
  return {
    title: "image",
    icon: `<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 8h.01M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9s-9-1.8-9-9s1.8-9 9-9"/><path d="M3.5 15.5L8 11c.928-.893 2.072-.893 3 0l5 5"/><path d="m14 14l1-1c.928-.893 2.072-.893 3 0l2.5 2.5"/></g></svg>`,
    position: "left",
    onclick: async (event) => {
      return new Promise<EventListenerResult>((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async (e) => {
          // @ts-ignore
          const file = e.target.files[0];
          const url = await options.upload!(file);
          const { selectionEnd, value } = event.textarea;
          const updated = `${value.substring(0, selectionEnd)}\n![](${url})\n${value.substring(selectionEnd)}`;
          input.remove();
          resolve({ value: updated });
        };
        input.click();
      })
    }
  }
}

export default image;
