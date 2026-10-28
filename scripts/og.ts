// Local only: build, serve dist, screenshot /share/<id>/ in Edge, write public/og/*.png + manifest.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { preview } from "astro";
import { type Browser, chromium } from "playwright-core";
import { STATIONS } from "@/data/stations";
import { ogHashes } from "./og-hash";

const PORT = 4329;
const ORIGIN = `http://localhost:${PORT}`;

const run = (cmd: string, args: string[]) =>
  new Promise<void>((ok, fail) =>
    spawn(cmd, args, { stdio: "inherit", shell: true }).on("exit", (c) =>
      c === 0 ? ok() : fail(new Error(`${cmd} exited ${c}`)),
    ),
  );

async function captureShareCards(browser: Browser): Promise<void> {
  mkdirSync("public/og", { recursive: true });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  for (const s of STATIONS) {
    await page.goto(`${ORIGIN}/share/${s.id}/`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready.then(() => true));
    await page.screenshot({ path: `public/og/${s.id}.png` });
    console.log("og", s.id);
  }
  await page.close();
  writeFileSync("public/og/manifest.json", `${JSON.stringify(ogHashes(), null, 2)}\n`);
}

await run("bun", ["run", "build"]);
const server = await preview({ server: { port: PORT } });
const browser = await chromium.launch({ channel: "msedge" });
try {
  await captureShareCards(browser);
} finally {
  await browser.close();
  await server.stop();
}
