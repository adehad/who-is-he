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

const MARK = new RegExp(MARKS.source);

/**
 * `normaliseArabic` that also returns, for each output character, the index of the input character
 * it came from, so a match in the normalised text can be shown in the original.
 */
export function normaliseWithOffsets(
  s: string,
  opts: NormaliseOptions = {},
): { text: string; offsets: number[] } {
  let text = "";
  const offsets: number[] = [];
  const push = (out: string, i: number) => {
    text += out;
    for (let k = 0; k < out.length; k++) offsets.push(i);
  };
  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i);
    if (c === "ﷺ") for (const k of SAW) push(FOLD[k] ?? k, i);
    else if (MARK.test(c)) continue;
    else if (/\s/.test(c)) {
      if (text && !text.endsWith(" ")) push(" ", i);
    } else push(opts.taMarbuta && c === "ة" ? "ه" : (FOLD[c] ?? c), i);
  }
  if (text.endsWith(" ")) {
    text = text.slice(0, -1);
    offsets.pop();
  }
  return { text, offsets };
}

const LETTER = "[ء-ي]";

/**
 * A loose regex for one word containing the root's letters in order, with up to `gap` letters
 * between them (prefixes and suffixes are free). It over-matches (any word with those letters in
 * order) and under-matches roots whose weak letters drop or change, as in قال from ق و ل.
 * A doubled root letter written once with a shadda is also missed (search شم for ش م م).
 * A hamza in the root matches any of its seats.
 */
export function rootRegex(root: string, gap = 2): RegExp {
  const letters = [...normaliseArabic(root).replace(/[^\u0621-\u064a]/g, "")];
  if (letters.length < 2 || letters.length > 4)
    throw new Error(`a root has 2 to 4 letters: ${JSON.stringify(root)}`);
  const body = letters.map((l) => (l === "ء" ? "[ءاوي]" : l)).join(`${LETTER}{0,${gap}}`);
  return new RegExp(`(?<!${LETTER})${LETTER}*?${body}${LETTER}*(?!${LETTER})`);
}

/**
 * A root or headword folded for comparing lexicon entries: Arabic letters only, every hamza seat
 * and alef as ء (lexicons write a hamza radical on different seats), ى as ي.
 */
export function rootKey(s: string): string {
  return normaliseArabic(s.replace(/[أإآٱاؤئ]/g, "ء")).replace(/[^ء-ي]/g, "");
}
