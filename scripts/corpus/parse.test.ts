import { describe, expect, test } from "bun:test";
import { arabicNumberToRef, fromHf, intString, nullish, numberFromRefRaw } from "./parse";

describe("arabicNumberToRef", () => {
  test("maps the fractional part to a letter", () => {
    expect(arabicNumberToRef("2331.01")).toBe("2331a");
    expect(arabicNumberToRef("2331.03")).toBe("2331c");
    expect(arabicNumberToRef("10.26")).toBe("10z");
  });
  test("keeps a whole number", () => {
    expect(arabicNumberToRef("2331")).toBe("2331");
    expect(arabicNumberToRef(2331)).toBe("2331");
  });
  test("rejects what does not fit the pattern", () => {
    expect(arabicNumberToRef(undefined)).toBeNull();
    expect(arabicNumberToRef("2331.27")).toBeNull();
    expect(arabicNumberToRef("2331.00")).toBeNull();
    expect(arabicNumberToRef("x")).toBeNull();
  });
});

describe("numberFromRefRaw", () => {
  test("takes the letter suffix the url drops", () => {
    expect(numberFromRefRaw("Sahih Muslim 2331a", "2331")).toBe("2331a");
    expect(numberFromRefRaw("Sahih Muslim 4 a", "4")).toBe("4a");
  });
  test("picks the url's number from a combined reference", () => {
    expect(numberFromRefRaw("Sahih al-Bukhari 299, 300, 301", "300")).toBe("300");
    expect(numberFromRefRaw("Jami` at-Tirmidhi 2824, 2824b, 2824c", "2824")).toBe("2824");
  });
  test("null when the number is absent", () => {
    expect(numberFromRefRaw("Sahih al-Bukhari 1", "2")).toBeNull();
    expect(numberFromRefRaw(null, "2")).toBeNull();
  });
});

describe("missing values", () => {
  test('null, "" and "None" are missing', () => {
    expect(nullish("None")).toBeNull();
    expect(nullish("")).toBeNull();
    expect(nullish(null)).toBeNull();
    expect(nullish(" x ")).toBe("x");
    expect(intString("56.0")).toBe("56");
    expect(intString("None")).toBeNull();
  });

  test("fromHf normalises a dataset row", () => {
    const row = fromHf({
      url: "https://sunnah.com/muslim:2331",
      ref_raw: "Sahih Muslim 2331a",
      arabic_full: "ع",
      text_en: "t",
      narrator_en: "",
      book_no: "43.0",
      chapter_ar: "None",
      gradings: '[{"status": "Sahih", "scholar": "Darussalam", "arabic": ""}]',
    });
    expect(row).toMatchObject({
      ref: "muslim:2331a",
      collection: "muslim",
      narrator: null,
      book_no: "43",
      chapter_ar: null,
      grades: [{ status: "Sahih", scholar: "Darussalam", arabic: "" }],
    });
    expect(row.ref_uncertain).toBeUndefined();
  });

  test("a book-page url gives an uncertain ref from the dataset id", () => {
    const row = fromHf({ url: "https://sunnah.com/mishkat/30", hadith_id: "30-1", gradings: "[]" });
    expect(row.ref).toBe("mishkat:30-1");
    expect(row.ref_uncertain).toBe(true);
  });
});
