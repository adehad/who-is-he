import type { APIRoute } from "astro";

// Web app manifest. Colours match --bg in global.css; screenshots enable the rich install UI.
const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
const icon = (src: string, sizes: string, purpose?: string) => ({
  src: `${base}icons/${src}`,
  sizes,
  type: "image/png",
  ...(purpose ? { purpose } : {}),
});
const shot = (src: string, sizes: string, form_factor: "narrow" | "wide", label: string) => ({
  src: `${base}screenshots/${src}`,
  sizes,
  type: "image/png",
  form_factor,
  label,
});

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      id: base,
      name: "Little Hilya",
      short_name: "Hilya",
      description: "A child-friendly walk through the Shamāʾil of the Prophet ﷺ, head to toe.",
      lang: "en",
      dir: "ltr",
      start_url: base,
      scope: base,
      display: "standalone",
      background_color: "#e6f0ea",
      theme_color: "#e6f0ea",
      icons: [
        icon("pwa-64x64.png", "64x64"),
        icon("pwa-192x192.png", "192x192"),
        icon("pwa-512x512.png", "512x512"),
        icon("maskable-icon-512x512.png", "512x512", "maskable"),
      ],
      screenshots: [
        shot("learn-narrow.png", "780x1688", "narrow", "Learn: a station of the Hilya"),
        shot("story-narrow.png", "780x1688", "narrow", "Story: a day with the Hilya"),
        shot("learn-wide.png", "2560x1600", "wide", "Learn on a larger screen"),
        shot("story-wide.png", "2560x1600", "wide", "Story on a larger screen"),
      ],
    }),
    { headers: { "Content-Type": "application/manifest+json" } },
  );
