// One-off: evaluate the concept page's literal block and write typed TS content/art files.
// Run once; afterwards the TS files are the source of truth and this script can be deleted.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const html = readFileSync("concept/little-hilya.src.html", "utf8");
const start = html.indexOf("const ICONS = {");
const end = html.indexOf("function cite(ref)");
if (start < 0 || end < 0) throw new Error("concept literal block not found");
const block = html.slice(start, end);

const names = [
  "ICONS",
  "CORNER",
  "CHILD",
  "PROPS",
  "BACKDROPS",
  "KINDS",
  "STATIONS",
  "SKINS",
  "COVERS",
  "PARTS",
  "STORY",
];
// Evaluates our own concept source (one-off migration).
const data = new Function(`${block}\nreturn { ${names.join(", ")} };`)() as Record<string, unknown>;

const lit = (v: unknown) => JSON.stringify(v, null, 2);
const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const pad = (n: number) => String(n).padStart(2, "0");
const write = (path: string, body: string) => {
  writeFileSync(path, `${body.trim()}\n`);
  console.log("wrote", path);
};

mkdirSync("src/art", { recursive: true });
mkdirSync("src/data/stations", { recursive: true });
mkdirSync("src/data/story", { recursive: true });

write(
  "src/art/icons.ts",
  `export const ICONS = ${lit(data.ICONS)} as const;\nexport type IconId = keyof typeof ICONS;`,
);
write("src/art/corner.ts", `export const CORNER = ${lit(data.CORNER)};`);
write("src/art/child.ts", `export const CHILD = ${lit(data.CHILD)};`);
write(
  "src/art/props.ts",
  `export const PROPS = ${lit(data.PROPS)} as const;\nexport type PropId = keyof typeof PROPS;`,
);
write(
  "src/art/backdrops.ts",
  `export const BACKDROPS = ${lit(data.BACKDROPS)} as const;\nexport type BackdropId = keyof typeof BACKDROPS;`,
);
write(
  "src/art/skins.ts",
  `export const SKINS = ${lit(data.SKINS)} as const;\nexport const COVERS = ${lit(data.COVERS)} as const;\n` +
    `export type CoverId = (typeof COVERS)[number]["id"];`,
);
write(
  "src/data/kinds.ts",
  `import type { Kind } from "@/models/station";\n\nexport const KINDS: Record<Kind, { label: string; explain: string }> = ${lit(data.KINDS)};`,
);

type AnyStation = { id: string; character?: { basis?: string }[] };
const stations = data.STATIONS as AnyStation[];
stations.forEach((s, i) => {
  // Character links are our reflections: mark each as draft for review.
  const body = lit(s).replace(
    /"basis": "reflection"/g,
    `"basis": "reflection",\n "review": draft()`,
  );
  const imports =
    (body.includes("draft()") ? `import { draft } from "@/models/review";\n` : "") +
    `import { defineStation } from "@/models/station";`;
  write(
    `src/data/stations/${pad(i)}-${s.id}.ts`,
    `${imports}\n\nexport default defineStation(${body});`,
  );
});
write(
  "src/data/stations/index.ts",
  stations.map((s, i) => `import s${pad(i)} from "./${pad(i)}-${s.id}";`).join("\n") +
    `\n\nexport const STATIONS = [${stations.map((_, i) => `s${pad(i)}`).join(", ")}];\n` +
    `export type StationId = (typeof STATIONS)[number]["id"];`,
);

type AnyBeat = { title: string };
const story = data.STORY as AnyBeat[];
const beatFiles = story.map((b, i) => `${pad(i + 1)}-${slug(b.title)}`);
story.forEach((b, i) => {
  write(
    `src/data/story/${beatFiles[i]}.ts`,
    `import { defineBeat } from "@/models/story";\n\nexport default defineBeat(${lit(b)});`,
  );
});
write(
  "src/data/story/index.ts",
  beatFiles.map((f, i) => `import b${pad(i + 1)} from "./${f}";`).join("\n") +
    `\n\nexport const STORY = [${beatFiles.map((_, i) => `b${pad(i + 1)}`).join(", ")}];`,
);
write(
  "src/data/story/parts.ts",
  `import type { Part, PartNo } from "@/models/story";\n\nexport const PARTS: Record<PartNo, Part> = ${lit(data.PARTS)};`,
);
