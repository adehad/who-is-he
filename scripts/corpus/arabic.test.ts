import { describe, expect, test } from "bun:test";
import { arabicSimilarity, normaliseArabic } from "./arabic";

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
