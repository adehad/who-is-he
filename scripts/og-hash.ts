import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { STATIONS } from "@/data/stations";
import pkg from "../package.json";

// Anything that changes a card's pixels goes into its hash.
const SHARED_FILES = [
  "src/components/ShareCard.astro",
  "src/pages/share/[id].astro",
  "src/styles/global.css",
  "src/styles/fonts.ts",
  "src/art/icons.ts",
];

// Fonts are the only dependencies that change card pixels, so hash their exact versions.
const FONT_VERSIONS = Object.entries(pkg.dependencies)
  .filter(([name]) => name.startsWith("@fontsource/"))
  .map(([name, version]) => `${name}@${version}`)
  .join("\n");

export function ogHashes(): Record<string, string> {
  const shared = [
    ...SHARED_FILES.map((f) => readFileSync(f, "utf8").replace(/\r\n/g, "\n")),
    FONT_VERSIONS,
  ].join("\0");
  return Object.fromEntries(
    STATIONS.map((s) => {
      const card = JSON.stringify({
        id: s.id,
        name: s.name,
        icon: s.icon,
        phrase: s.phrase,
        title: s.title,
        line: s.line,
        trait: s.character[0]?.trait,
      });
      return [s.id, createHash("sha256").update(shared).update(card).digest("hex").slice(0, 16)];
    }),
  );
}
