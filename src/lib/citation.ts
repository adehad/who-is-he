// How the site cites a text: its label, its link, who graded it and which credit it needs.
import { BOOKS } from "@/data/books";
import type { RawText } from "@/data/texts";
import type { ClientText } from "@/lib/client-texts";

/** Who must be credited for a text: sunnah.com, or the corpus the work's text came from. */
export type Credit = "sunnah" | "openiti" | "tanzil" | "lane";

/** How a work's key (the ref after `<source>:`) is cited. */
type KeyForm = "number" | "volNumber" | "volPage" | "headword" | "verse";

interface Work {
  /** Author and title, as cited. */
  name: string;
  key: KeyForm;
  credit: Credit;
  /** Whose numbering or edition the key follows, where the bare number would be ambiguous. */
  numbering?: string;
  /** Who wrote the grade printed with a text, for the grade badge's title. */
  gradeBy?: string;
}

const openiti = (name: string, key: KeyForm, more: Partial<Work> = {}): Work => ({
  name,
  key,
  credit: "openiti",
  ...more,
});

export const WORKS: Record<string, Work> = {
  ahmad: openiti("Musnad Aḥmad", "number", {
    numbering: "Arnaʾūṭ numbering",
    gradeBy: "the editors, al-Arnaʾūṭ et al.",
  }),
  darimi: openiti("al-Dārimī", "number", {
    numbering: "ed. Asad",
    gradeBy: "the editor, Ḥusayn Salīm Asad",
  }),
  hakim: openiti("al-Ḥākim, al-Mustadrak", "number", { gradeBy: "al-Dhahabī, in his Talkhīṣ" }),
  "tabarani-kabir": openiti("al-Ṭabarānī, al-Muʿjam al-Kabīr", "volNumber"),
  "abunuaym-dalail": openiti("Abū Nuʿaym, Dalāʾil al-Nubuwwa", "number"),
  "bayhaqi-dalail": openiti("al-Bayhaqī, Dalāʾil al-Nubuwwa", "volPage"),
  ibnsad: openiti("Ibn Saʿd, al-Ṭabaqāt", "volPage"),
  shifa: openiti("Qāḍī ʿIyāḍ, al-Shifāʾ", "volPage"),
  "qari-jam": openiti("al-Qārī, Jamʿ al-Wasāʾil", "volPage"),
  "haytami-ashraf": openiti("al-Haytamī, Ashraf al-Wasāʾil", "volPage"),
  lisan: openiti("Lisān al-ʿArab", "headword"),
  nihaya: openiti("Ibn al-Athīr, al-Nihāya", "headword"),
  maqayis: openiti("Ibn Fāris, Maqāyīs al-Lugha", "headword"),
  taj: openiti("al-Zabīdī, Tāj al-ʿArūs", "headword"),
  lane: { name: "Lane, Arabic-English Lexicon", key: "headword", credit: "lane" },
  quran: { name: "Qurʾān", key: "verse", credit: "tanzil" },
};

/** The work cited as `<source>:…`; `bun run texts` refuses a source without one. */
export function workOf(source: string): Work {
  const w = WORKS[source];
  if (!w) throw new Error(`no citation form for source ${source}`);
  return w;
}

export const creditFor = (t: RawText | ClientText): Credit =>
  "source" in t ? workOf(t.source).credit : "sunnah";

/** A key with its `-2`, `-3` … repeat suffix split off. */
const splitRepeat = (key: string): [string, number] => {
  const m = key.match(/^(.*)-(\d+)$/);
  return m ? [m[1] ?? key, Number(m[2])] : [key, 1];
};

function keyLabel(form: KeyForm, key: string, t: ClientText): string {
  const [base, n] = splitRepeat(key);
  if (form === "number" || form === "verse") return ` ${key}`;
  if (form === "volNumber") return ` ${key.replace("/", ":")}`;
  if (form === "volPage") {
    const [vol = "0", page = "0"] = base.split("/");
    const at = page === "0" ? `vol. ${vol}` : `${vol}:${page}`;
    return ` ${at}${n > 1 ? ` (no. ${n} on the page)` : ""}`;
  }
  const vol = "vol" in t ? t.vol : undefined;
  const page = "page" in t ? t.page : undefined;
  const where = page === undefined ? "" : vol === undefined ? `p. ${page}` : `${vol}:${page}`;
  const notes = [n > 1 ? `entry ${n}` : "", where].filter(Boolean).join(", ");
  return `, \u2068${base}\u2069${notes ? ` (${notes})` : ""}`;
}

export interface Cite {
  label: string;
  url: string | null;
  grade: string | null;
  /** Whose grade it is, for the badge's title. */
  gradeBy: string;
}

export function cite(ref: string, t: ClientText): Cite {
  const i = ref.indexOf(":");
  const col = ref.slice(0, i);
  const key = ref.slice(i + 1);
  if (!("source" in t)) {
    const url = `https://sunnah.com/${ref}`;
    const gradeBy = "Grade as shown on sunnah.com";
    if (col === "shamail")
      return { label: `Shamāʾil ${key} (ch. ${t.ch})`, url, grade: t.grade, gradeBy };
    const b = BOOKS[col] ?? { name: col };
    const book = b.books?.[t.ch] ?? t.ch_en ?? "Book";
    return { label: `${b.name}, ${book} (${t.ch}): ${key}`, url, grade: t.grade, gradeBy };
  }
  const w = workOf(t.source);
  return {
    label: `${w.name}${keyLabel(w.key, key, t)}${w.numbering ? ` (${w.numbering})` : ""}`,
    url: t.source === "quran" ? `https://quran.com/${key.replace(":", "/")}` : null,
    grade: t.grade,
    gradeBy: w.gradeBy ? `Grade by ${w.gradeBy}` : "Comment printed in this edition",
  };
}

// Weakness words in English (sunnah.com) and Arabic (editors' grades). واه must stand alone, as
// رواه ("narrated it") contains it.
const WEAK =
  /da.?if|ضعي?ف|منكر|موضوع|منقطع|انقطاع|لم يصح|(?:ليس ب|غير )صحيح|(?<![ء-ي])واه(?![ء-ي])/i;

/** The grade badge's class: "weak" for a weak, broken or rejected chain, else none. */
export const gradeClass = (grade: string): "weak" | "" => (WEAK.test(grade) ? "weak" : "");
