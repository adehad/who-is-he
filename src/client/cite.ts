import { cite, gradeClass } from "@/lib/citation";
import type { ClientText } from "@/lib/client-texts";
import type { Ref } from "@/models/ref";
import { h, type Kid } from "./dom";
import { textFor } from "./texts";

// Letter-spacing breaks joined Arabic letters, and the badge's Latin size is too small for Amiri.
const ARABIC_BADGE = { lang: "ar", style: "font:700 0.85rem/1.2 var(--ar);letter-spacing:0" };

const READ: Record<string, string> = {
  quran: "Read the verse",
  lexicon: "Read the entry",
  commentary: "Read the full passage",
  sira: "Read the full passage",
};

/** sunnah.com's narrator and English, a source's own English, or nothing for an Arabic-only text. */
function english(t: ClientText): Kid {
  if (!("source" in t)) return h("p", { class: "en" }, h("strong", {}, t.narrator), " ", t.en);
  return t.en ? h("p", { class: "en" }, t.en) : null;
}

function whereFrom(t: ClientText): Kid[] {
  if (!("source" in t))
    return [h("small", {}, `Chapter: ${t.ch_en} · `, h("span", { lang: "ar" }, t.ch_ar))];
  return [
    t.heading
      ? h(
          "small",
          {},
          t.kind === "lexicon" ? "Section: " : "Chapter: ",
          h("span", { lang: "ar" }, t.heading),
        )
      : null,
    h("small", {}, t.en ? "" : "Arabic only, untranslated. ", "Edition: ", ...edition(t.edition)),
  ];
}

/** The printed edition, mostly Arabic, isolated from the Latin OpenITI release that follows it. */
function edition(s: string): Kid[] {
  const [, printed = s, release] = s.match(/^(.*?)\s*\((OpenITI [^)]*)\)$/) ?? [];
  return [
    printed ? h("bdi", {}, printed) : null,
    release ? `${printed ? " " : ""}(${release})` : null,
  ];
}

export function sourceBlock(ref: Ref, extra: Kid[] = []): HTMLDivElement {
  const t = textFor(ref);
  const c = cite(ref, t);
  return h(
    "div",
    { class: "meta" },
    c.url
      ? h("a", { class: "cite", href: c.url, target: "_blank", rel: "noopener" }, c.label)
      : h("span", { class: "cite" }, c.label),
    c.grade
      ? h(
          "span",
          {
            class: `badge ${gradeClass(c.grade)}`,
            title: c.gradeBy,
            ...(/[\u0600-\u06ff]/.test(c.grade) ? ARABIC_BADGE : {}),
          },
          c.grade,
        )
      : null,
    ...extra,
    t.corrected ? h("span", { class: "badge" }, "Translation corrected") : null,
    h("span", { class: "badge draft" }, "Draft"),
    h(
      "details",
      { style: "flex-basis:100%" },
      h("summary", {}, ("source" in t && READ[t.kind]) || "Read the full hadith"),
      h(
        "div",
        { class: "src" },
        h("p", { lang: "ar" }, t.ar),
        english(t),
        ...(t.corrected ?? []).map((c) =>
          h(
            "p",
            { class: "note" },
            `We corrected the dataset English: “${c.original}” → “${c.replacement}”. `,
            c.reason,
          ),
        ),
        ...whereFrom(t),
      ),
    ),
  );
}
