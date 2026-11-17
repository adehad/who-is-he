// Arabic folding for matching and search: the same letters compare equal however they are voweled.

const SAW = "صلى الله عليه وسلم";

// Harakat, Quranic annotation marks, superscript alef, tatweel and directional marks.
const MARKS = /[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed\u0640\u200c-\u200f]/g;
const FOLD: Record<string, string> = {
  أ: "ا",
  إ: "ا",
  آ: "ا",
  ٱ: "ا",
  ى: "ي",
  ؤ: "و",
  ئ: "ي",
};

export interface NormaliseOptions {
  /** Fold ة to ه (off by default: it merges words such as رحمة and رحمه). */
  taMarbuta?: boolean;
}

/** Strip marks, fold letter variants, expand ﷺ and collapse whitespace. */
export function normaliseArabic(s: string, opts: NormaliseOptions = {}): string {
  let out = s.replaceAll("ﷺ", SAW).replace(MARKS, "");
  out = out.replace(/[\u0623\u0625\u0622\u0671\u0649\u0624\u0626]/g, (c) => FOLD[c] ?? c);
  if (opts.taMarbuta) out = out.replaceAll("ة", "ه");
  return out.replace(/\s+/g, " ").trim();
}

/** Arabic word set of `s` after normalising, for overlap scores. */
export function arabicWords(s: string): Set<string> {
  return new Set(
    normaliseArabic(s, { taMarbuta: true })
      .replace(/[^\u0621-\u064a ]+/g, " ")
      .split(" ")
      .filter(Boolean),
  );
}

/** Jaccard overlap of the two texts' word sets, 0..1. */
export function arabicSimilarity(a: string, b: string): number {
  const x = arabicWords(a);
  const y = arabicWords(b);
  let common = 0;
  for (const w of x) if (y.has(w)) common++;
  const union = x.size + y.size - common;
  return union ? common / union : 0;
}
