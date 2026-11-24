import { describe, expect, test } from "bun:test";
import corrections from "#data/corrections.json";
import { applyCorrections, type Correction, resolveTexts, TEXTS } from "@/data/texts";
import type { Ref } from "@/models/ref";

const one = {
  "shamail:1": {
    ar: "",
    narrator: "n",
    en: "aa",
    ch: 1,
    ch_en: "",
    ch_ar: "",
    in_book: null,
    grade: null,
  },
};

describe("texts", () => {
  test("sunnah.com texts have English; other sources only where the source has it", () => {
    for (const [ref, t] of Object.entries(TEXTS))
      if (!("source" in t)) expect(t.en.length, ref).toBeGreaterThan(0);
      else expect(t.en !== undefined, ref).toBe(t.source === "quran" || t.source === "lane");
  });

  test("every clear correction to a cited text is applied, and nothing else", () => {
    const cited = (corrections as Correction[]).filter(
      (c): c is Correction & { replace: string } =>
        c.confidence === "clear" && c.ref in TEXTS && typeof c.replace === "string",
    );
    for (const c of cited)
      expect(TEXTS[c.ref as Ref].corrected, c.ref).toContainEqual({
        original: c.find,
        replacement: c.replace,
        reason: c.reason,
      });
    const n = Object.values(TEXTS).reduce((a, t) => a + (t.corrected?.length ?? 0), 0);
    expect(n).toBe(cited.length);
  });

  test("throws when a find string is not present exactly once", () => {
    expect(() =>
      applyCorrections(one, [
        {
          ref: "shamail:1",
          field: "en",
          find: "a",
          replace: "b",
          confidence: "clear",
          reason: "r",
        },
      ]),
    ).toThrow(/occurs 2 times/);
  });

  test("checks find count for scholar-check corrections too, without applying them", () => {
    const t = structuredClone(one);
    expect(() =>
      applyCorrections(t, [
        {
          ref: "shamail:1",
          field: "en",
          find: "a",
          replace: null,
          confidence: "scholar-check",
          reason: "r",
        },
      ]),
    ).toThrow(/occurs 2 times/);
    expect(
      applyCorrections(t, [
        {
          ref: "shamail:1",
          field: "en",
          find: "aa",
          replace: null,
          confidence: "scholar-check",
          reason: "r",
        },
      ]),
    ).toEqual({ applied: 0, skipped: 0 });
    expect(t["shamail:1"].en).toBe("aa");
  });

  test("skips refs not on the site and rejects bad field/confidence", () => {
    const t = structuredClone(one);
    const skipped = {
      ref: "x:1",
      field: "en",
      find: "a",
      replace: "b",
      confidence: "clear",
      reason: "r",
    } as const;
    expect(applyCorrections(t, [skipped])).toEqual({ applied: 0, skipped: 1 });
    const bad = JSON.parse(
      '{"ref":"shamail:1","field":"ar","find":"a","replace":"b","confidence":"x","reason":"r"}',
    );
    expect(() => applyCorrections(t, [bad])).toThrow(/bad field\/confidence/);
  });

  test("rejects a correction to a field the text lacks", () => {
    const verse = { "quran:1:1": { ar: "", source: "quran", kind: "quran", edition: "", en: "x" } };
    expect(() =>
      applyCorrections(verse, [
        {
          ref: "quran:1:1",
          field: "narrator",
          find: "x",
          replace: "y",
          confidence: "clear",
          reason: "r",
        },
      ]),
    ).toThrow(/has no narrator/);
  });

  test("clear correction without replace throws", () => {
    expect(() =>
      applyCorrections(structuredClone(one), [
        {
          ref: "shamail:1",
          field: "en",
          find: "aa",
          replace: null,
          confidence: "clear",
          reason: "r",
        },
      ]),
    ).toThrow(/needs a replace/);
  });

  test("resolveTexts is deterministic", () => {
    expect(resolveTexts()).toEqual(resolveTexts());
    expect(corrections.length).toBeGreaterThan(0);
  });
});
