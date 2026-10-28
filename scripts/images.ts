// Local only: build, serve dist, then in Edge screenshot /share/<id>/ (public/og/*.png + manifest)
// and the install screenshots used by the web manifest and README (public/screenshots/*.png).
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

// Narrow (phone) and wide (desktop) install screenshots, at 2x.
const FORM_FACTORS = [
  { name: "narrow", width: 390, height: 844 },
  { name: "wide", width: 1280, height: 800 },
] as const;

async function captureScreenshots(browser: Browser): Promise<void> {
  mkdirSync("public/screenshots", { recursive: true });
  for (const ff of FORM_FACTORS) {
    const context = await browser.newContext({
      viewport: { width: ff.width, height: ff.height },
      deviceScaleFactor: 2,
      reducedMotion: "reduce",
      colorScheme: "light",
      serviceWorkers: "block",
    });
    // Deterministic state: grown-up notes off, learn mode, the default child.
    await context.addInitScript(() => {
      localStorage.setItem("grown", "0");
      localStorage.setItem("mode", "learn");
      localStorage.setItem("child", JSON.stringify({ skin: 2, cover: "hijab", name: "" }));
    });
    const page = await context.newPage();
    const settle = async () => {
      await page.evaluate(() => document.fonts.ready.then(() => true));
      await page.waitForTimeout(300);
    };

    await page.goto(`${ORIGIN}/learn/hands/`, { waitUntil: "networkidle" });
    await settle();
    await page.screenshot({ path: `public/screenshots/learn-${ff.name}.png` });

    // The story opens on the child picker; "Start the day" moves to beat 1.
    await page.goto(`${ORIGIN}/story/`, { waitUntil: "networkidle" });
    await page.click("#snext");
    await page.waitForFunction(() =>
      document.getElementById("scount")?.textContent?.startsWith("1 of"),
    );
    await page.evaluate(() => window.scrollTo(0, 0));
    await settle();
    await page.screenshot({ path: `public/screenshots/story-${ff.name}.png` });
    console.log("screenshots", ff.name);
    await context.close();
  }
}

await run("bun", ["run", "build"]);
const server = await preview({ server: { port: PORT } });
const browser = await chromium.launch({ channel: "msedge" });
try {
  await captureShareCards(browser);
  await captureScreenshots(browser);
} finally {
  await browser.close();
  await server.stop();
}
