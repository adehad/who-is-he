import type { APIRoute } from "astro";
import { TEXTS } from "@/data/texts";
import { toClientTexts } from "@/lib/client-texts";

// Texts resolved at build time (sunnah.com English, corrections, grades), trimmed to what the page shows.
export const GET: APIRoute = () =>
  new Response(JSON.stringify(toClientTexts(TEXTS)), {
    headers: { "Content-Type": "application/json" },
  });
