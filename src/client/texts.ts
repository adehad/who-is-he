// Resolved texts, fetched once from the build-time /texts.json before the first render.
import type { ClientText, ClientTexts } from "@/lib/client-texts";
import type { Ref } from "@/models/ref";
import { $, h } from "./dom";

let texts: ClientTexts = {};

export async function loadTexts(): Promise<void> {
  const url = `${import.meta.env.BASE_URL.replace(/\/?$/, "/")}texts.json`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  texts = await r.json();
}

export const hasText = (ref: Ref): boolean => ref in texts;

export function textFor(ref: Ref): ClientText {
  const t = texts[ref];
  if (!t) throw new Error(`no text for ${ref}`);
  return t;
}

/** Shown in place of the cards (both modes) when the texts cannot be loaded. */
export function showTextsError(e: unknown): void {
  console.error(e);
  const msg = () =>
    h(
      "p",
      { class: "k-explain", role: "alert" },
      "Sorry, the texts could not be loaded. Check your connection and reload the page.",
    );
  $("cards").replaceChildren(msg());
  $("sinner").replaceChildren(msg());
}
