// Where the corpus lives and how to read it.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { normaliseArabic } from "./arabic";
import type { CorpusRow } from "./parse";
import type { SourceInfo, SourceRow } from "./sources";

export const CACHE = ".cache/corpus";
export const CORPUS = `${CACHE}/corpus.jsonl`;
export const SOURCES_DIR = `${CACHE}/sources`;
export const CATALOGUE = `${CACHE}/sources.json`;
const INDEX_DIR = `${CACHE}/index`;
/** The catalogue id of the sunnah.com corpus in CORPUS. */
export const SUNNAH = "sunnah";

export const sourceFile = (id: string) => `${SOURCES_DIR}/${id}.jsonl`;
/** The JSON-lines file holding a source's rows. */
export const dataFile = (id: string) => (id === SUNNAH ? CORPUS : sourceFile(id));
const indexFile = (id: string, field: "ar" | "en") => `${INDEX_DIR}/${id}.${field}.txt`;

/** The lines of a file `bun run corpus` writes; throws with a hint when it has not been run. */
export function readLines(path: string): string[] {
  if (!existsSync(path)) throw new Error(`${path} not found: run \`bun run corpus\` first`);
  return readFileSync(path, "utf8").split("\n");
}

/** Every corpus row, keyed by ref. Throws with a hint when `bun run corpus` has not been run. */
export function loadCorpus(path = CORPUS): Map<string, CorpusRow> {
  const rows = new Map<string, CorpusRow>();
  for (const line of readLines(path)) {
    if (!line) continue;
    const r: CorpusRow = JSON.parse(line);
    rows.set(r.ref, r);
  }
  return rows;
}

/** The catalogue of every source, the sunnah.com corpus first. */
export function loadCatalogue(): SourceInfo[] {
  return JSON.parse(readLines(CATALOGUE).join("\n"));
}

/** The text search matches in a row: Arabic, and narrator plus English. */
export function searchText(r: CorpusRow | SourceRow): { ar: string; english: string } {
  const english = "narrator" in r ? [r.narrator, r.en].filter(Boolean).join(" ") : (r.en ?? "");
  return { ar: r.ar, english };
}

/**
 * Write a source's rows and its search index: per field, one line per row in row order, the Arabic
 * already normalised, so a search scans plain lines and parses only the rows that match.
 */
export function writeRows(id: string, rows: (CorpusRow | SourceRow)[]) {
  writeFileSync(dataFile(id), `${rows.map((r) => JSON.stringify(r)).join("\n")}\n`);
  mkdirSync(INDEX_DIR, { recursive: true });
  const texts = rows.map(searchText);
  const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");
  writeFileSync(indexFile(id, "ar"), `${texts.map((t) => normaliseArabic(t.ar)).join("\n")}\n`);
  writeFileSync(indexFile(id, "en"), `${texts.map((t) => oneLine(t.english)).join("\n")}\n`);
}

/** A source's index lines for one field, aligned with its rows. */
export const readIndex = (id: string, field: "ar" | "en") => readLines(indexFile(id, field));
