import { BOOKS } from "@/data/books";
import { TEXTS } from "@/data/texts";
import type { Ref } from "@/models/ref";
import { h, type Kid } from "./dom";

export interface Cite {
  label: string;
  url: string;
  exact: boolean;
  grade: string | null;
}

export function cite(ref: Ref): Cite {
  const t = TEXTS[ref];
  const [col = "", n = ""] = ref.split(":");
  // t.sunnah is the real sunnah.com reference, matched by Arabic text (scripts/match_sunnah.py).
  const num = t.sunnah ? (t.sunnah.ref.split(":")[1] ?? "") : n;
  const url = t.sunnah ? `https://sunnah.com/${t.sunnah.ref}` : `https://sunnah.com/${col}/${t.ch}`;
  const grade = t.sunnah?.grade ?? null;
  if (col === "shamail")
    return { label: `Shamāʾil ${num} (ch. ${t.ch})`, url, exact: !!t.sunnah, grade };
  const b = BOOKS[col] ?? { name: col };
  const book = b.books?.[t.ch] ?? t.ch_en ?? "Book";
  return { label: `${b.name}, ${book} (${t.ch}): ${num}`, url, exact: !!t.sunnah, grade };
}

export function sourceBlock(ref: Ref, extra: Kid[] = []): HTMLDivElement {
  const c = cite(ref);
  const t = TEXTS[ref];
  return h(
    "div",
    { class: "meta" },
    h("a", { class: "cite", href: c.url, target: "_blank", rel: "noopener" }, c.label),
    c.exact ? null : h("span", {}, "(opens the book; number to verify)"),
    c.grade
      ? h(
          "span",
          {
            class: `badge ${/da.?if/i.test(c.grade) ? "weak" : ""}`,
            title: "Grade as shown on sunnah.com",
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
      h("summary", {}, "Read the full hadith"),
      h(
        "div",
        { class: "src" },
        h("p", { lang: "ar" }, t.ar),
        h("p", { class: "en" }, h("strong", {}, t.narrator), " ", t.en),
        ...(t.corrected ?? []).map((c) =>
          h(
            "p",
            { class: "note" },
            `We corrected the dataset English: “${c.original}” → “${c.replacement}”. `,
            c.reason,
          ),
        ),
        h("small", {}, `Chapter: ${t.ch_en} · `, h("span", { lang: "ar" }, t.ch_ar)),
      ),
    ),
  );
}
