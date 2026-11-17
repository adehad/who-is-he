import { describe, expect, test } from "bun:test";
import { cite, gradeClass } from "@/lib/citation";

const source = (source: string, more = {}) => ({
  ar: "",
  source,
  kind: "hadith",
  edition: "",
  grade: null,
  ...more,
});

describe("gradeClass", () => {
  test("marks weak, broken and rejected chains in English and Arabic", () => {
    for (const g of ["Da'if (Albani)", "إسناده ضعيف", "حذفه الذهبي من التلخيص لضعفه", "سنده واه"])
      expect(gradeClass(g), g).toBe("weak");
  });

  test("a negated صحيح is weak, and رواه is not واه", () => {
    expect(gradeClass("ليس بصحيح")).toBe("weak");
    expect(gradeClass("صحيح")).toBe("");
    expect(gradeClass("رواه مسلم")).toBe("");
  });
});

describe("cite", () => {
  test("a repeat on the same page is told apart, and an unknown page gives the volume", () => {
    const first = cite("bayhaqi-dalail:1/285", source("bayhaqi-dalail")).label;
    const second = cite("bayhaqi-dalail:1/285-2", source("bayhaqi-dalail")).label;
    expect(first).toContain("1:285");
    expect(second).toContain("1:285");
    expect(second).not.toBe(first);
    expect(cite("ibnsad:1/0", source("ibnsad")).label).toContain("vol. 1");
  });

  test("only sunnah.com and Quran refs link out", () => {
    expect(cite("quran:68:4", source("quran", { kind: "quran" })).url).toBe(
      "https://tanzil.net/#68:4",
    );
    expect(cite("hakim:4274", source("hakim")).url).toBeNull();
  });
});
