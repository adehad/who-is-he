import { describe, expect, test } from "bun:test";
import { lexiconRecords, numberedRecords, parseMarkdown, proseRecords, splitAt } from "./openiti";

const book = (body: string) =>
  `######OpenITI#\n#META# 020.BookTITLE\t:: x\n#META#Header#End#\n${body}`;

describe("parseMarkdown", () => {
  test("drops the header and milestones, joins ~~ and bare lines to their paragraph", () => {
    const blocks = parseMarkdown(book("# قال رسول الله ms0001 صلى\n~~الله عليه\nوسلم\n# ثم"));
    expect(blocks).toEqual([
      { t: "text", text: "قال رسول الله صلى", para: true },
      { t: "text", text: "الله عليه", para: false },
      { t: "text", text: "وسلم", para: false },
      { t: "text", text: "ثم", para: true },
    ]);
  });

  test("gives page markers on their own line, inline and in headings as page blocks in order", () => {
    const blocks = parseMarkdown(
      book("# PageV01P005\nPageV01P006\n~~أول PageV02P010 ثان\n### || باب PageV02P011"),
    );
    expect(blocks).toEqual([
      { t: "page", vol: 1, page: 5 },
      { t: "page", vol: 1, page: 6 },
      { t: "text", text: "أول", para: false },
      { t: "page", vol: 2, page: 10 },
      { t: "text", text: "ثان", para: false },
      { t: "heading", mark: "||", text: "باب" },
      { t: "page", vol: 2, page: 11 },
    ]);
  });

  test("drops printed-page headings and JK markup", () => {
    const blocks = parseMarkdown(book("### | [ص: 178]\n# *!الضلع @30@ @QB@ آية @QE@"));
    expect(blocks).toEqual([{ t: "text", text: "الضلع آية", para: true }]);
  });
});

describe("numberedRecords", () => {
  const src = book(
    [
      "### | باب في حسنه",
      "# PageV01P020",
      "### | 59 - ",
      "# أخبرنا فلان",
      "~~قال: أفلج",
      "### | [تعليق المحقق]",
      "# إسناده حسن",
      "# PageV01P021",
      "### | 60 - ",
      "# حدثنا آخر",
      "# PageV00P000",
      "### $ 1 - كتاب الطهارة",
      "# PageV02P001",
    ].join("\n"),
  );

  test("numbers records, takes the comment as the grade and keeps chapter headings", () => {
    const { records } = numberedRecords(parseMarkdown(src), "heading");
    expect(records.map((r) => [r.n, r.ar, r.grade, r.heading])).toEqual([
      [59, "أخبرنا فلان قال: أفلج", "إسناده حسن", "باب في حسنه"],
      [60, "حدثنا آخر", undefined, "باب في حسنه"],
    ]);
  });

  test("a record's page is the next marker; an unnumbered page leaves it null", () => {
    const { records, stats } = numberedRecords(parseMarkdown(src), "heading");
    expect(records.map((r) => [r.vol, r.page])).toEqual([
      [1, 21],
      [2, null],
    ]);
    // 60 took its volume from V02 while the last numbered marker before it was V01.
    expect(stats.straddles).toBe(1);
  });

  test("numbers in paragraphs, as Abu Nu'aym writes them", () => {
    const { records } = numberedRecords(
      parseMarkdown(book("# 3 - \n# وذلك ما حدثناه\n# 4 - حدثنا")),
      "para",
    );
    expect(records.map((r) => [r.n, r.ar])).toEqual([
      [3, "وذلك ما حدثناه"],
      [4, "حدثنا"],
    ]);
  });
});

test("proseRecords splits at headings and where the rule says", () => {
  const blocks = parseMarkdown(book("### || باب\n# أخبرنا أ\n# وقال ب\n# أخبرنا ج\nPageV01P009"));
  const { records } = proseRecords(blocks, (p) => p.startsWith("أخبرنا"));
  expect(records.map((r) => [r.ar, r.heading, r.page])).toEqual([
    ["أخبرنا أ وقال ب", "باب", 9],
    ["أخبرنا ج", "باب", 9],
  ]);
});

test("lexiconRecords opens entries where the rules find a key and drops text before them", () => {
  const blocks = parseMarkdown(book("# مقدمة\n# | ( أب ) أصلان | ( أت ) واحد\nPageV01P029"));
  const { records, stats } = lexiconRecords(blocks, {
    text: (t) => splitAt(t, /\|\s*\(\s*([^()]+?)\s*\)/g, (m) => ({ key: m[1] ?? "" })),
  });
  expect(records.map((r) => [r.key, r.ar, r.page])).toEqual([
    ["أب", "أصلان", 29],
    ["أت", "واحد", 29],
  ]);
  expect(stats.dropped).toBe("مقدمة".length);
});
