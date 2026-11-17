// Search the corpus (bun run search -- --root رحم --en mercy). Run `bun run corpus` first.
import { parseArgs } from "node:util";
import { type NormaliseOptions, normaliseArabic, normaliseWithOffsets, rootRegex } from "./arabic";
import { loadCorpus } from "./corpus";
import { type CorpusRow, formatGrades } from "./parse";

const HELP = `bun run search -- [options]

  --ar <regex>        match the Arabic, after both it and the query are normalised
                      (harakat and Quranic marks stripped, alef/ya/hamza seats folded, ﷺ expanded)
  --root <letters>    a word with these root letters in order, e.g. --root رحم
  --gap <n>           letters allowed between root letters (default 2)
  --en <regex>        match narrator and English, case-insensitive
  --collection <a,b>  only these collections (bukhari, muslim, shamail, ...)
  --ta-marbuta        also fold ة to ه
  --limit <n>         show at most n hits (default 20; 0 for all)
  --json              one JSON object per hit
  --full              include the full Arabic and English

Every given --ar, --root and --en must match. --root is loose: it finds any word holding the
letters in order, and misses roots whose weak letters drop or change (قال for ق و ل) or
whose doubled letter is written once with a shadda (search شم, not شمم).`;

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

function main() {
  const { values: o } = parseArgs({
    options: {
      ar: { type: "string" },
      root: { type: "string" },
      gap: { type: "string", default: "2" },
      en: { type: "string" },
      collection: { type: "string" },
      "ta-marbuta": { type: "boolean", default: false },
      limit: { type: "string", default: "20" },
      json: { type: "boolean", default: false },
      full: { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
  });
  if (o.help || !(o.ar || o.root || o.en)) {
    console.log(HELP);
    process.exit(o.help ? 0 : 1);
  }
  const opts: NormaliseOptions = { taMarbuta: o["ta-marbuta"] };
  const arRes = [
    ...(o.ar ? [new RegExp(normaliseArabic(o.ar, opts))] : []),
    ...(o.root ? [rootRegex(o.root, Number(o.gap))] : []),
  ];
  const enRe = o.en ? new RegExp(o.en, "i") : null;
  const cols = o.collection ? new Set(o.collection.split(",")) : null;
  const limit = Number(o.limit) || Infinity;

  const tty = process.stdout.isTTY;
  const esc = String.fromCharCode(27);
  const mark = (s: string) => (o.json ? s : tty ? `${esc}[1;33m${s}${esc}[0m` : `«${s}»`);

  let total = 0;
  for (const r of loadCorpus().values()) {
    if (cols && !cols.has(r.collection)) continue;
    let arHit: Span | null = null;
    if (arRes.length) {
      const norm = normaliseArabic(r.ar, opts);
      const hits = arRes.map((re) => span(re.exec(norm)));
      if (hits.some((h) => !h)) continue;
      arHit = hits[0] ?? null;
    }
    const english = [r.narrator, r.en].filter(Boolean).join(" ");
    const enHit = enRe ? span(enRe.exec(english)) : null;
    if (enRe && !enHit) continue;
    if (++total > limit) continue;
    print(r, arHit && originalSpan(r.ar, arHit, opts), enHit, english);
  }
  if (!o.json) console.log(`${total} hits${total > limit ? `, ${limit} shown` : ""}`);

  function print(r: CorpusRow, ar: Span | null, en: Span | null, english: string) {
    const grade = formatGrades(r.grades);
    if (o.json) {
      console.log(
        JSON.stringify({
          ref: r.ref,
          collection: r.collection,
          url: r.url,
          book_en: r.book_en,
          book_ar: r.book_ar,
          chapter_en: r.chapter_en,
          chapter_ar: r.chapter_ar,
          grade,
          ...(r.ref_uncertain ? { ref_uncertain: true } : {}),
          ...(ar
            ? { ar_match: r.ar.slice(ar.start, ar.end), ar_snippet: snippet(r.ar, ar, mark) }
            : {}),
          ...(en
            ? { en_match: english.slice(en.start, en.end), en_snippet: snippet(english, en, mark) }
            : {}),
          ...(o.full ? { ar: r.ar, narrator: r.narrator, en: r.en } : {}),
        }),
      );
      return;
    }
    const where = [r.book_en, r.chapter_en].filter(Boolean).join(" › ");
    console.log(
      `${r.ref}${r.ref_uncertain ? " (ref uncertain)" : ""}  ${where}${grade ? `  [${grade}]` : ""}`,
    );
    if (o.full) console.log(`  ${r.ar}\n  ${english}`);
    else {
      if (ar) console.log(`  ${snippet(r.ar, ar, mark)}`);
      if (en) console.log(`  ${snippet(english, en, mark)}`);
    }
    console.log();
  }
}

if (import.meta.main) main();
