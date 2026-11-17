// OpenITI mARkdown: a tokenizer and the record builders that turn its blocks into corpus rows.

export type Block =
  | { t: "page"; vol: number; page: number }
  | { t: "heading"; mark: string; text: string }
  /** `para` is true when the text opens a new `#` paragraph rather than continuing one. */
  | { t: "text"; text: string; para: boolean };

const HEADER_END = "#META#Header#End#";
const PAGE = /PageV(\d+)P(\d+)/g;
const MILESTONE = /(?<![A-Za-z])ms\d+ ?/g;
const PRINTED_PAGE = /^\[ص: \d+\]$/;
// JK texts mark printed pages as @12@, Quran quotations as @QB@ … @QE@ and headwords with *!.
const JK_MARKS = /@(?:\d+|QB|QE)@|\*!/g;

const clean = (s: string) => s.replace(JK_MARKS, "").replace(/\s+/g, " ").trim();

/**
 * Blocks of an OpenITI mARkdown text in order: the `#META#` header dropped, `~~` continuation
 * lines and unprefixed lines joined to the paragraph before, milestones dropped, and each
 * `PageV##P###` marker (on its own line or inline) as a page block. A page marker closes its
 * page: the text before it is on that page. `[ص: N]` headings (a printed page without its volume)
 * are dropped, as is the `&` some JK texts leave around headings.
 */
