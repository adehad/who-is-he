import { CORNER } from "@/art/corner";

export type Attrs = Record<string, string | boolean | null | undefined>;
export type Kid = Node | string | null | false | undefined;

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  ...kids: (Kid | Kid[])[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v === true ? "" : v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid);
  return el;
}

export const raw = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Attrs,
  html: string,
): HTMLElementTagNameMap[K] => {
  const el = h(tag, attrs);
  el.innerHTML = html;
  return el;
};

export const $ = (id: string): HTMLElement => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`#${id} missing`);
  return el;
};

/** By id, narrowed to an element class, e.g. `$as("next", HTMLButtonElement)`, `$as("ring", SVGSVGElement)`. */
export const $as = <T extends Element>(id: string, type: abstract new () => T): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`#${id} missing`);
  if (!(el instanceof type)) throw new Error(`#${id} is not a ${type.name}`);
  return el;
};

export const corners = (): HTMLSpanElement[] =>
  ["c1", "c2", "c3", "c4"].map((c) => raw("span", { class: `corner ${c}` }, CORNER));

/** Restart a CSS entry animation by re-adding the class after a reflow. */
export const replay = (el: HTMLElement, cls = "enter"): void => {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
};
