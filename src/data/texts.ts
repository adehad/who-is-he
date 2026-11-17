import corrections from "#data/corrections.json";
import rawTexts from "#data/texts.json";
import type { Ref } from "@/models/ref";

export interface RawText {
  ar: string;
  narrator: string;
  en: string;
  ch: number;
  ch_en: string;
  ch_ar: string;
  in_book: string | null;
  grade: string | null;
}
export interface Correction {
  ref: string;
  field: "en" | "narrator";
  find: string;
  replace: string | null;
  confidence: "clear" | "scholar-check";
  reason: string;
}
export interface Text extends RawText {
  corrected?: { original: string; replacement: string; reason: string }[];
}

const occurrences = (s: string, find: string) => s.split(find).length - 1;

/**
 * Apply "clear" corrections in place.
 * Every correction for a text we hold has its `find` checked, scholar-check included.
 * Corrections for refs we do not hold are counted as skipped. Throws listing every bad correction.
 */
export function applyCorrections(
  texts: Record<string, RawText & Partial<Text>>,
  list: readonly Correction[],
): { applied: number; skipped: number } {
  const errors: string[] = [];
  let applied = 0;
  let skipped = 0;
  for (const c of list) {
    if (
      (c.field !== "en" && c.field !== "narrator") ||
      (c.confidence !== "clear" && c.confidence !== "scholar-check")
    ) {
      errors.push(`${c.ref}: bad field/confidence`);
      continue;
    }
    const t = texts[c.ref];
    if (!t) {
      skipped++; // not used on the site
      continue;
    }
    const n = occurrences(t[c.field], c.find);
    if (n !== 1) {
      errors.push(`${c.ref} ${c.field}: find occurs ${n} times: ${JSON.stringify(c.find)}`);
      continue;
    }
    if (c.confidence !== "clear") continue;
    if (!c.replace) {
      errors.push(`${c.ref}: clear correction needs a replace`);
      continue;
    }
    t[c.field] = t[c.field].replace(c.find, () => c.replace ?? "");
    t.corrected = [
      ...(t.corrected ?? []),
      { original: c.find, replacement: c.replace, reason: c.reason },
    ];
    applied++;
  }
  if (errors.length) throw new Error(`corrections failed:\n  ${errors.join("\n  ")}`);
  return { applied, skipped };
}

export function resolveTexts(): Record<Ref, Text> {
  const out: Record<string, Text> = structuredClone(rawTexts);
  applyCorrections(out, corrections as Correction[]);
  return out as Record<Ref, Text>;
}

export const TEXTS = resolveTexts();
