import { describe, expect, test } from "bun:test";
import { buckwalterToArabic, laneLabel, parseLane } from "./lane";

describe("buckwalterToArabic", () => {
  test("converts letters and vowels", () => {
    expect(buckwalterToArabic("DalaEa")).toBe("ضَلَعَ");
    expect(buckwalterToArabic("Al$~awokapi")).toBe("الشَّوْكَةِ");
  });
  test("reads Perseus hamza seats and madda from the mark after the letter", () => {
    expect(buckwalterToArabic("A^aboladu")).toBe("أَبْلَدُ");
    expect(buckwalterToArabic("A_ilaY")).toBe("إِلَى");
    expect(buckwalterToArabic("maA='u")).toBe("مَآءُ");
    expect(buckwalterToArabic("A@ll~`hu")).toBe("ٱللّٰهُ");
    expect(buckwalterToArabic("$anuw^apN")).toBe("شَنُؤَةٌ");
    expect(buckwalterToArabic("DA^")).toBe("ضأ");
  });
});

test("laneLabel keeps Lane's English words and lists the roots", () => {
  expect(laneLabel("DlE &c.")).toEqual({ label: "ضلع", roots: ["ضلع"] });
  expect(laneLabel("$Sw and $SY")).toEqual({ label: "شصو and شصى", roots: ["شصو", "شصى"] });
  expect(laneLabel("Quasi bwj")).toEqual({ label: "Quasi بوج", roots: ["بوج"] });
});

test("parseLane reads each root article with its page, headwords and text", () => {
  const xml = `<TEI.2><text><body><div1>
    <pb n="1799" TEIform="pb"/>
    <div2 n="DlE" type="root" org="uniform"><head><foreign lang="ar">DlE</foreign></head>
      <entryFree key="DalaEa"><form><orth lang="ar">DalaEa</orth><orth lang="ar">*</orth></form>,
        <hi rend="ital">he inclined</hi> &amp;c. <foreign lang="ar">DaloEN</foreign> (S, K.)
        <pb n="1800"/></entryFree>
    </div2>
    <div2 type="root" n="Dlf"><entryFree><orth lang="ar">Dalafa</orth></entryFree></div2>
  </div1></body></text></TEI.2>`;
  expect(parseLane(xml)).toEqual([
    {
      root: "ضلع",
      label: "ضلع",
      page: 1799,
      headwords: ["ضَلَعَ"],
      text: "ضَلَعَ, he inclined &c. ضَلْعٌ (S, K.)",
    },
    { root: "ضلف", label: "ضلف", page: 1800, headwords: ["ضَلَفَ"], text: "ضَلَفَ" },
  ]);
});
