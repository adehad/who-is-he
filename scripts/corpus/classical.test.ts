import { expect, test } from "bun:test";
import { OPENITI_BOOKS } from "./classical";
import { parseMarkdown } from "./openiti";

/** The keys and texts one book's rules give for a small mARkdown body. */
function entries(id: string, body: string) {
  const book = OPENITI_BOOKS.find((b) => b.id === id);
  if (!book) throw new Error(id);
  const { records } = book.build(parseMarkdown(`#META#Header#End#\n${body}`));
  return records.map((r) => [book.key(r), r.ar]);
}

test("Lisan entries open at '### $ root:' headings", () => {
  expect(entries("lisan", "### || فصل الضاد\n### $ ضلع: الضلع محنية الجنب\n~~مؤنثة")).toEqual([
    ["ضلع", "الضلع محنية الجنب مؤنثة"],
  ]);
});

test("Nihaya entries open at '(root)' headings; other stray headings stay text", () => {
  expect(
    entries("nihaya", "### | باب الشين\n### | (شنب)\n# الشنب: البياض\n### | ابه.\n# تتمة"),
  ).toEqual([["شنب", "الشنب: البياض ابه. تتمة"]]);
});

test("Maqayis entries open at '| ( root )', also without the '(', not at Quran quotations", () => {
  const body = [
    "# | 2 ( باب الهمزة )",
    "# | ( أب ) أصلان ^ ( وفاكهة وأبا ) ^ قال",
    "~~الخير ) ^ وقال | ضلع ) أصل واحد",
  ].join("\n");
  expect(entries("maqayis", body)).toEqual([
    ["أب", "أصلان ^ ( وفاكهة وأبا ) ^ قال الخير ) ^ وقال"],
    ["ضلع", "أصل واحد"],
  ]);
});

test("Taj entries open at a '|' paragraph naming a root, whole or letter by letter", () => {
  const body = [
    "# | 2 ( فصل الضاد ) 2",
    "# |ضلع",
    "# الضلع كعنب",
    "# | ز ن د ق",
    "# الزندوق",
    "# | 3 ( ف ط ر )",
    "# فطر",
    "# | ( الكلع ، محركة ) وفي الصحاح",
  ].join("\n");
  expect(entries("taj", body)).toEqual([
    ["ضلع", "الضلع كعنب"],
    ["زندق", "الزندوق"],
    ["فطر", "فطر"],
    ["الكلع", "( الكلع ، محركة ) وفي الصحاح"],
  ]);
});

test("al-Tabarani's key carries the volume, as numbering restarts by volume", () => {
  expect(entries("tabarani-kabir", "### | 1 - \n# حدثنا\n# PageV17P005")).toEqual([
    ["17/1", "حدثنا"],
  ]);
});
