// Write data/texts.json (bun run texts): every hadith the site cites, taken from the corpus.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import type { Correction } from "@/data/texts";
import { loadCorpus } from "./corpus";
import type { CorpusRow, Grade } from "./parse";

const SOURCES = ["src/data/stations", "src/data/story"];
const OUT = "data/texts.json";
const REF = /"([a-z]+:\d+[a-z]?)"/g;

/** "Sahih (Al-Albani)"; several grades joined with "; "; null when ungraded. */
const formatGrades = (grades: Grade[]): string | null =>
  grades.length ? grades.map((g) => `${g.status} (${g.scholar})`).join("; ") : null;

function citedRefs(): Set<string> {
  const refs = new Set<string>();
  for (const dir of SOURCES)
    for (const f of readdirSync(dir).filter((f) => f.endsWith(".ts")))
      for (const m of readFileSync(`${dir}/${f}`, "utf8").matchAll(REF)) if (m[1]) refs.add(m[1]);
  return refs;
}

/** Corrections for texts the site does not cite are not applied at build, so check them here. */
function uncitedCorrectionProblems(corpus: Map<string, CorpusRow>, cited: Set<string>): string[] {
  const list: Correction[] = JSON.parse(readFileSync("data/corrections.json", "utf8"));
  return list.flatMap((c) => {
    if (cited.has(c.ref)) return [];
    const row = corpus.get(c.ref);
    if (!row) return [`${c.ref}: not in the corpus`];
    const n = (row[c.field] ?? "").split(c.find).length - 1;
    return n === 1
      ? []
      : [`${c.ref} ${c.field}: find occurs ${n} times: ${JSON.stringify(c.find)}`];
  });
}

const toText = (r: CorpusRow) => ({
  ar: r.ar,
  narrator: r.narrator ?? "",
  en: r.en ?? "",
  ch: Number(r.book_no),
  ch_en: r.book_en ?? "",
  ch_ar: r.book_ar ?? "",
  in_book: r.in_book,
  grade: formatGrades(r.grades),
});

if (import.meta.main) {
  const corpus = loadCorpus();
  const cited = citedRefs();
  const refs = [...cited].sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  const problems = [
    ...refs.filter((r) => !corpus.has(r)).map((r) => `${r}: not in the corpus`),
    ...uncitedCorrectionProblems(corpus, cited),
  ];
  if (problems.length) {
    console.error(`texts not written:\n  ${problems.join("\n  ")}`);
    process.exit(1);
  }
  const uncertain = refs.filter((r) => corpus.get(r)?.ref_uncertain);
  if (uncertain.length) console.warn(`uncertain sunnah.com refs: ${uncertain.join(", ")}`);
  const texts = Object.fromEntries(
    refs.flatMap((r) => {
      const row = corpus.get(r);
      return row ? [[r, toText(row)]] : [];
    }),
  );
  writeFileSync(OUT, `${JSON.stringify(texts, null, 2)}\n`);
  console.log(`wrote ${refs.length} texts to ${OUT}`);
}
