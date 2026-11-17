// Where the corpus lives and how to read it.
import { existsSync, readFileSync } from "node:fs";
import type { CorpusRow } from "./parse";

export const CACHE = ".cache/corpus";
export const CORPUS = `${CACHE}/corpus.jsonl`;

/** Every corpus row, keyed by ref. Throws with a hint when `bun run corpus` has not been run. */
export function loadCorpus(path = CORPUS): Map<string, CorpusRow> {
  if (!existsSync(path)) throw new Error(`${path} not found: run \`bun run corpus\` first`);
  const rows = new Map<string, CorpusRow>();
  for (const line of readFileSync(path, "utf8").split("\n")) {
    if (!line) continue;
    const r: CorpusRow = JSON.parse(line);
    rows.set(r.ref, r);
  }
  return rows;
}
