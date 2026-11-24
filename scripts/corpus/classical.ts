// OpenITI books in the corpus: where each comes from and how its text becomes records.
import {
  type Block,
  type BuildStats,
  type Draft,
  type LexiconRules,
  type LexPiece,
  lexiconRecords,
  numberedRecords,
  proseRecords,
  splitAt,
} from "./openiti";
import type { Kind } from "./sources";

export const OPENITI_TAG = "v2025.1.9";
export const OPENITI_COMMIT = "cfc4157a3cf2054c0888f133970a4eaa3e22e58c";
export const OPENITI_RAW = `https://raw.githubusercontent.com/OpenITI/RELEASE/${OPENITI_COMMIT}`;
export const OPENITI_METADATA = {
  path: "metadata/OpenITI_metadata_2025-1-9.tsv",
  sha256: "10a025fcfc1bf96d218096f0dfe1d9416f9ff277f092c42622cb012cc4da2a61",
};

export interface OpenitiBook {
  id: string;
  kind: Kind;
  title: string;
  author: string;
  /** OpenITI version id; the metadata TSV resolves it to a file path. */
  version: string;
  sha256: string;
  /** The version's `.yml` beside the text, which records the print edition it was taken from. */
  ymlSha256: string;
  build: (blocks: Block[]) => { records: Draft[]; stats: BuildStats };
  /** The part of the ref after `<id>:`, before repeats get a `-2`, `-3` … suffix. */
  key: (d: Draft) => string;
}

const ISNAD = /^(?:قال: ?)?و?(?:أخبرنا|أخبرني|حدثنا|حدثني|أنبأنا|أنبأني|ثنا|أنا)(?=[\s،,:]|$)/;
const reports = (blocks: Block[]) => proseRecords(blocks, (para) => ISNAD.test(para));
/** Commentary and prose: paragraphs gathered into records of at least this many characters. */
const CHUNK = 600;
const chunks = (blocks: Block[]) => proseRecords(blocks, (_, length) => length >= CHUNK);
const byNumber = (d: Draft) => String(d.n);
const byPage = (d: Draft) => `${d.vol ?? 0}/${d.page ?? 0}`;
const byHeadword = (d: Draft) => d.key ?? "";

const lisan: LexiconRules = {
  heading: (text, mark) => {
    if (mark !== "$") return [{ section: text }];
    const m = text.match(/^([^:]{1,30}):\s*(.*)$/);
    return m
      ? [{ key: (m[1] ?? "").trim() }, m[2] ?? ""]
      : [{ key: text.split(" ")[0] ?? "" }, text];
  },
};

// Entries are "(شنب)" headings; a few headings are fragments of the text, kept as text.
const nihaya: LexiconRules = {
  heading: (text) => {
    const m = text.match(/^\(([^()]+)\)$/);
    if (m) return [{ key: (m[1] ?? "").trim() }];
    return /^(?:باب|حرف|مقدمة)/.test(text) ? [{ section: text }] : [text];
  },
};

const ROOT = /^[ء-ي]{2,6}$/;
// "| 1 ( كتاب الهمزة )" is a section; "| ( أب )" (a few lack the "(") opens the entry for a root.
const maqayis: LexiconRules = {
  text: (text) =>
    splitAt(text, /(?:^\|?|\|)\s*(\d+\s*)?(?:\(|(?<=\|\s*))\s*([^()|]{1,60}?)\s*\)/g, (m) => {
      const inner = (m[2] ?? "").trim();
      if (m[1]) return { section: inner };
      return ROOT.test(inner) ? { key: inner } : null;
    }),
};

const TAJ_SECTION = /^(?:فصل|باب|حرف|المقصد|مقدمة|بسم|كتاب|خاتمة)/;
/** A root written whole or letter by letter ("ض ل ع"), as one word. */
const rootOf = (s: string) => {
  const t = s.trim();
  if (/^[ء-ي]{2,7}$/.test(t)) return t;
  return /^[ء-ي](?: [ء-ي]){1,6}$/.test(t) ? t.replaceAll(" ", "") : null;
};
// Entries open with a "|" paragraph: "|ضلع", "| ض ل ع", "|( كهر )", "| 3 ( ف ط ر )", or
// "| ( headword … ) text"; "| 1 ( باب … ) 1" and "| 2 ( فصل … ) 2" are section titles.
const taj: LexiconRules = {
  text: (text, para): LexPiece[] => {
    if (!para || !text.startsWith("|")) return [text];
    const body = text.slice(1).trim();
    const root = rootOf(body);
    if (root) return [{ key: root }];
    const m = body.match(/^(\d)?\s*\(\s*([^()]*?)\s*\)\s*(.*)$/);
    if (!m) return [text];
    const [, level, inner = "", rest = ""] = m;
    if (level === "1" || level === "2" || TAJ_SECTION.test(inner))
      return [{ section: inner.replace(/\s*\|\s*/g, " ") }, rest.replace(/^\d\s*/, "")];
    const key = rootOf(inner) ?? inner.match(/[ء-ي]+/)?.[0];
    return key ? [{ key }, rootOf(inner) ? rest : body] : [text];
  },
};

