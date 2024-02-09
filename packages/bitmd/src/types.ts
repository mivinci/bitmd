import type { MarkedExtension } from "marked";


export type Props = {
  value: string,
  readonly?: boolean,
  plugins?: Plugin[],
};

export type Plugin = {
  extension: MarkedExtension
  listener: EventListener,
};

export type Event = {
  target: HTMLElement,
};

export type EventListener = (e: Event) => void;
