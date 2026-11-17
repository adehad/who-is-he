// Build the local hadith corpus (bun run corpus): freococo/sunnah_dataset plus the Sahih Muslim
// add-on from fawazahmed0/hadith-api. Downloads are cached in .cache/corpus and only ever parsed.
import { existsSync, mkdirSync, renameSync, writeFileSync } from "node:fs";
import { asyncBufferFromFile, parquetReadObjects } from "hyparquet";
import { parquetWriteFile } from "hyparquet-writer";
import { buildAddon, toHfColumns } from "./addon";
import { CACHE, CORPUS } from "./corpus";
import { type CorpusRow, type FawazHadith, fromHf } from "./parse";

const HF_REV = "cc2f95cc070367c3ad6c5b672a6d16673dab566f";
const FAWAZ_REV = "df57907be35291c91ad6a6691180e22ca9920784";
const HF_URL = `https://huggingface.co/datasets/freococo/sunnah_dataset/resolve/${HF_REV}/sunnah_com_dataset.parquet`;
const fawazUrl = (edition: string) =>
  `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@${FAWAZ_REV}/editions/${edition}.json`;

async function cached(url: string, file: string): Promise<string> {
  const path = `${CACHE}/${file}`;
  if (existsSync(path)) return path;
  console.log(`downloading ${url}`);
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  mkdirSync(path.replace(/\/[^/]+$/, ""), { recursive: true });
  writeFileSync(`${path}.part`, new Uint8Array(await r.arrayBuffer()));
  renameSync(`${path}.part`, path);
  return path;
}

interface FawazEdition {
  metadata: { sections: Record<string, string> };
  hadiths: FawazHadith[];
}
const readEdition = async (file: string): Promise<FawazEdition> => Bun.file(file).json();

const hfFile = await cached(HF_URL, `hf-${HF_REV.slice(0, 7)}/sunnah_com_dataset.parquet`);
const fawazDir = `fawaz-${FAWAZ_REV.slice(0, 7)}`;
const ara = await readEdition(await cached(fawazUrl("ara-muslim"), `${fawazDir}/ara-muslim.json`));
const eng = await readEdition(await cached(fawazUrl("eng-muslim"), `${fawazDir}/eng-muslim.json`));

const hfRows = (await parquetReadObjects({ file: await asyncBufferFromFile(hfFile) })) as Record<
  string,
  unknown
>[];
const corpus = new Map<string, CorpusRow>();
let duplicates = 0;
for (const raw of hfRows) {
  const row = fromHf(raw);
  if (corpus.has(row.ref)) duplicates++;
  else corpus.set(row.ref, row);
}

const hfMuslim = new Map(
  [...corpus.values()]
    .filter((r) => r.collection === "muslim")
    .map((r) => [r.ref.split(":")[1] ?? "", r]),
);
const { rows: addon, stats } = buildAddon(
  ara.hadiths,
  eng.hadiths,
  ara.metadata.sections,
  hfMuslim,
);
for (const r of addon) corpus.set(r.ref, r);

writeFileSync(CORPUS, `${[...corpus.values()].map((r) => JSON.stringify(r)).join("\n")}\n`);

mkdirSync(`${CACHE}/addon`, { recursive: true });
parquetWriteFile({
  filename: `${CACHE}/addon/sahih_muslim_addon.parquet`,
  columnData: toHfColumns(addon),
});
const uncertain = Object.entries(stats.uncertain);
const reasons = Object.groupBy(uncertain, ([, why]) => why);
writeFileSync(
  `${CACHE}/addon/README.md`,
  `# Sahih Muslim add-on for freococo/sunnah_dataset

${addon.length} hadiths of Sahih Muslim that freococo/sunnah_dataset (revision \`${HF_REV}\`) does
not hold, in that dataset's own columns: \`sahih_muslim_addon.parquet\`.

## Source

[fawazahmed0/hadith-api](https://github.com/fawazahmed0/hadith-api) at commit \`${FAWAZ_REV}\`,
editions \`ara-muslim\` and \`eng-muslim\`, released under the Unlicense.

## Reference rule

The sunnah.com number is fawaz's \`arabicnumber\` with its fractional part as a letter:
\`2331\` -> \`2331\`, \`2331.01\` -> \`2331a\`, \`2331.03\` -> \`2331c\`. \`url\` is
\`https://sunnah.com/muslim:<number>\` and \`ref_raw\` is \`Sahih Muslim <number>\`. \`book_no\` and
\`hadith_no_in_book\` are fawaz's \`reference.book\` and \`reference.hadith\`; \`book_en\` is the
edition's section name. English is fawaz's \`eng-muslim\` text, with the narrator split off where it
opens with "<name> reported:" or similar. No Arabic book or chapter titles, chapters, sanad/matn
split, sunnah.com ids or translation references are available.

Left out: ${stats.noNumber} hadiths without an \`arabicnumber\` (the introduction), ${stats.emptyText}
with empty Arabic, ${stats.inHf} already in the dataset under the same number and
${stats.inHfUnderOtherLetter} already there under a differently lettered number (same base number,
word overlap of at least 0.8). Of the shared numbers, ${stats.overlapDisagree.length} have different
Arabic in the two sources: ${stats.overlapDisagree.join(", ") || "none"}.

## Uncertain references

${uncertain.length} rows have a number that may not match sunnah.com and should be checked there
before use:

${Object.entries(reasons)
  .map(([why, list]) => `- ${why} (${list?.length}): ${list?.map(([ref]) => ref).join(", ")}`)
  .join("\n")}
`,
);

const counts = Object.groupBy([...corpus.values()], (r) => r.collection);
for (const [col, list] of Object.entries(counts))
  console.log(
    `${col.padEnd(16)} ${String(list?.length).padStart(6)}  (${list?.filter((r) => r.source === "fawaz-addon").length} add-on, ${list?.filter((r) => r.ref_uncertain).length} uncertain)`,
  );
console.log(
  `total ${corpus.size}; ${duplicates} duplicate dataset rows dropped; ` +
    `${[...corpus.values()].filter((r) => r.ref_uncertain).length} uncertain refs; ` +
    `add-on ${addon.length} (${uncertain.length} uncertain); ` +
    `${stats.overlapDisagree.length} shared Muslim numbers with differing Arabic`,
);
console.log(`wrote ${CORPUS} and ${CACHE}/addon/`);