export const OPENITI_BOOKS: OpenitiBook[] = [
  {
    id: "ahmad",
    kind: "hadith",
    title: "Musnad Ahmad",
    author: "Ahmad ibn Hanbal (d. 241)",
    version: "0241IbnHanbal.Musnad.Shamela0013157-ara1",
    sha256: "888450dca26f07e26cd095f1123efd7b3911acab07ff584db64227631d547964",
    ymlSha256: "2c32b0bde8f04de66b8f7a3b067bdb9c5c77f736a11617ced8ef1717a21a5e57",
    build: (b) => numberedRecords(b, "heading"),
    key: byNumber,
  },
  {
    id: "darimi",
    kind: "hadith",
    title: "Sunan al-Darimi",
    author: "al-Darimi (d. 255)",
    version: "0255CabdAllahDarimi.Sunan.Shamela0021795-ara3",
    sha256: "d069cc7479eada66986d971ed6860787a7829a6a8bbe95f299c1ef8c129858b3",
    ymlSha256: "ca435ece0f9dce0e5599525e5e4c66f55b87499d4956e965023cc8953a53bf8d",
    build: (b) => numberedRecords(b, "heading"),
    key: byNumber,
  },
  {
    id: "hakim",
    kind: "hadith",
    title: "al-Mustadrak 'ala al-Sahihayn, with al-Dhahabi's Talkhis",
    author: "al-Hakim al-Naysaburi (d. 405)",
    version: "0405HakimNaysaburi.Mustadrak.Shamela0002266-ara1",
    sha256: "30fa11c678e8f4c02196ff8b683558028b6cd564f615c9644a94375afa9cde08",
    ymlSha256: "367ce4dfb29dca230cf64986f3384d54a5f54b440898f7527c3bbc5410c686bf",
    build: (b) => numberedRecords(b, "heading"),
    key: byNumber,
  },
  {
    id: "tabarani-kabir",
    kind: "hadith",
    title: "al-Mu'jam al-Kabir",
    author: "al-Tabarani (d. 360)",
    version: "0360Tabarani.MucjamKabir.Shamela0001733-ara1",
    sha256: "eb9602ce2c74056a4b1072672d19fdb5df00e79e57ca467f20bf07e069f8daa5",
    ymlSha256: "aa76873f4364a13233e4da2e353ae89386f6e18e00bf5c9998c63d9fd0a3f086",
    build: (b) => numberedRecords(b, "heading"),
    key: (d) => `${d.vol ?? 0}/${d.n}`,
  },
  {
    id: "abunuaym-dalail",
    kind: "hadith",
    title: "Dala'il al-Nubuwwa",
    author: "Abu Nu'aym al-Isbahani (d. 430)",
    version: "0430AbuNucaymIsbahani.DalailNubuwwa.Shamela0010637-ara1",
    sha256: "4ccd9fabb28396076bacae5fb14b91239d10e0b968cb0bc469611c2fff77cde7",
    ymlSha256: "d2ba8d562634e01ba504ae87e6fce207fafe97923d24d774e9b5de5da764ab1e",
    build: (b) => numberedRecords(b, "para"),
    key: byNumber,
  },
  {
    id: "bayhaqi-dalail",
    kind: "hadith",
    title: "Dala'il al-Nubuwwa",
    author: "al-Bayhaqi (d. 458)",
    version: "0458Bayhaqi.DalailNubuwwa.JK006838-ara1",
    sha256: "c287a5f560d06059fa7770af19cd3c4d3de91d62ff50e5903ee6c67aec1fc8b6",
    ymlSha256: "b56084b1629afbab082d6c7ebcb17b2223f32d5b14ee9cd2f6caac30de020a72",
    build: reports,
    key: byPage,
  },
  {
    id: "ibnsad",
    kind: "sira",
    title: "al-Tabaqat al-Kubra",
    author: "Ibn Sa'd (d. 230)",
    version: "0230IbnSacd.TabaqatKubra.Shamela0009351-ara2",
    sha256: "4f26a65e1c1d84684e17eebb78e4b68d63f9bf7ce614a01f95e47fb226f4884e",
    ymlSha256: "d7fa11ae4b1a459b9634e8cafe2f4bf0e326a546288ec35a3309794e3dc4fb20",
    build: reports,
    key: byPage,
  },
  {
    id: "shifa",
    kind: "sira",
    title: "al-Shifa bi-Ta'rif Huquq al-Mustafa",
    author: "al-Qadi 'Iyad (d. 544)",
    version: "0544QadiCiyad.Shifa.Shamela0023645-ara1",
    sha256: "77c0ea56402ba3e854d58906e9c1f8fcd166a25d0b4ed641df2197c1b220ccc1",
    ymlSha256: "b3d4abdffd93581997bab7a0d6646aa06f51abc16ac31942ae6066a909755d52",
    build: chunks,
    key: byPage,
  },
  {
    id: "qari-jam",
    kind: "commentary",
    title: "Jam' al-Wasa'il fi Sharh al-Shama'il",
    author: "Mulla 'Ali al-Qari (d. 1014)",
    version: "1014MullaCaliQari.JamcWasail.Shamela0002569-ara1",
    sha256: "dbd21dbfc3998b5d9c1569ad3bf3c22eceed5d0f08e70cec1852a5128cc1da48",
    ymlSha256: "0461d436d6a5428e3b7b332fa1231d6758deeb6c9e795eb738586b4486356276",
    build: chunks,
    key: byPage,
  },
  {
    id: "haytami-ashraf",
    kind: "commentary",
    title: "Ashraf al-Wasa'il ila Fahm al-Shama'il",
    author: "Ibn Hajar al-Haytami (d. 974)",
    version: "0974IbnHajarHaytami.AshrafWasail.Sham19Y0122255-ara1",
    sha256: "4a6342c0da33c262be276db7415d62b55bd1f6b617ee66316f4dcc960383a20b",
    ymlSha256: "28a1220f6860782c7899bc92c6be541bbb0ec778f653e9435310767862cf2f00",
    build: chunks,
    key: byPage,
  },
  {
    id: "lisan",
    kind: "lexicon",
    title: "Lisan al-'Arab",
    author: "Ibn Manzur (d. 711)",
    version: "0711IbnManzurIfriqi.LisanCarab.Shamela0001687-ara1",
    sha256: "34fa56710a5b701532a34cb70f8fe440b261e80ae3c40d9667d18b65be7ed86d",
    ymlSha256: "93d473220736c960b79832f678d9243ea1ee4ab7488d3d9f0bf32340da116969",
    build: (b) => lexiconRecords(b, lisan),
    key: byHeadword,
  },
  {
    id: "nihaya",
    kind: "lexicon",
    title: "al-Nihaya fi Gharib al-Hadith wa-l-Athar",
    author: "Majd al-Din Ibn al-Athir (d. 606)",
    version: "0606IbnAthirMajdDin.NihayaFiGharib.Shamela0023691-ara1",
    sha256: "3ad329fda3a6537fefdb285bdd507f597a32079dcfdadc2582be3bbb8c35a854",
    ymlSha256: "99ec0b5282f961911ca153a555699a2bee78ea4b30855c00e4d33d195e033acd",
    build: (b) => lexiconRecords(b, nihaya),
    key: byHeadword,
  },
  {
    id: "maqayis",
    kind: "lexicon",
    title: "Mu'jam Maqayis al-Lugha",
    author: "Ibn Faris (d. 395)",
    version: "0395IbnFarisQazwini.MucjamMaqayis.JK008008-ara1",
    sha256: "da8853fc941d4016a533fd9c7a1f794a2ccfa92f1c74e68d4acbd6d910e72a67",
    ymlSha256: "275c0d4a6595aaddb6239882ec603390573d0739c4a3420f4b59837df546f2a6",
    build: (b) => lexiconRecords(b, maqayis),
    key: byHeadword,
  },
  {
    id: "taj",
    kind: "lexicon",
    title: "Taj al-'Arus min Jawahir al-Qamus",
    author: "Murtada al-Zabidi (d. 1205)",
    version: "1205MurtadaZabidi.TajCarus.JK007140-ara1",
    sha256: "640b8bb9f69bb62a87c9a044c319ae2e3eaf5a2c5f40758aaf7844144d1c2ad4",
    ymlSha256: "20de1609344b1f6801fe66cc3f1445571c98a8a2f59712969638a04fcb8a229b",
    build: (b) => lexiconRecords(b, taj),
    key: byHeadword,
  },
];
