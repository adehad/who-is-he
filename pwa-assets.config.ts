import { defineConfig, minimal2023Preset } from "@vite-pwa/assets-generator/config";

// icon.svg is full-bleed parchment with its own 80% safe zone, so no extra padding (the preset's
// default pads with a white border).
const preset = {
  ...minimal2023Preset,
  transparent: { ...minimal2023Preset.transparent, padding: 0 },
  maskable: { ...minimal2023Preset.maskable, padding: 0 },
  apple: { ...minimal2023Preset.apple, padding: 0 },
};

export default defineConfig({ preset, images: ["assets/icon.svg"] });
