import type { StationId } from "@/data/stations";

/** Cross-mode navigation, provided by app.ts (which owns setMode) to avoid an import cycle. */
export interface Handlers {
  openStation: (id: StationId) => void;
  openStory: (k: number) => void;
}

const missing = (): never => {
  throw new Error("setHandlers not called");
};
export const handlers: Handlers = { openStation: missing, openStory: missing };
export const setHandlers = (h: Handlers): void => {
  Object.assign(handlers, h);
};
