import { BACKDROPS, type BackdropId } from "@/art/backdrops";
import { CHILD } from "@/art/child";
import { ICONS } from "@/art/icons";
import { PROPS } from "@/art/props";
import { COVERS, type CoverId, SKINS } from "@/art/skins";
import { STATIONS, type StationId } from "@/data/stations";
import { STORY } from "@/data/story";
import { PARTS } from "@/data/story/parts";
import { TEXTS } from "@/data/texts";
import type { Beat } from "@/models/story";
import { sourceBlock } from "./cite";
import { $, $as, corners, h, raw, replay } from "./dom";
import { pathFor } from "./router";

export const story: {
  i: number;
  seen: Set<number>;
  child: { skin: number; cover: CoverId; name: string };
} = { i: 0, seen: new Set([0]), child: { skin: 2, cover: "hijab", name: "" } };
try {
  const c: unknown = JSON.parse(localStorage.getItem("child") ?? "null");
  if (c && typeof c === "object") {
    const { skin, cover, name } = c as Record<string, unknown>;
    if (typeof skin === "number" && SKINS[skin]) story.child.skin = skin;
    const cv = COVERS.find((v) => v.id === cover);
    if (cv) story.child.cover = cv.id;
    if (typeof name === "string") story.child.name = name.slice(0, 20);
  }
} catch {}

const BDS: Record<BackdropId, { back: string; front?: string }> = BACKDROPS;

const stationById = (id: StationId) => {
  const s = STATIONS.find((s) => s.id === id);
  if (!s) throw new Error(`no station ${id}`);
  return s;
};
const shortName = (s: { name: string }) => s.name.replace(/^(His|The) /, "").toLowerCase();
// Replacer fn, so a "$&" etc. in a child's name is inserted literally.
const withName = (str: string) => str.replace("{name}", () => story.child.name.trim() || "you");

export function applyChild(): void {
  const el = $("story");
  const sk = SKINS[story.child.skin];
  if (!sk) throw new Error(`no skin ${story.child.skin}`);
  el.style.setProperty("--skin", sk.skin);
  el.style.setProperty("--feat", sk.feat);
  el.dataset.cover = story.child.cover;
  try {
    localStorage.setItem("child", JSON.stringify(story.child));
  } catch {}
}

function scene(b: Pick<Beat, "part" | "backdrop" | "prop">): HTMLDivElement {
  const part = PARTS[b.part];
  const key = b.backdrop ?? part.backdrop;
  const bd = key ? BDS[key] : undefined;
  const cls = bd
    ? `window bd-${key}`
    : `mirror${part.night ? " night" : ""}${b.prop ? "" : " solo"}`;
  return raw(
    "div",
    { class: `scene ${cls}`, "aria-hidden": "true" },
    (bd?.back ?? "") +
      CHILD +
      (bd?.front ?? "") +
      (b.prop ? `<div class="prop">${PROPS[b.prop]}</div>` : ""),
  );
}

function pickerView(): HTMLElement[] {
  const swatches = SKINS.map((s, k) => {
    const b = h("button", {
      type: "button",
      role: "radio",
      "aria-checked": String(k === story.child.skin),
      "aria-label": `Skin tone ${k + 1}`,
      style: `--sw:${s.skin}`,
    });
    b.addEventListener("click", () => {
      story.child.skin = k;
      applyChild();
      [...(b.parentNode?.children ?? [])].forEach((x, j) => {
        x.setAttribute("aria-checked", String(j === k));
      });
    });
    return b;
  });
  const covers = COVERS.map((c) => {
    const b = h(
      "button",
      { type: "button", "aria-pressed": String(c.id === story.child.cover) },
      c.label,
    );
    b.addEventListener("click", () => {
      story.child.cover = c.id;
      applyChild();
      [...(b.parentNode?.children ?? [])].forEach((x) => {
        x.setAttribute("aria-pressed", String(x === b));
      });
    });
    return b;
  });
  const greet = h("p", { class: "greet" }, withName("Hello, {name}!"));
  const name = h("input", {
    type: "text",
    maxlength: "20",
    autocomplete: "off",
    placeholder: "you",
    value: story.child.name,
  });
  name.addEventListener("input", () => {
    story.child.name = name.value;
    applyChild();
    greet.textContent = withName("Hello, {name}!");
  });
  return [
    h("div", { class: "station-name" }, "Before the day begins"),
    scene({ part: 1 }),
    h("h2", { class: "kid-title" }, "Choose your child"),
    greet,
    h(
      "p",
      { class: "kid-line" },
      "Who is looking in the mirror today? Pick how you look, then follow your day.",
    ),
    h(
      "div",
      { class: "picker" },
      h(
        "fieldset",
        {},
        h("legend", {}, "Skin"),
        h("div", { class: "swatches", role: "radiogroup", "aria-label": "Skin tone" }, swatches),
      ),
      h("fieldset", {}, h("legend", {}, "Head covering"), h("div", { class: "seg" }, covers)),
      h("label", {}, h("span", {}, "Your name"), name),
    ),
  ];
}

