import { describe, expect, test } from "bun:test";
import {
  arabicSimilarity,
  normaliseArabic,
  normaliseWithOffsets,
  rootKey,
  rootRegex,
} from "./arabic";

describe("normaliseArabic", () => {
  test("strips harakat, tatweel and Quranic marks", () => {
    expect(normaliseArabic("رَسُولُ اللَّهِ")).toBe("رسول الله");
    expect(normaliseArabic("كـــتاب")).toBe("كتاب");
    expect(normaliseArabic("الْعَالَمِينَۖ")).toBe("العالمين");
  });
  test("folds alef, ya and hamza seats", () => {
    expect(normaliseArabic("أَإِآٱ")).toBe("اااا");
    expect(normaliseArabic("عَلَى")).toBe("علي");
    expect(normaliseArabic("مُؤْمِن سَائِل")).toBe("مومن سايل");
  });
  test("ta marbuta only on request", () => {
    expect(normaliseArabic("رَحْمَة")).toBe("رحمة");
    expect(normaliseArabic("رَحْمَة", { taMarbuta: true })).toBe("رحمه");
  });
  test("expands ﷺ", () => {
    expect(normaliseArabic("النَّبِيُّ ﷺ")).toBe("النبي صلي الله عليه وسلم");
  });
});

test("arabicSimilarity ignores voweling", () => {
  expect(arabicSimilarity("قَالَ رَسُولُ اللَّهِ", "قال رسول الله")).toBe(1);
  expect(arabicSimilarity("قال", "كتب")).toBe(0);
});

test("normaliseWithOffsets gives the same text and maps back to the input", () => {
  const s = "  قَالَ النَّبِيُّ ﷺ:  رَحْمَةٌ ";
  for (const taMarbuta of [false, true]) {
    const { text, offsets } = normaliseWithOffsets(s, { taMarbuta });
    expect(text).toBe(normaliseArabic(s, { taMarbuta }));
    expect(offsets).toHaveLength(text.length);
  }
  const { text, offsets } = normaliseWithOffsets(s);
  const i = text.indexOf("النبي");
  expect(s.slice(offsets[i], (offsets[i + 4] ?? 0) + 1)).toBe("النَّبِي");
});

describe("rootRegex", () => {
  const hits = (root: string, words: string[]) =>
    words.filter((w) => rootRegex(root).test(normaliseArabic(w)));

  test("finds derived words with affixes and up to two letters between root letters", () => {
    expect(hits("رحم", ["رَحْمَةٌ", "الرَّحِيمُ", "فَرَاحِمُ", "يَرْحَمُكُمُ"])).toHaveLength(4);
  });
  test("keeps to one word and to the root's order", () => {
    expect(hits("رحم", ["حرم", "ر حم", "رجل حمل"])).toEqual([]);
  });
  test("folds the root like the text, and a root hamza matches any seat", () => {
    expect(hits("أكل", ["يَأْكُلُ", "أَكَلَ"])).toHaveLength(2);
    expect(hits("سءل", ["سَأَلَ", "مَسْؤُولٌ", "سَائِلٌ"])).toHaveLength(3);
  });
  test("rejects a root that is not 2 to 4 letters", () => {
    expect(() => rootRegex("ر")).toThrow(/2 to 4/);
  });
});

test("rootKey folds hamza seats and vowels so lexicons' spellings of a root compare equal", () => {
  expect(rootKey("ضَلَعَ")).toBe(rootKey("ضلع"));
  expect(rootKey("أبأ")).toBe(rootKey("ءبء"));
  expect(rootKey("بئر")).toBe(rootKey("بأر"));
  expect(rootKey("رمى")).toBe(rootKey("رمي"));
});
