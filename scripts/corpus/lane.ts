// Lane's Arabic-English Lexicon (Perseus TEI XML, Arabic in a Buckwalter variant) as entries per root.

const SINGLE: Record<string, string> = {
  "'": "ء",
  "|": "آ",
  ">": "أ",
  "&": "ؤ",
  "<": "إ",
  "}": "ئ",
  "{": "ٱ",
  A: "ا",
  b: "ب",
  p: "ة",
  t: "ت",
  v: "ث",
  j: "ج",
  H: "ح",
  x: "خ",
  d: "د",
  "*": "ذ",
  r: "ر",
  z: "ز",
  s: "س",
  $: "ش",
  S: "ص",
  D: "ض",
  T: "ط",
  Z: "ظ",
  E: "ع",
  g: "غ",
  f: "ف",
  q: "ق",
  k: "ك",
  l: "ل",
  m: "م",
  n: "ن",
  h: "ه",
  w: "و",
  Y: "ى",
  y: "ي",
  F: "ً",
  N: "ٌ",
  K: "ٍ",
  a: "َ",
  u: "ُ",
  i: "ِ",
  o: "ْ",
  "~": "ّ",
  "`": "ٰ",
  _: "ـ",
  P: "پ",
  J: "چ",
  G: "گ",
  // Perseus writes a hamza of unstated seat as 3 (حَجِئَ is Haji3a); V stands where a sukun would.
  "3": "ء",
  V: "",
};
// Perseus spells hamza seats and madda with a following mark: A^ أ, A_ إ, A= آ, A@ ٱ, w^ ؤ, y^ ئ.
const PAIRS: Record<string, string> = {
  "A^": "أ",
  A_: "إ",
  "A=": "آ",
  "A@": "ٱ",
  "w^": "ؤ",
  "y^": "ئ",
  "Y^": "ئ",
};

/** Perseus Buckwalter to Arabic script. Characters outside the scheme pass through. */
export function buckwalterToArabic(s: string): string {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i);
    const pair = PAIRS[c + s.charAt(i + 1)];
    if (pair) {
      out += pair;
      i++;
    } else if (c === "^") out += "ء";
    else out += SINGLE[c] ?? c;
  }
  return out;
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
const decode = (s: string) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e.startsWith("#x")) return String.fromCodePoint(Number.parseInt(e.slice(2), 16));
    if (e.startsWith("#")) return String.fromCodePoint(Number(e.slice(1)));
    return ENTITIES[e] ?? m;
  });

const ARABIC_ELEMENT = /<(foreign|orth)\b([^>]*)>([^<]*)<\/\1>/g;
const isArabic = (attrs: string) => /\blang="ar"/.test(attrs);

const ENGLISH = /^(?:quasi|and|or|see|accord\.|to|some|art\.)$/i;

/**
 * Lane's article label ("DlE &c.", "Quasi bwj", "$Sw and $SY", "kdm kdn kdh kdY") in Arabic
 * script with its English words kept, and the roots it names.
 */
export function laneLabel(n: string): { label: string; roots: string[] } {
  const roots: string[] = [];
  const label = n
    .replace(/,?\s*&c\.?/, "")
    .trim()
    .split(/\s+/)
    .map((tok) => {
      const [, open = "", word = "", close = ""] = tok.match(/^([(]?)(.*?)([),:]*)$/) ?? [];
      if (!word || ENGLISH.test(word)) return tok;
      const root = buckwalterToArabic(word);
      roots.push(root);
      return `${open}${root}${close}`;
    })
    .join(" ");
  return { label, roots };
}

export interface LaneEntry {
  /** The first root the article names, in Arabic script. */
  root: string;
  /** The article's label in Arabic script, e.g. "شصو and شصى". */
  label: string;
  /** Lane's page where the root starts, from the last `<pb n>` before it. */
  page: number | null;
  /** The Arabic headwords of the root's entries, in order, without repeats. */
  headwords: string[];
  /** The article's text with its Arabic in Arabic script and the markup removed. */
  text: string;
}

/** The `<div2 type="root">` articles of one Perseus Lane file. */
export function parseLane(xml: string): LaneEntry[] {
  const entries: LaneEntry[] = [];
  let page: number | null = null;
  const tokens = /<pb\b[^>]*\bn="(\d+)"[^>]*\/>|<div2\b([^>]*)>([\s\S]*?)<\/div2>/g;
  for (const m of xml.matchAll(tokens)) {
    if (m[1]) {
      page = Number(m[1]);
      continue;
    }
    const attrs = m[2] ?? "";
    if (!/\btype="root"/.test(attrs)) continue;
    const body = m[3] ?? "";
    const { label, roots } = laneLabel(decode(attrs.match(/\bn="([^"]*)"/)?.[1] ?? ""));
    const startPage = page;
    const pageBreaks = [...body.matchAll(/<pb\b[^>]*\bn="(\d+)"/g)];
    if (pageBreaks.length) page = Number(pageBreaks.at(-1)?.[1]);
    const headwords = new Set<string>();
    for (const [, tag, a = "", t = ""] of body.matchAll(ARABIC_ELEMENT))
      if (tag === "orth" && isArabic(a) && t.trim() && t.trim() !== "*")
        headwords.add(buckwalterToArabic(decode(t.trim())));
    const text = decode(
      body
        .replace(/<head\b[\s\S]*?<\/head>/, "")
        .replace(ARABIC_ELEMENT, (_all, _tag, a: string, t: string) =>
          isArabic(a) ? (t.trim() === "*" ? "" : buckwalterToArabic(t)) : t,
        )
        .replace(/<[^>]+>/g, " "),
    )
      .replace(/\s+/g, " ")
      .replace(/\s+([,.;:)\]])/g, "$1")
      .trim();
    entries.push({
      root: roots[0] ?? label,
      label,
      page: startPage,
      headwords: [...headwords],
      text,
    });
  }
  return entries;
}

/** The Perseus availability statement, which must stay with the text. */
export function laneAvailability(xml: string): string {
  const block = xml.match(/<availability\b[\s\S]*?<\/availability>/)?.[0] ?? "";
  return decode(block.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}
