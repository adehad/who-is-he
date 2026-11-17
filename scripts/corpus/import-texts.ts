// Write data/texts.json (bun run texts): every text the site cites, taken from the corpus.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import type { Correction, RawText, SourceText } from "@/data/texts";
import { WORKS } from "@/lib/citation";
import { loadCatalogue, loadCorpus, readLines, SUNNAH, sourceFile } from "./corpus";
import { type CorpusRow, formatGrades } from "./parse";
import type { SourceInfo, SourceRow } from "./sources";

const SOURCES = ["src/data/stations", "src/data/story"];
const OUT = "data/texts.json";
/** A quoted ref: `shamail:8`, `tabarani-kabir:22/414`, `quran:68:4`, `lisan:ضلع`. */
const REF = /"([a-z][a-z-]*:[^"\s]+)"/g;

function citedRefs(): Set<string> {
  const refs = new Set<string>();
  for (const dir of SOURCES)
    for (const f of readdirSync(dir).filter((f) => f.endsWith(".ts")))
      for (const m of readFileSync(`${dir}/${f}`, "utf8").matchAll(REF)) if (m[1]) refs.add(m[1]);
  return refs;
}

const sourceOf = (ref: string) => ref.slice(0, ref.indexOf(":"));

/** The rows of `refs` that other sources (not sunnah.com) hold, reading each source's file once. */
function loadSourceRows(refs: string[], ids: Set<string>): Map<string, SourceRow> {
  const rows = new Map<string, SourceRow>();
  const bySource = Map.groupBy(
    refs.filter((r) => ids.has(sourceOf(r))),
    sourceOf,
  );
  for (const [id, wanted] of bySource) {
    const prefixes = new Set(wanted.map((r) => `{"ref":${JSON.stringify(r)},`));
    for (const line of readLines(sourceFile(id)))
      if (prefixes.has(line.slice(0, line.indexOf(",") + 1))) {
        const row: SourceRow = JSON.parse(line);
        rows.set(row.ref, row);
      }
  }
  return rows;
}

/** Corrections for texts the site does not cite are not applied at build, so check them here. */
function uncitedCorrectionProblems(
  list: Correction[],
  lookup: (ref: string) => Partial<Record<Correction["field"], string | null>> | undefined,
  cited: Set<string>,
): string[] {
  return list.flatMap((c) => {
    if (cited.has(c.ref)) return [];
    const row = lookup(c.ref);
    if (!row) return [`${c.ref}: not in the corpus`];
    const n = (row[c.field] ?? "").split(c.find).length - 1;
    return n === 1
      ? []
      : [`${c.ref} ${c.field}: find occurs ${n} times: ${JSON.stringify(c.find)}`];
  });
}

const fromCorpus = (r: CorpusRow) => ({
  ar: r.ar,
  narrator: r.narrator ?? "",
  en: r.en ?? "",
  ch: Number(r.book_no),
  ch_en: r.book_en ?? "",
  ch_ar: r.book_ar ?? "",
  in_book: r.in_book,
  grade: formatGrades(r.grades),
});

/** The print edition as OpenITI's metadata gives it, without the catalogue links it repeats. */
const editionOf = (info: SourceInfo) =>
  info.edition
    .split(" :: ")
    .map((s) => s.replace(/https?:\/\/\S+\s*/g, "").trim())
    .filter(Boolean)
    .join(" :: ")
    .replace(/ :: \(/g, " (");

const fromSource = (r: SourceRow, info: SourceInfo): SourceText => ({
  ar: r.ar,
  ...(r.en ? { en: r.en } : {}),
  source: r.source,
  kind: r.kind,
  edition: editionOf(info),
  ...(r.vol !== undefined ? { vol: r.vol } : {}),
  ...(r.page !== undefined ? { page: r.page } : {}),
  ...(r.grade ? { grade: r.grade } : {}),
  ...(r.heading ? { heading: r.heading } : {}),
  ...(r.headword ? { headword: r.headword } : {}),
});

if (import.meta.main) {
  const catalogue = new Map(
    loadCatalogue()
      .filter((i) => i.id !== SUNNAH)
      .map((i) => [i.id, i]),
  );
  const corrections: Correction[] = JSON.parse(readFileSync("data/corrections.json", "utf8"));
  const cited = citedRefs();
  const refs = [...cited].sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  const corpus = loadCorpus();
  const others = loadSourceRows(
    [...refs, ...corrections.map((c) => c.ref)],
    new Set(catalogue.keys()),
  );
  const lookup = (ref: string) => corpus.get(ref) ?? others.get(ref);
  const problems = [
    ...refs.filter((r) => !lookup(r)).map((r) => `${r}: not in the corpus`),
    ...[...new Set(refs.flatMap((r) => (others.has(r) ? [sourceOf(r)] : [])))]
      .filter((id) => !WORKS[id])
      .map((id) => `${id}: no citation form in src/lib/citation.ts`),
    ...uncitedCorrectionProblems(corrections, lookup, cited),
  ];
  if (problems.length) {
    console.error(`texts not written:\n  ${problems.join("\n  ")}`);
    process.exit(1);
  }
  const uncertain = refs.filter((r) => corpus.get(r)?.ref_uncertain);
  if (uncertain.length) console.warn(`uncertain sunnah.com refs: ${uncertain.join(", ")}`);
  const texts = Object.fromEntries(
    refs.flatMap((r): [string, RawText][] => {
      const row = corpus.get(r);
      if (row) return [[r, fromCorpus(row)]];
      const other = others.get(r);
      const info = other && catalogue.get(other.source);
      return other && info ? [[r, fromSource(other, info)]] : [];
    }),
  );
  writeFileSync(OUT, `${JSON.stringify(texts, null, 2)}\n`);
  console.log(`wrote ${refs.length} texts to ${OUT}`);
}
