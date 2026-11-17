// Search the corpus (bun run search -- --root رحم --en mercy). Run `bun run corpus` first.
import { parseArgs } from "node:util";
import {
  type NormaliseOptions,
  normaliseArabic,
  normaliseWithOffsets,
  rootKey,
  rootRegex,
} from "./arabic";
import { dataFile, loadCatalogue, readIndex, readLines, SUNNAH } from "./corpus";
import { type CorpusRow, formatGrades } from "./parse";
import { KINDS, type SourceInfo, type SourceRow } from "./sources";

const HELP = `bun run search -- [options]

  --ar <regex>        match the Arabic, after both it and the query are normalised
                      (harakat and Quranic marks stripped, alef/ya/hamza seats folded, ﷺ expanded)
  --root <letters>    a word with these root letters in order, e.g. --root رحم
  --gap <n>           letters allowed between root letters (default 2)
  --en <regex>        match narrator and English, case-insensitive
  --source <a,b>      only these sources (default all): sunnah (the sunnah.com collections), an
                      OpenITI book, quran or lane; every id is in .cache/corpus/sources.json
  --kind <a,b>        only these kinds: ${KINDS.join(", ")}
  --collection <a,b>  only these sunnah.com collections (bukhari, muslim, shamail, ...)
  --ta-marbuta        also fold ة to ه
  --limit <n>         show at most n hits (default 20; 0 for all)
  --json              one JSON object per hit
  --full              include the full Arabic and English
  --lookup <root>     print the lexicon entries for a root (lisan, nihaya, maqayis, taj, lane),
                      with hamza seats folded; --full for whole entries, --json for rows

Every given --ar, --root and --en must match. --root is loose: it finds any word holding the
letters in order, and misses roots whose weak letters drop or change (قال for ق و ل) or
whose doubled letter is written once with a shadda (search شم, not شمم).
OpenITI texts are unvowelled; the Quran is Uthmani script, folded the same way.`;

const LEXICONS = ["lisan", "nihaya", "maqayis", "taj", "lane"];
/** --lookup prints this much of an entry without --full. */
const LOOKUP_CHARS = 1500;

const CONTEXT = 60;

interface Span {
  start: number;
  end: number;
}

/** The text around `span`, cut at word boundaries, with the match marked by `mark`. */
export function snippet(text: string, span: Span, mark: (s: string) => string): string {
  let from = Math.max(0, span.start - CONTEXT);
  let to = Math.min(text.length, span.end + CONTEXT);
  if (from > 0) from = text.indexOf(" ", from) + 1 || from;
  if (to < text.length) {
    const space = text.lastIndexOf(" ", to);
    if (space > span.end) to = space;
  }
  return `${from > 0 ? "…" : ""}${text.slice(from, span.start)}${mark(text.slice(span.start, span.end))}${text.slice(span.end, to)}${to < text.length ? "…" : ""}`;
}

/** Where a match in the normalised Arabic lies in the original, trailing harakat included. */
export function originalSpan(ar: string, match: Span, opts: NormaliseOptions): Span {
  const { offsets } = normaliseWithOffsets(ar, opts);
  const start = offsets[match.start] ?? 0;
  let end = (offsets[match.end - 1] ?? ar.length - 1) + 1;
  while (end < ar.length && normaliseArabic(ar.charAt(end)) === "" && ar.charAt(end).trim()) end++;
  return { start, end };
}

const span = (m: RegExpExecArray | null): Span | null =>
  m ? { start: m.index, end: m.index + m[0].length } : null;

/** A row of any source, as search shows it. */
interface Hit {
  ref: string;
  source: string;
  kind: string;
  ar: string;
  /** Narrator and English together. */
  english: string;
  /** Book and chapter, or the headword and the edition's heading, joined with " › ". */
  where: string;
  grade: string | null;
  sunnah: CorpusRow | null;
  other: SourceRow | null;
}

const fromCorpus = (r: CorpusRow): Hit => ({
  ref: r.ref,
  source: SUNNAH,
  kind: "hadith",
  ar: r.ar,
  english: [r.narrator, r.en].filter(Boolean).join(" "),
  where: [r.book_en, r.chapter_en].filter(Boolean).join(" › "),
  grade: formatGrades(r.grades),
  sunnah: r,
  other: null,
});

