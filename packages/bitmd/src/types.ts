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
  onclick?: EventHandler<Event & MouseEvent>,
  onmounted?: EventHandler,
  extension?: MarkedExtension,
};

export type Event = {
  textarea: HTMLTextAreaElement,
};

export type EventHandler<E extends Event = Event, R extends EventHandlerResult = EventHandlerResult> = (e: E) => Promise<R>;

export type EventHandlerResult = { value: string } | void;
