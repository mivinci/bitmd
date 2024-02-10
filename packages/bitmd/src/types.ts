import type { MarkedExtension } from "marked";


export type Props = {
  value: string,
  readonly?: boolean,
  plugins?: Plugin[],
};

export type Plugin = {
  title: string,
  icon?: string,
  position?: "left" | "right",
  onclick?: EventListener,
  onselect?: EventListener,
  extension?: MarkedExtension,
};

export type Event = MouseEvent & {
  textarea: HTMLTextAreaElement,
};

export type EventListener = (e: Event) => Promise<EventListenerResult>;

export type EventListenerResult = { value: string } | void;
