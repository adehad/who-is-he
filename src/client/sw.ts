// Service worker registration, production builds only (under `astro dev` it would cache dev assets).
let updated = false;

/**
 * True once a newer service worker has taken over a page it already controlled. Precached HTML is
 * served cache-first, so this page's markup may be from the old deploy: the router then loads the
 * next route as a full page instead of pushState, and the visitor gets the new site.
 */
export const swUpdated = (): boolean => updated;

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  const sw = navigator.serviceWorker;
  // A first install also fires controllerchange (clientsClaim): only a replacement is an update.
  let controlled = sw.controller !== null;
  sw.addEventListener("controllerchange", () => {
    if (controlled) updated = true;
    controlled = true;
  });
  addEventListener("load", () => {
    void sw.register(`${import.meta.env.BASE_URL.replace(/\/?$/, "/")}sw.js`);
  });
}