const fromSource = (r: SourceRow): Hit => ({
  ref: r.ref,
  source: r.source,
  kind: r.kind,
  ar: r.ar,
  english: r.en ?? "",
  where: [r.headword, r.heading].filter(Boolean).join(" › "),
  grade: r.grade ?? null,
  sunnah: null,
  other: r,
});

/** "3/120" or "p. 1799" when the edition's page is known. */
const pageOf = (r: SourceRow) =>
  r.page === undefined ? null : `${r.vol ? `${r.vol}/` : "p. "}${r.page}`;

/** "Musnad Ahmad (Ahmad ibn Hanbal (d. 241)), 3/120": the work, and the page when known. */
function citation(info: SourceInfo | undefined, r: SourceRow): string | null {
  if (!info) return null;
  const at = pageOf(r);
  return `${info.title}${info.author ? ` (${info.author})` : ""}${at ? `, ${at}` : ""}`;
}

/** What a row's index lines must match before the row is parsed. */
interface Prefilter {
  ar: RegExp[];
  en: RegExp | null;
  taMarbuta: boolean;
}

/**
 * Rows of the chosen sources, one source at a time, so a source not chosen is never read. With a
 * prefilter, only rows whose index lines match are parsed.
 */
function* rows(
  catalogue: SourceInfo[],
  wanted: (info: SourceInfo) => boolean,
  pre?: Prefilter,
): Generator<Hit> {
  for (const info of catalogue) {
    if (!wanted(info)) continue;
    const ar = pre?.ar.length ? readIndex(info.id, "ar") : null;
    const en = pre?.en ? readIndex(info.id, "en") : null;
    const keep = (i: number) => {
      if (ar && pre) {
        const norm = pre.taMarbuta ? (ar[i] ?? "").replaceAll("ة", "ه") : (ar[i] ?? "");
        if (!pre.ar.every((re) => re.test(norm))) return false;
      }
      return !en || !!pre?.en?.test(en[i] ?? "");
    };
    const index = ar ?? en;
    const picked = index
      ? [...index.keys()].filter((i) => index[i] !== undefined && keep(i))
      : null;
    if (picked?.length === 0) continue;
    const data = readLines(dataFile(info.id));
    for (const i of picked ?? data.keys()) {
      const line = data[i];
      if (line)
        yield info.id === SUNNAH ? fromCorpus(JSON.parse(line)) : fromSource(JSON.parse(line));
    }
  }
}

const list = (s: string | undefined) => (s ? new Set(s.split(",").map((x) => x.trim())) : null);

