// Source checks (always) and built-site checks (--dist). Exit 1 with a list of problems.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import rawTexts from "#data/texts.json";
import { STATIONS } from "@/data/stations";
import { STORY } from "@/data/story";
import { ogHashes } from "./og-hash";

const problems: string[] = [];
const fail = (m: string) => problems.push(m);
const withDist = process.argv.includes("--dist");

// Station files: NN prefix order matches STATIONS order, ids unique.
function checkStationOrder() {
  const files = readdirSync("src/data/stations")
    .filter((f) => /^\d\d-/.test(f))
    .sort();
  files.forEach((f, i) => {
    if (f !== `${String(i).padStart(2, "0")}-${STATIONS[i]?.id}.ts`)
      fail(`station file order: ${f}`);
  });
  if (new Set(STATIONS.map((s) => s.id)).size !== STATIONS.length) fail("duplicate station ids");
}

// Every held text is shown somewhere.
const used = new Set<string>([
  ...STATIONS.flatMap((s) =>
    [...s.physical, ...s.character, ...s.signs].flatMap((x) => (x.ref ? [x.ref] : [])),
  ),
  ...STORY.flatMap((b) => b.refs ?? []),
]);
const INTENTIONALLY_UNUSED = new Set<string>([]); // add refs here with a comment saying why
function checkTextsShown() {
  for (const ref of Object.keys(rawTexts))
    if (!used.has(ref) && !INTENTIONALLY_UNUSED.has(ref)) fail(`text not shown: ${ref}`);
}

// og images up to date.
function checkOgFresh() {
  const manifest: Record<string, string> = existsSync("public/og/manifest.json")
    ? JSON.parse(readFileSync("public/og/manifest.json", "utf8"))
    : {};
  for (const [id, h] of Object.entries(ogHashes())) {
    if (manifest[id] !== h) fail(`og/${id}.png is stale: run \`bun run og\``);
    if (!existsSync(`public/og/${id}.png`)) fail(`og/${id}.png missing`);
  }
}

// Built pages carry og meta, noindex, the draft strip and a real absolute og:image.
function checkDistPages() {
  const pages = [
    "index.html",
    "story/index.html",
    ...STATIONS.slice(1).map((s) => `learn/${s.id}/index.html`),
  ];
  for (const p of pages) {
    const f = `dist/${p}`;
    if (!existsSync(f)) {
      fail(`missing ${f}`);
      continue;
    }
    const html = readFileSync(f, "utf8");
    for (const needle of [
      'property="og:title"',
      'property="og:description"',
      'name="robots" content="noindex"',
      "data-draft-strip",
    ])
      if (!html.includes(needle)) fail(`${p}: no ${needle}`);
    const img = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    if (!img?.startsWith("https://")) fail(`${p}: og:image not absolute: ${img}`);
    else if (!existsSync(`dist/og/${img.split("/og/")[1]}`))
      fail(`${p}: og:image file missing: ${img}`);
  }
}

checkStationOrder();
checkTextsShown();
checkOgFresh();
if (withDist) checkDistPages();

if (problems.length) {
  console.error(problems.map((p) => `- ${p}`).join("\n"));
  process.exit(1);
}
console.log(
  `ok: ${STATIONS.length} stations, ${STORY.length} beats, ${used.size} refs shown${withDist ? ", dist checked" : ""}`,
);
