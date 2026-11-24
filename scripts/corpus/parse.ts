// Pure conversions from the two upstream sources to corpus rows.

export interface Grade {
  status: string;
  scholar: string;
  arabic: string;
}

/** One hadith in the local corpus. `ref` is the sunnah.com reference, e.g. "muslim:2331a". */
export interface CorpusRow {
  ref: string;
  collection: string;
  ar: string;
  en: string | null;
  narrator: string | null;
  book_no: string | null;
  book_en: string | null;
  book_ar: string | null;
  chapter_no: string | null;
  chapter_en: string | null;
  chapter_ar: string | null;
  in_book: string | null;
  grades: Grade[];
  url: string;
  source: "hf" | "fawaz-addon";
  /** The ref could not be derived with confidence; check it on sunnah.com before citing. */
  ref_uncertain?: true;
}

/** Upstream cells use null, "" and the string "None" for a missing value. */
export function nullish(v: unknown): string | null {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s === "" || s === "None" ? null : s;
}

/** "56.0" -> "56"; other values unchanged. */
export function intString(v: unknown): string | null {
  const s = nullish(v);
  return s && /^\d+\.0+$/.test(s) ? s.replace(/\.0+$/, "") : s;
}

/**
 * The hadith number in `ref_raw` ("Sahih Muslim 2331a", "Sahih al-Bukhari 299, 300, 301",
 * "Sahih Muslim 4 a") that has the given bare number, with its letter suffix if any.
 */
export function numberFromRefRaw(refRaw: string | null, bare: string): string | null {
  if (!refRaw) return null;
  const tail = refRaw.match(/(\d+\s?[a-z]?(?:\s*,\s*\d+\s?[a-z]?)*)\s*$/)?.[1];
  if (!tail) return null;
  for (const tok of tail.split(",")) {
    const n = tok.replace(/\s+/g, "");
    if (n.replace(/[a-z]$/, "") === bare) return n;
  }
  return null;
}

/** fawazahmed0 `arabicnumber` to a sunnah.com number: "2331.01" -> "2331a", "2331" -> "2331". */
export function arabicNumberToRef(arabicNumber: string | number | undefined): string | null {
  if (arabicNumber === undefined) return null;
  const m = String(arabicNumber).match(/^(\d+)(?:\.(\d{1,2}))?$/);
  if (!m?.[1]) return null;
  if (!m[2]) return m[1];
  const i = Number(m[2]);
  return i >= 1 && i <= 26 ? `${m[1]}${String.fromCharCode(96 + i)}` : null;
}

export function parseGrades(json: string | null): Grade[] {
  if (!json) return [];
  const list: unknown = JSON.parse(json);
  if (!Array.isArray(list)) throw new Error(`gradings is not a list: ${json}`);
  return list.map((g: Record<string, unknown>) => ({
    status: String(g.status ?? ""),
    scholar: String(g.scholar ?? ""),
    arabic: String(g.arabic ?? ""),
  }));
}

/** "Sahih (Al-Albani)"; several grades joined with "; "; null when ungraded. */
export const formatGrades = (grades: Grade[]): string | null =>
  grades.length ? grades.map((g) => `${g.status} (${g.scholar})`).join("; ") : null;

export type HfRow = Record<string, unknown>;

/** A row of freococo/sunnah_dataset as a corpus row. */
export function fromHf(r: HfRow): CorpusRow {
  const url = nullish(r.url) ?? "";
  const m = url.match(/^https:\/\/sunnah\.com\/([a-z]+)([:/])(\d+)([a-z]?)$/);
  const slug = m?.[1] ?? url.match(/^https:\/\/sunnah\.com\/([a-z]+)/)?.[1];
  if (!slug) throw new Error(`unexpected url: ${url}`);
  let n: string | null = null;
  // A book page (sunnah.com/mishkat/30) names no hadith; the dataset's own id stands in.
  if (m?.[2] === ":" && m[3]) n = numberFromRefRaw(nullish(r.ref_raw), m[3]) ?? `${m[3]}${m[4]}`;
  const row: CorpusRow = {
    ref: `${slug}:${n ?? nullish(r.hadith_id)}`,
    collection: slug,
    ar: nullish(r.arabic_full) ?? "",
    en: nullish(r.text_en),
    narrator: nullish(r.narrator_en),
    book_no: intString(r.book_no),
    book_en: nullish(r.book_en),
    // Some upstream titles start with a stray "-".
    book_ar: nullish(r.book_ar)?.replace(/^-/, "") ?? null,
    chapter_no: intString(r.chapter_no),
    chapter_en: nullish(r.chapter_en),
    chapter_ar: nullish(r.chapter_ar),
    in_book: nullish(r.in_book_ref_raw),
    grades: parseGrades(nullish(r.gradings)),
    url,
    source: "hf",
  };
  if (!n) row.ref_uncertain = true;
  return row;
}

export interface FawazHadith {
  hadithnumber: number;
  arabicnumber?: string | number;
  text: string;
  grades: { name: string; grade: string }[];
  reference: { book: number; hadith: number };
}

/** "Abu Huraira reported: text" -> ["Abu Huraira reported:", "text"]. */
export function splitNarrator(en: string): [string | null, string] {
  const m = en.match(/^([^:"“]{3,100}?\b(?:reported|narrated|said)\b[^:"“]{0,60}:)\s*/i);
  return m?.[1] ? [m[1].trim(), en.slice(m[0].length)] : [null, en];
}
