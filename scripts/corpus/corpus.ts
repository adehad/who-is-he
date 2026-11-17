// Where the corpus lives and how to read it.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import type { CorpusRow } from "./parse";
import type { SourceRow } from "./sources";

export const CACHE = ".cache/corpus";
export const CORPUS = `${CACHE}/corpus.jsonl`;
export const SOURCES_DIR = `${CACHE}/sources`;
export const CATALOGUE = `${CACHE}/sources.json`;
/** The catalogue id of the sunnah.com corpus in CORPUS. */
export const SUNNAH = "sunnah";

export const sourceFile = (id: string) => `${SOURCES_DIR}/${id}.jsonl`;
/** The JSON-lines file holding a source's rows. */
export const dataFile = (id: string) => (id === SUNNAH ? CORPUS : sourceFile(id));

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

/** Write a source's rows, one JSON line each. */
export function writeRows(id: string, rows: (CorpusRow | SourceRow)[]) {
  writeFileSync(dataFile(id), `${rows.map((r) => JSON.stringify(r)).join("\n")}\n`);
}
