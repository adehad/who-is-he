import { expect, test } from "bun:test";
import { uniqueKeys } from "./sources";
import { parseTanzil } from "./tanzil";

test("uniqueKeys suffixes each repeat of a key, keeping the first as is", () => {
  expect(uniqueKeys(["1/5", "1/5", "1/6", "1/5"])).toEqual({
    keys: ["1/5", "1/5-2", "1/6", "1/5-3"],
    repeats: 2,
  });
});

test("parseTanzil keeps verses and the trailing notice verbatim and rejects other lines", () => {
  const src = "68|4|وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ\n\n# Tanzil Quran Text\n#  License: CC BY 3.0\n";
  const { verses, notice } = parseTanzil(src);
  expect([...verses]).toEqual([["68:4", "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ"]]);
  expect(notice).toBe("# Tanzil Quran Text\n#  License: CC BY 3.0");
  expect(() => parseTanzil("68:4 text")).toThrow(/sura\|aya\|text/);
});
