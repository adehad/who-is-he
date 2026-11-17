// Build the sources beside the sunnah.com corpus: the OpenITI books and the Quran (Tanzil).
// Each is downloaded at a pinned version into .cache/corpus/downloads/<source>/
// and written to .cache/corpus/sources/<source>.jsonl; .cache/corpus/sources.json says how to
// cite each.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import {
  OPENITI_BOOKS,
  OPENITI_COMMIT,
  OPENITI_METADATA,
  OPENITI_RAW,
  OPENITI_TAG,
  type OpenitiBook,
} from "./classical";
import { CACHE, CATALOGUE, SOURCES_DIR, writeRows } from "./corpus";
import { download } from "./download";
import { type Draft, parseMarkdown } from "./openiti";
import { type SourceInfo, type SourceRow, uniqueKeys } from "./sources";
import { parseTanzil } from "./tanzil";

const DOWNLOADS = `${CACHE}/downloads`;
const OPENITI_LICENCE = "CC BY-NC-SA 4.0 (OpenITI corpus)";

const TANZIL = {
  quran: {
    url: "https://tanzil.net/pub/download/index.php?quranType=uthmani&outType=txt-2&agree=true",
    file: "quran-uthmani.txt",
    sha256: "bf4f57b968d03f4131c070b1e285da9be0e0a108a21c910e872801ca273312c8",
  },
  en: {
    url: "https://tanzil.net/trans/?transID=en.pickthall&type=txt-2",
    file: "en.pickthall.txt",
    sha256: "4aabbfa9d96796f5a6b0217d2c39dce1a3084f772bf6f2650e37082a774e3cc7",
  },
};
const QURAN_VERSES = 6236;

/** The OpenITI metadata TSV as one record per version id, keyed by column name. */
function metadataRows(tsv: string): Map<string, Record<string, string>> {
  const [head = "", ...lines] = tsv.split(/\r?\n/);
  const cols = head.split("\t");
  return new Map(
    lines.map((l) => {
      const cells = l.split("\t");
      return [cells[0] ?? "", Object.fromEntries(cols.map((c, i) => [c, cells[i] ?? ""]))];
    }),
  );
}

/** The print edition a version is "based" on, from its `.yml`, when that is a link. */
const ymlBasedOn = (yml: string) =>
  yml.match(/^80#VERS#BASED#+:\s*(https?:\/\/\S+)/m)?.[1]?.replace(/,$/, "") ?? null;

export interface OpenitiReport {
  id: string;
  records: number;
  repeats: number;
  empty: number;
  noPage: number;
  dropped: number;
  straddles: number;
}

async function buildOpenitiBook(
  book: OpenitiBook,
  metadata: Map<string, Record<string, string>>,
): Promise<{ info: SourceInfo; report: OpenitiReport }> {
  const meta = metadata.get(book.version);
  const path = meta?.local_path;
  if (!path) throw new Error(`${book.version}: not in the OpenITI ${OPENITI_TAG} metadata`);
  const name = path.split("/").at(-1) ?? book.version;
  const dir = `${DOWNLOADS}/${book.id}`;
  const text = readFileSync(
    await download(`${OPENITI_RAW}/${path}`, `${dir}/${name}`, book.sha256),
    "utf8",
  );
  const ymlPath = `${path.replace(/\/[^/]+$/, "")}/${book.version}.yml`;
  const yml = readFileSync(
    await download(`${OPENITI_RAW}/${ymlPath}`, `${dir}/${book.version}.yml`, book.ymlSha256),
    "utf8",
  );

  const { records, stats } = book.build(parseMarkdown(text));
  const kept = records.filter((d) => d.ar.trim());
  const { keys, repeats } = uniqueKeys(kept.map(book.key));
  writeRows(
    book.id,
    kept.map((d, i) => toRow(book, d, keys[i] ?? "")),
  );

  const basedOn = ymlBasedOn(yml);
  const edition = [meta?.ed_info, basedOn].filter(Boolean).join(" :: ");
  return {
    info: {
      id: book.id,
      kind: book.kind,
      title: book.title,
      author: book.author,
      edition: `${edition} (OpenITI ${OPENITI_TAG}, ${book.version})`,
      licence: OPENITI_LICENCE,
      url: `https://github.com/OpenITI/RELEASE/blob/${OPENITI_COMMIT}/${path}`,
      records: kept.length,
    },
    report: {
      id: book.id,
      records: kept.length,
      repeats,
      empty: records.length - kept.length,
      noPage: kept.filter((d) => d.page === null).length,
      dropped: stats.dropped,
      straddles: stats.straddles,
    },
  };
}

function toRow(book: OpenitiBook, d: Draft, key: string): SourceRow {
  const row: SourceRow = { ref: `${book.id}:${key}`, source: book.id, kind: book.kind, ar: d.ar };
  if (d.heading) row.heading = d.heading;
  if (book.kind === "lexicon" && d.key) row.headword = d.key;
  // Without a page, the volume is inferred from a later marker; the key keeps it where it needs it.
  if (d.page !== null) {
    row.vol = d.vol ?? 0;
    row.page = d.page;
  }
  if (d.grade) row.grade = d.grade;
  return row;
}

async function buildQuran(): Promise<SourceInfo> {
  const dir = `${DOWNLOADS}/quran`;
  const read = async (f: { url: string; file: string; sha256: string }) =>
    parseTanzil(readFileSync(await download(f.url, `${dir}/${f.file}`, f.sha256), "utf8"));
  const ar = await read(TANZIL.quran);
  const en = await read(TANZIL.en);
  if (ar.verses.size !== QURAN_VERSES || en.verses.size !== QURAN_VERSES)
    throw new Error(`Tanzil: ${ar.verses.size} Arabic and ${en.verses.size} English verses`);
  writeRows(
    "quran",
    [...ar.verses].map(
      ([key, text]): SourceRow => ({
        ref: `quran:${key}`,
        source: "quran",
        kind: "quran",
        ar: text,
        en: en.verses.get(key) ?? "",
      }),
    ),
  );
  return {
    id: "quran",
    kind: "quran",
    title: "The Quran (Uthmani text) with Pickthall's English",
    author: "",
    edition: "Tanzil Quran Text (Uthmani, Version 1.1); translation en.pickthall from Tanzil",
    licence:
      "Arabic: CC BY 3.0, verbatim copies only, credit Tanzil Project and link to tanzil.net; " +
      "English: Tanzil translation terms (non-commercial)",
    url: "https://tanzil.net",
    notice: `${ar.notice}\n\n${en.notice}`,
    records: ar.verses.size,
  };
}

/** Download, parse and write every source; returns their catalogue entries and parse reports. */
export async function buildSources(): Promise<{ infos: SourceInfo[]; reports: OpenitiReport[] }> {
  mkdirSync(SOURCES_DIR, { recursive: true });
  const tsv = readFileSync(
    await download(
      `${OPENITI_RAW}/${OPENITI_METADATA.path}`,
      `${DOWNLOADS}/openiti/${OPENITI_METADATA.path.split("/").at(-1)}`,
      OPENITI_METADATA.sha256,
    ),
    "utf8",
  );
  const metadata = metadataRows(tsv);
  const infos: SourceInfo[] = [];
  const reports: OpenitiReport[] = [];
  for (const book of OPENITI_BOOKS) {
    const { info, report } = await buildOpenitiBook(book, metadata);
    infos.push(info);
    reports.push(report);
  }
  infos.push(await buildQuran());
  return { infos, reports };
}

export const writeCatalogue = (infos: SourceInfo[]) =>
  writeFileSync(CATALOGUE, `${JSON.stringify(infos, null, 2)}\n`);
