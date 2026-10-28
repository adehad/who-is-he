// The slice of each resolved text that the browser renders, served as /texts.json (src/pages/texts.json.ts).
// Server-safe and type-only for the client: src/client imports just the types from here.
import type { Text } from "@/data/texts";
import type { Ref } from "@/models/ref";

/** Keep exactly the fields src/client/cite.ts reads, so raw dataset fields never reach the page. */
export const toClientText = ({ ar, narrator, en, ch, ch_en, ch_ar, sunnah, corrected }: Text) => ({
  ar,
  narrator,
  en,
  ch,
  ch_en,
  ch_ar,
  ...(sunnah ? { sunnah: { ref: sunnah.ref, grade: sunnah.grade } } : {}),
  ...(corrected ? { corrected } : {}),
});

export type ClientText = ReturnType<typeof toClientText>;
export type ClientTexts = Partial<Record<Ref, ClientText>>;

export const toClientTexts = (texts: Record<Ref, Text>): ClientTexts =>
  Object.fromEntries(Object.entries<Text>(texts).map(([ref, t]) => [ref, toClientText(t)]));