function beatView(b: Beat): (HTMLElement | null)[] {
  const prompts = [b.prompt ?? []].flat();
  let links: HTMLElement;
  if (b.recap) {
    const day = [...new Set(STORY.flatMap((x) => x.stations ?? []))].map(stationById);
    links = h(
      "div",
      { class: "recap", role: "group", "aria-label": "Today’s stations" },
      day.map((s, k) => {
        return raw(
          "a",
          {
            href: pathFor({ mode: "learn", station: STATIONS.indexOf(s) }),
            "data-route": true,
            title: s.name,
            "aria-label": `Learn about ${s.name.toLowerCase()}`,
            style: `--k:${k}`,
          },
          ICONS[s.icon],
        );
      }),
    );
  } else {
    links = h(
      "div",
      { class: "links" },
      (b.stations ?? []).map((id) => {
        const s = stationById(id);
        // Real links (new tab works); app.ts intercepts plain clicks on a[data-route] and opens in place.
        return h(
          "a",
          {
            class: "go-link",
            href: pathFor({ mode: "learn", station: STATIONS.indexOf(s) }),
            "data-route": true,
          },
          raw("span", { class: "mini", "aria-hidden": "true" }, ICONS[s.icon]),
          h(
            "span",
            { class: "go-text" },
            "Learn about his ",
            h("span", { class: "saw", lang: "ar" }, "ﷺ"),
            ` ${shortName(s)} →`,
          ),
        );
      }),
    );
  }
  return [
    h("div", { class: "station-name" }, PARTS[b.part].label),
    scene(b),
    b.greet ? h("p", { class: "greet" }, withName(b.greet)) : null,
    h("h2", { class: "kid-title" }, b.title),
    ...b.lines.map((l) => h("p", { class: "kid-line" }, l)),
    prompts.length
      ? h(
          "div",
          { class: "prompt" },
          prompts.length > 1
            ? h(
                "ul",
                {},
                prompts.map((p) => h("li", {}, p)),
              )
            : h("span", {}, prompts[0]),
        )
      : null,
    links,
  ];
}

function renderTrail(): void {
  const kids: HTMLElement[] = [];
  for (let k = 0; k <= STORY.length; k++) {
    if (k > 1 && STORY[k - 1]?.part !== STORY[k - 2]?.part) kids.push(h("span", { class: "gap" }));
    const b = h("button", {
      type: "button",
      class: `${k === 0 ? "start " : ""}${story.seen.has(k) ? "seen" : ""}`,
      "aria-current": k === story.i ? "step" : null,
      "aria-label": k === 0 ? "Choose your child" : `${k}. ${STORY[k - 1]?.title}`,
    });
    b.addEventListener("click", () => storyGo(k));
    kids.push(b);
  }
  $("trail").replaceChildren(...kids);
}

function renderStoryAdult(): void {
  const b = STORY[story.i - 1];
  const banner = h(
    "div",
    { class: "banner" },
    "Draft. Awaiting scholarly review. Only the child is drawn: the Prophet ﷺ is never pictured, only described in his Companions’ words.",
  );
  if (!b) {
    $("sadult").replaceChildren(banner);
    return;
  }
  const refs = b.refs ?? [];
  const have = refs.filter((r) => TEXTS[r]);
  // Guards JSON/type drift: Ref is typed from texts.json, but a stale build could still miss one.
  const missing = refs.filter((r) => !TEXTS[r]);
  $("sadult").replaceChildren(
    ...[
      banner,
      h("h2", {}, "Sources for this moment"),
      b.note ? h("p", { class: "note" }, b.note) : null,
      ...have.map((r) => h("article", { class: "card" }, sourceBlock(r))),
      missing.length
        ? h("p", { class: "k-explain" }, `Not yet in our checked texts: ${missing.join(", ")}.`)
        : null,
      b.recap
        ? h(
            "p",
            { class: "k-explain" },
            "A look back at the day. Each icon opens its station, with its sources.",
          )
        : null,
    ].filter((x) => x !== null),
  );
}

export function renderStory(animate = false): void {
  const b = STORY[story.i - 1];
  const view = story.i === 0 || !b ? pickerView() : beatView(b);
  $("sinner").replaceChildren(...corners(), ...view.filter((x) => x !== null));
  renderTrail();
  renderStoryAdult();
  const next = $as("snext", HTMLButtonElement);
  $as("sback", HTMLButtonElement).disabled = story.i === 0;
  next.disabled = story.i === STORY.length;
  next.textContent = story.i === 0 ? "Start the day" : "Next";
  $("scount").textContent = story.i === 0 ? "Start" : `${story.i} of ${STORY.length}`;
  if (animate) replay($("sstage"));
}

export function storyGo(i: number): void {
  if (i < 0 || i > STORY.length || i === story.i) return;
  story.i = i;
  story.seen.add(i);
  renderStory(true);
}
