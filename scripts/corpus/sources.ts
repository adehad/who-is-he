// What a corpus row is cited from: the shared shape of every source beside the sunnah.com corpus.

export const KINDS = ["hadith", "quran", "lexicon", "commentary", "sira"] as const;
export type Kind = (typeof KINDS)[number];

/** One record of a source other than the sunnah.com corpus. `ref` is `<source>:<key>`. */
export interface SourceRow {
  ref: string;
  source: string;
  kind: Kind;
  ar: string;
  en?: string;
  /** Chapter or section title in the edition. */
  heading?: string;
  /** Lexicon root or headword. */
  headword?: string;
  vol?: number;
  page?: number;
  /** The editor's grade or comment printed with a hadith. */
  grade?: string;
}

/** Enough to cite a source: written to `.cache/corpus/sources.json` by `bun run corpus`. */
export interface SourceInfo {
  id: string;
  kind: Kind;
  title: string;
  author: string;
  edition: string;
  licence: string;
  /** Where the pinned text was downloaded from. */
  url: string;
  /** A notice the licence requires to travel with the text. */
  notice?: string;
  records: number;
}

/** The keys with `-2`, `-3` … appended to each repeat of an earlier key, and how many repeats. */
export function uniqueKeys(keys: string[]): { keys: string[]; repeats: number } {
  const seen = new Map<string, number>();
  let repeats = 0;
  const out = keys.map((k) => {
    const n = (seen.get(k) ?? 0) + 1;
    seen.set(k, n);
    if (n === 1) return k;
    repeats++;
    return `${k}-${n}`;
  });
  return { keys: out, repeats };
}
