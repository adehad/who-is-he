// The Sahih Muslim add-on: hadiths fawazahmed0/hadith-api has and freococo/sunnah_dataset lacks.
import type { ColumnSource } from "hyparquet-writer";
import { arabicSimilarity } from "./arabic";
import { arabicNumberToRef, type CorpusRow, type FawazHadith, splitNarrator } from "./parse";

/** Same-number texts at or above this word overlap are taken to be the same hadith. */
const SAME_TEXT = 0.8;

export interface AddonStats {
  fawaz: number;
  noNumber: number;
  emptyText: number;
  inHf: number;
  inHfUnderOtherLetter: number;
  overlapDisagree: string[];
  added: number;
  uncertain: Record<string, string>;
}

const base = (ref: string) => ref.replace(/[a-z]$/, "");

/**
 * Rows for every fawaz hadith whose derived sunnah.com number is not already in `hf` (Muslim rows
 * keyed by number, e.g. "2331a"). Rows whose number may not match sunnah.com get `ref_uncertain`.
 */
export function buildAddon(
  ara: FawazHadith[],
  eng: FawazHadith[],
  sections: Record<string, string>,
  hf: Map<string, CorpusRow>,
): { rows: CorpusRow[]; stats: AddonStats } {
  const stats: AddonStats = {
    fawaz: ara.length,
    noNumber: 0,
    emptyText: 0,
    inHf: 0,
    inHfUnderOtherLetter: 0,
    overlapDisagree: [],
    added: 0,
    uncertain: {},
  };
  const english = new Map(eng.map((h) => [h.hadithnumber, h.text]));
  const hfByBase = new Map<string, string[]>();
  for (const n of hf.keys()) hfByBase.set(base(n), [...(hfByBase.get(base(n)) ?? []), n]);

  const numbered = ara.flatMap((h) => {
    const n = arabicNumberToRef(h.arabicnumber);
    if (!n) stats.noNumber++;
    else if (!h.text.trim()) stats.emptyText++;
    else return [{ h, n }];
    return [];
  });
  const seen = new Map<string, number>();
  const fawazByBase = new Map<string, string[]>();
  for (const { n } of numbered) {
    seen.set(n, (seen.get(n) ?? 0) + 1);
    fawazByBase.set(base(n), [...(fawazByBase.get(base(n)) ?? []), n]);
  }

  const rows: CorpusRow[] = [];
  for (const { h, n } of numbered) {
    const inHf = hf.get(n);
    if (inHf) {
      stats.inHf++;
      if (arabicSimilarity(inHf.ar, h.text) < SAME_TEXT) stats.overlapDisagree.push(n);
      continue;
    }
    const siblings = hfByBase.get(base(n)) ?? [];
    if (siblings.some((s) => arabicSimilarity(hf.get(s)?.ar ?? "", h.text) >= SAME_TEXT)) {
      stats.inHfUnderOtherLetter++;
      continue;
    }
    let why: string | null = null;
    if ((seen.get(n) ?? 0) > 1) why = "derived number collides with another fawaz hadith";
    else if (/\d$/.test(n) && (fawazByBase.get(n) ?? []).some((s) => s !== n))
      why = "plain number beside lettered siblings";
    else if (siblings.some((s) => /\d$/.test(s) !== /\d$/.test(n)))
      why = "sunnah.com letters this number differently";
    else if (h.reference.book === 0) why = "introduction";

    const [narrator, en] = splitNarrator(english.get(h.hadithnumber)?.trim() ?? "");
    const row: CorpusRow = {
      ref: `muslim:${n}`,
      collection: "muslim",
      ar: h.text.trim(),
      en: en || null,
      narrator,
      book_no: String(h.reference.book),
      book_en: sections[String(h.reference.book)]?.trim() || null,
      book_ar: null,
      chapter_no: null,
      chapter_en: null,
      chapter_ar: null,
      in_book: `Book ${h.reference.book}, Hadith ${h.reference.hadith}`,
      grades: h.grades.map((g) => ({ status: g.grade, scholar: g.name, arabic: "" })),
      url: `https://sunnah.com/muslim:${n}`,
      source: "fawaz-addon",
    };
    if (why) {
      row.ref_uncertain = true;
      stats.uncertain[row.ref] = why;
    }
    rows.push(row);
  }
  stats.added = rows.length;
  return { rows, stats };
}

/** The add-on in freococo/sunnah_dataset's own columns and order, for an upstream contribution. */
export function toHfColumns(rows: CorpusRow[]): ColumnSource[] {
  const num = (r: CorpusRow) => r.ref.split(":")[1] ?? "";
  const text = (name: string, f: (r: CorpusRow) => string | null): ColumnSource => ({
    name,
    data: rows.map(f),
    type: "STRING",
  });
  const none = (name: string, type: "STRING" | "INT64" = "STRING"): ColumnSource => ({
    name,
    data: rows.map(() => null),
    type,
  });
  return [
    none("freococo_id", "INT64"),
    text("arabic_full", (r) => r.ar),
    text("english_full", (r) => [r.narrator, r.en].filter(Boolean).join(" ") || null),
    text("gradings", (r) => JSON.stringify(r.grades)),
    text("collection", () => "Sahih Muslim"),
    text("hadith_id", num),
    text("hadith_no_in_book", (r) => r.in_book?.match(/Hadith (\d+)/)?.[1] ?? null),
    text("book_no", (r) => r.book_no),
    text("book_en", (r) => r.book_en),
    text("book_ar", (r) => r.book_ar),
    none("chapter_no"),
    none("chapter_en"),
    none("chapter_ar"),
    text("url", (r) => r.url),
    none("sunnah_id", "INT64"),
    text("narrator_en", (r) => r.narrator),
    text("text_en", (r) => r.en),
    none("arabic_sanad"),
    text("arabic_matn", (r) => r.ar),
    text("ref_raw", (r) => `Sahih Muslim ${num(r)}`),
    text("in_book_ref_raw", (r) => r.in_book),
    none("trans_ref_raw"),
    none("trans_vol"),
    none("trans_book_no"),
    none("trans_hadith_no"),
  ];
}
