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