export function parseMarkdown(src: string): Block[] {
  const at = src.indexOf(HEADER_END);
  const body = at < 0 ? src : src.slice(at + HEADER_END.length);
  const blocks: Block[] = [];
  const pieces = (line: string, para: boolean) => {
    let last = 0;
    let first = para;
    const push = (text: string) => {
      const t = clean(text);
      if (!t) return;
      blocks.push({ t: "text", text: t, para: first });
      first = false;
    };
    for (const m of line.matchAll(PAGE)) {
      push(line.slice(last, m.index));
      blocks.push({ t: "page", vol: Number(m[1]), page: Number(m[2]) });
      last = m.index + m[0].length;
    }
    push(line.slice(last));
  };
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.replace(MILESTONE, "");
    const heading = line.match(/^### (\|+|\$)(.*)$/);
    if (heading) {
      const [, mark = "", rest = ""] = heading;
      const text = clean(rest.replace(PAGE, "").replace(/&/g, ""));
      if (text && !PRINTED_PAGE.test(text)) blocks.push({ t: "heading", mark, text });
      for (const m of rest.matchAll(PAGE))
        blocks.push({ t: "page", vol: Number(m[1]), page: Number(m[2]) });
    } else if (line.startsWith("~~")) pieces(line.slice(2), false);
    else if (line.startsWith("#")) pieces(line.replace(/^#\s?/, ""), true);
    else pieces(line, false);
  }
  return blocks;
}

/** A record before it gets its key. `vol`/`page` are null when the edition gives none. */
export interface Draft {
  n?: number;
  key?: string;
  ar: string;
  heading: string | null;
  vol: number | null;
  page: number | null;
  grade?: string;
}

function newDraft(heading: string | null, ar = ""): Draft {
  return { ar, heading, vol: null, page: null };
}

const append = (a: string, b: string) => (a ? `${a} ${b}` : b);

/**
 * Gives each record the page it starts on: the first page marker after its start, since a marker
 * closes its page. V00P000 (a page the edition does not number) leaves the page null and the
 * volume to the next numbered marker; `straddles` counts such records whose last numbered marker
 * before them names another volume, so the volume may be off by one.
 */
class Pager {
  private waiting: Draft[] = [];
  private noVol: { d: Draft; before: number | null }[] = [];
  private lastVol: number | null = null;
  straddles = 0;
  add(d: Draft) {
    this.waiting.push(d);
  }
  page(b: { vol: number; page: number }) {
    const known = b.vol !== 0 || b.page !== 0;
    for (const d of this.waiting) {
      if (known) {
        d.vol = b.vol;
        d.page = b.page;
      } else this.noVol.push({ d, before: this.lastVol });
    }
    this.waiting = [];
    if (!known) return;
    for (const { d, before } of this.noVol) {
      d.vol = b.vol;
      if (before !== null && before !== b.vol) this.straddles++;
    }
    this.noVol = [];
    this.lastVol = b.vol;
  }
}

export interface BuildStats {
  /** Characters of text outside any record (introductions, front matter). */
  dropped: number;
  /** Records whose volume was inferred across a volume change (see `Pager`). */
  straddles: number;
}

const NUMBERED = /^(\d+) - ?(.*)$/;
// A hadith number heading has nothing after the dash; "1 - كتاب الطهارة" is a book title.
const NUMBER_HEADING = /^(\d+) -$/;
const COMMENT = /^\[(?:تعليق المحقق|التعليق[^\]]*)\]$/;

/**
 * Numbered hadith: a `N -` heading opens one, or with `numberAt` "para" a paragraph opening
 * `N - `. Text under a `[تعليق المحقق]` or `[التعليق - من تلخيص الذهبي]` heading is the record's
 * grade; any other heading is a chapter title and closes the record.
 */
export function numberedRecords(
  blocks: Block[],
  numberAt: "heading" | "para",
): { records: Draft[]; stats: BuildStats } {
  const records: Draft[] = [];
  const stats: BuildStats = { dropped: 0, straddles: 0 };
  let heading: string | null = null;
  let cur: Draft | null = null;
  let inComment = false;
  const pager = new Pager();
  const start = (n: number, text: string): Draft => {
    const d = { ...newDraft(heading, text), n };
    inComment = false;
    records.push(d);
    pager.add(d);
    return d;
  };
  for (const b of blocks) {
    if (b.t === "page") pager.page(b);
    else if (b.t === "heading") {
      const m = numberAt === "heading" ? b.text.match(NUMBER_HEADING) : null;
      if (m) cur = start(Number(m[1]), "");
      else if (COMMENT.test(b.text) && cur) inComment = true;
      else {
        heading = b.text;
        cur = null;
      }
    } else {
      const m = numberAt === "para" && b.para && !inComment ? b.text.match(NUMBERED) : null;
      if (m) cur = start(Number(m[1]), m[2] ?? "");
      else if (!cur) stats.dropped += b.text.length;
      else if (inComment) cur.grade = append(cur.grade ?? "", b.text.replace(NUMBERED, "$2"));
      else cur.ar = append(cur.ar, b.text);
    }
  }
  stats.straddles = pager.straddles;
  return { records, stats };
}

/**
 * Unnumbered prose split at headings and at paragraphs for which `starts` holds (given the
 * paragraph and the length of the record so far).
 */
export function proseRecords(
  blocks: Block[],
  starts: (para: string, length: number) => boolean,
): { records: Draft[]; stats: BuildStats } {
  const records: Draft[] = [];
  let heading: string | null = null;
  let cur: Draft | null = null;
  const pager = new Pager();
  for (const b of blocks) {
    if (b.t === "page") pager.page(b);
    else if (b.t === "heading") {
      heading = b.text;
      cur = null;
    } else if (!cur || (b.para && starts(b.text, cur.ar.length))) {
      cur = newDraft(heading, b.text);
      records.push(cur);
      pager.add(cur);
    } else cur.ar = append(cur.ar, b.text);
  }
  return { records, stats: { dropped: 0, straddles: pager.straddles } };
}

/** A piece of lexicon text: plain text, the start of an entry, or a section title. */
export type LexPiece = string | { key: string } | { section: string };

export interface LexiconRules {
  /** How a heading reads; the default makes every heading a section title. */
  heading?: (text: string, mark: string) => LexPiece[];
  /** How running text reads; the default is plain text. */
  text?: (text: string, para: boolean) => LexPiece[];
}

/** Lexicon entries keyed by root or headword. Text before the first entry is dropped. */
export function lexiconRecords(
  blocks: Block[],
  rules: LexiconRules,
): { records: Draft[]; stats: BuildStats } {
  const records: Draft[] = [];
  const stats: BuildStats = { dropped: 0, straddles: 0 };
  let section: string | null = null;
  let cur: Draft | null = null;
  const pager = new Pager();
  const take = (pieces: LexPiece[]) => {
    for (const p of pieces) {
      if (typeof p === "string") {
        if (!p) continue;
        if (cur) cur.ar = append(cur.ar, p);
        else stats.dropped += p.length;
      } else if ("key" in p) {
        cur = { ...newDraft(section), key: p.key };
        records.push(cur);
        pager.add(cur);
      } else {
        section = p.section;
        cur = null;
      }
    }
  };
  for (const b of blocks) {
    if (b.t === "page") pager.page(b);
    else if (b.t === "heading") take(rules.heading?.(b.text, b.mark) ?? [{ section: b.text }]);
    else take(rules.text?.(b.text, b.para) ?? [b.text]);
  }
  stats.straddles = pager.straddles;
  return { records, stats };
}

/** Split `text` at each match of `re` (global), mapping a match to a piece or null to keep it. */
export function splitAt(
  text: string,
  re: RegExp,
  piece: (m: RegExpMatchArray) => LexPiece | null,
): LexPiece[] {
  const out: LexPiece[] = [];
  let last = 0;
  for (const m of text.matchAll(re)) {
    const p = piece(m);
    if (!p) continue;
    out.push(text.slice(last, m.index).trim(), p);
    last = m.index + m[0].length;
  }
  out.push(text.slice(last).trim());
  return out;
}
