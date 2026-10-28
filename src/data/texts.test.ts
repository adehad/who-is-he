import { describe, expect, test } from "bun:test";
import corrections from "#data/corrections.json";
import { applyCorrections, resolveTexts, TEXTS } from "@/data/texts";

const one = { "shamail:1": { ar: "", narrator: "n", en: "aa", ch: 1, ch_en: "", ch_ar: "" } };

describe("texts", () => {
  test("every text has sunnah.com ref and English", () => {
    for (const [ref, t] of Object.entries(TEXTS)) {
      expect(t.sunnah, ref).toBeDefined();
      expect(t.en.length, ref).toBeGreaterThan(0);
    }
  });

  test("clear corrections applied (6, matching concept build)", () => {
    const n = Object.values(TEXTS).reduce((a, t) => a + (t.corrected?.length ?? 0), 0);
    expect(n).toBe(6);
  });

  test("bedtime text keeps all three Quls (sunnah.com English, no bracket loss)", () => {
    expect(TEXTS["shamail:248"]?.en).toMatch(/113/);
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
