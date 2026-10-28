import { STATIONS } from "@/data/stations";

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
}

/** Absolute URL for og tags: SITE_URL (astro `site`, always set by astro.config.mjs) + path within the site. */
export const absolute = (site: URL | undefined, path: string): string => {
  if (!site) throw new Error("astro `site` is not set: og URLs must be absolute");
  return `${site.href.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

const firstTrait = (i: number) => STATIONS[i]?.character[0]?.trait;

export function stationMeta(i: number): PageMeta {
  const s = STATIONS[i];
  if (!s) throw new Error(`no station ${i}`);
  const trait = firstTrait(i);
  return {
    title: i === 0 ? "Little Hilya" : `${s.name} · Little Hilya`,
    description:
      i === 0
        ? "A child-friendly walk through the Shamāʾil of the Prophet ﷺ, head to toe."
        : `${s.title}.${trait ? ` ${trait}.` : ""} ${s.line}`,
    path: i === 0 ? "" : `learn/${s.id}/`,
    image: `og/${s.id}.png`,
    imageAlt: `${s.name}: ${s.phrase}, ${s.title}`,
  };
}

export const storyMeta = (): PageMeta => ({
  ...stationMeta(0),
  title: "A Day with the Hilya · Little Hilya",
  path: "story/",
  description:
    "A day in the life of a child, reminded at every step of how the Companions described the Prophet ﷺ.",
});