function main() {
  const { values: o } = parseArgs({
    options: {
      ar: { type: "string" },
      root: { type: "string" },
      gap: { type: "string", default: "2" },
      en: { type: "string" },
      source: { type: "string" },
      kind: { type: "string" },
      collection: { type: "string" },
      lookup: { type: "string" },
      "ta-marbuta": { type: "boolean", default: false },
      limit: { type: "string", default: "20" },
      json: { type: "boolean", default: false },
      full: { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
  });
  if (o.help || !(o.ar || o.root || o.en || o.lookup)) {
    console.log(HELP);
    process.exit(o.help ? 0 : 1);
  }
  const catalogue = loadCatalogue();
  const byId = new Map(catalogue.map((i) => [i.id, i]));
  const sources = list(o.source);
  const kinds = list(o.kind);
  const cols = list(o.collection);
  for (const id of sources ?? []) if (!byId.has(id)) throw new Error(`no source ${id}`);
  for (const k of kinds ?? [])
    if (!(KINDS as readonly string[]).includes(k)) throw new Error(`no kind ${k}`);

  const tty = process.stdout.isTTY;
  const esc = String.fromCharCode(27);
  const mark = (s: string) => (o.json ? s : tty ? `${esc}[1;33m${s}${esc}[0m` : `«${s}»`);

  if (o.lookup) {
    lookup(o.lookup);
    return;
  }

  const opts: NormaliseOptions = { taMarbuta: o["ta-marbuta"] };
  const arRes = [
    ...(o.ar ? [new RegExp(normaliseArabic(o.ar, opts))] : []),
    ...(o.root ? [rootRegex(o.root, Number(o.gap))] : []),
  ];
  const enRe = o.en ? new RegExp(o.en, "i") : null;
  const limit = Number(o.limit) || Infinity;
  const wanted = (i: SourceInfo) =>
    (!sources || sources.has(i.id)) && (!kinds || kinds.has(i.kind)) && (!cols || i.id === SUNNAH);

  let total = 0;
  for (const h of rows(catalogue, wanted, { ar: arRes, en: enRe, taMarbuta: !!o["ta-marbuta"] })) {
    if (cols && !cols.has(h.sunnah?.collection ?? "")) continue;
    let arHit: Span | null = null;
    if (arRes.length) {
      const norm = normaliseArabic(h.ar, opts);
      const hits = arRes.map((re) => span(re.exec(norm)));
      if (hits.some((x) => !x)) continue;
      arHit = hits[0] ?? null;
    }
    const enHit = enRe ? span(enRe.exec(h.english)) : null;
    if (enRe && !enHit) continue;
    if (++total > limit) continue;
    print(h, arHit && originalSpan(h.ar, arHit, opts), enHit);
  }
  if (!o.json) console.log(`${total} hits${total > limit ? `, ${limit} shown` : ""}`);

  function print(h: Hit, ar: Span | null, en: Span | null) {
    if (o.json) {
      const matches = {
        ...(ar
          ? { ar_match: h.ar.slice(ar.start, ar.end), ar_snippet: snippet(h.ar, ar, mark) }
          : {}),
        ...(en
          ? {
              en_match: h.english.slice(en.start, en.end),
              en_snippet: snippet(h.english, en, mark),
            }
          : {}),
      };
      if (h.sunnah) {
        const r = h.sunnah;
        console.log(
          JSON.stringify({
            ref: r.ref,
            source: SUNNAH,
            kind: h.kind,
            collection: r.collection,
            url: r.url,
            book_en: r.book_en,
            book_ar: r.book_ar,
            chapter_en: r.chapter_en,
            chapter_ar: r.chapter_ar,
            grade: h.grade,
            ...(r.ref_uncertain ? { ref_uncertain: true } : {}),
            ...matches,
            ...(o.full ? { ar: r.ar, narrator: r.narrator, en: r.en } : {}),
          }),
        );
      } else if (h.other) {
        const { ar: fullAr, en: fullEn, ...meta } = h.other;
        console.log(
          JSON.stringify({
            ...meta,
            cite: citation(byId.get(meta.source), h.other),
            ...matches,
            ...(o.full ? { ar: fullAr, ...(fullEn ? { en: fullEn } : {}) } : {}),
          }),
        );
      }
      return;
    }
    const uncertain = h.sunnah?.ref_uncertain ? " (ref uncertain)" : "";
    const at = h.other && pageOf(h.other);
    console.log(
      `${h.ref}${uncertain}  ${h.where}${at ? `  [${at}]` : ""}${h.grade ? `  [${h.grade}]` : ""}`,
    );
    if (o.full) console.log(`  ${h.ar}${h.english ? `\n  ${h.english}` : ""}`);
    else {
      if (ar) console.log(`  ${snippet(h.ar, ar, mark)}`);
      if (en) console.log(`  ${snippet(h.english, en, mark)}`);
    }
    console.log();
  }

  function lookup(root: string) {
    const key = rootKey(root);
    let total = 0;
    const lexicon = (i: SourceInfo) => LEXICONS.includes(i.id) && (!sources || sources.has(i.id));
    for (const { other: r } of rows(catalogue, lexicon)) {
      if (!r || !(r.headword ?? "").split(" ").some((w) => rootKey(w) === key)) continue;
      total++;
      if (o.json) {
        console.log(JSON.stringify({ ...r, cite: citation(byId.get(r.source), r) }));
        continue;
      }
      const at = pageOf(r);
      console.log(`${r.ref}  ${byId.get(r.source)?.title}${at ? `  [${at}]` : ""}`);
      for (const text of [r.ar, r.en ?? ""].filter(Boolean)) {
        const cut = !o.full && text.length > LOOKUP_CHARS;
        const shown = cut ? `${text.slice(0, text.lastIndexOf(" ", LOOKUP_CHARS))} …` : text;
        console.log(`  ${shown}${cut ? ` (${text.length} chars; --full for all)` : ""}`);
      }
      console.log();
    }
    if (!o.json) console.log(`${total} entries`);
  }
}

if (import.meta.main) main();
