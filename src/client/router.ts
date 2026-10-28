import { STATIONS } from "@/data/stations";
import { swUpdated } from "./sw";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
export type Route = { mode: "learn"; station: number } | { mode: "story" };

export function pathFor(r: Route): string {
  if (r.mode === "story") return `${base}/story/`;
  const s = r.station > 0 ? STATIONS[r.station] : undefined;
  return s ? `${base}/learn/${s.id}/` : `${base}/`;
}

export function parse(pathname: string): Route | null {
  const rest = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  if (rest === "/" || rest === "") return { mode: "learn", station: 0 };
  if (rest === "/story/") return { mode: "story" };
  const m = rest.match(/^\/learn\/([^/]+)\/$/);
  const i = m ? STATIONS.findIndex((s) => s.id === m[1]) : -1;
  return i > 0 ? { mode: "learn", station: i } : null;
}

/**
 * Push only when the path changes, so re-renders don't flood history. After a service worker
 * update the page's HTML may be stale, so load the route as a full page instead.
 */
export function push(r: Route): void {
  const p = pathFor(r);
  if (location.pathname === p) return;
  if (swUpdated()) location.assign(p);
  else history.pushState(r, "", p);
}
