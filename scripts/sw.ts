// Precache the built site so it works offline. Previews/screenshots are excluded (large, not needed offline).
import { generateSW } from "workbox-build";

const base = (process.env.BASE_PATH || "/").replace(/\/?$/, "/");
const { count, size, warnings } = await generateSW({
  globDirectory: "dist",
  // woff (non-woff2) font duplicates are left out deliberately.
  globPatterns: ["**/*.{html,js,css,json,woff2,svg,ico,png,webmanifest}"],
  // 404.html is only ever served by the host for unknown URLs, never requested by the site itself.
  globIgnores: ["og/**", "screenshots/**", "share/**", "404.html"],
  swDest: "dist/sw.js",
  modifyURLPrefix: { "": base },
  // Astro's hashed assets change name when their content changes, so no revision cache-busting needed.
  dontCacheBustURLsMatching: /\/_astro\//,
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  skipWaiting: true,
  sourcemap: false,
});
for (const w of warnings) console.warn(w);
console.log(`sw: precached ${count} files, ${(size / 1024).toFixed(0)} KiB`);
