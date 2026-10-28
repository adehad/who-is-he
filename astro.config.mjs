import { defineConfig } from "astro/config";

// BASE_PATH: where the site is served (Pages: /who-is-he, Cloudflare previews: unset -> /).
// SITE_URL: absolute origin+path used only for og/canonical URLs.
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  site: (process.env.SITE_URL || "https://adehad.github.io/who-is-he").replace(/\/$/, ""),
  base,
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
});
