import type { MarkedExtension } from "marked";


export type Props = {
  value: string,
  readonly?: boolean,
  plugins?: Plugin[],
};

export type Plugin = {
  title: string,
  icon: string,
  listener?: EventListener,
  extension?: MarkedExtension,
};

export type Event = {
  target: HTMLElement,
  textarea: HTMLTextAreaElement,
  value: string,
};

export type EventListener = (e: Event) => {
  value: string,
};
