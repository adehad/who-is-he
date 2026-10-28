import { ICONS } from "@/art/icons";
import { PROPS } from "@/art/props";
import { KINDS } from "@/data/kinds";
import { STATIONS, type StationId } from "@/data/stations";
import { STORY } from "@/data/story";
import type { Kind, Station } from "@/models/station";
import { sourceBlock } from "./cite";
import { $, $as, h, raw, replay } from "./dom";
import { handlers } from "./handlers";

export { setHandlers } from "./handlers";

type Tab = "char" | "sign" | "mirror";
export const state: { i: number; tab: Tab; seen: Set<number> } = {
  i: 0,
  tab: "char",
  seen: new Set([0]),
};

const current = (): Station<string, StationId> => {
  const s = STATIONS[state.i];
  if (!s) throw new Error(`no station ${state.i}`);
  return s;
};

function renderIndex(): void {
  const index = $("index");
  index.replaceChildren(
    ...STATIONS.map((s, i) =>
      h(
        "button",
        {
          class: state.seen.has(i) ? "seen" : "",
          "aria-current": i === state.i ? "step" : null,
        },
        h("span", { class: "dot" }, i === 0 ? "★" : String(i)),
        s.name,
      ),
    ),
  );
  [...index.children].forEach((b, i) => {
    b.addEventListener("click", () => go(i));
  });
  index.children[state.i]?.scrollIntoView({
    block: "nearest",
    inline: "center",
    behavior: "smooth",
  });
}

function renderDots(): void {
  const n = STATIONS.length - 1;
  $as("ring", SVGSVGElement).innerHTML = STATIONS.slice(1)
    .map((_, k) => {
      const a = (2 * Math.PI * k) / n;
      const i = k + 1;
      const cls = i === state.i ? "now" : state.seen.has(i) ? "seen" : "";
      return `<circle class="${cls}" cx="${(50 + 48.4 * Math.sin(a)).toFixed(2)}" cy="${(50 - 48.4 * Math.cos(a)).toFixed(2)}" r="${i === state.i ? 1.7 : 1.2}"/>`;
    })
    .join("");
}

function renderStage(animate: boolean): void {
  const s = current();
  $("icon").innerHTML = ICONS[s.icon];
  $("phrase").textContent = s.phrase;
  $("sname").textContent = s.name;
  $("ktitle").textContent = s.title;
  $("kline").textContent = s.line;
  renderDots();
  if (animate) replay($("stage"));
}

function renderChips(): void {
  const s = current();
  const tabs: { id: Tab; label: string; n: number | null; cls: string }[] = [
    { id: "char", label: "Character", n: s.character.length, cls: "c-char" },
    { id: "sign", label: "Special signs", n: s.signs.length, cls: "c-sign" },
    { id: "mirror", label: "Mirror", n: null, cls: "c-mirror" },
  ];
  const chips = $("chips");
  chips.replaceChildren(
    ...tabs.map((t) => {
      const b = h(
        "button",
        { class: `chip ${t.cls}`, role: "tab", "aria-selected": String(state.tab === t.id) },
        t.label,
        t.n != null ? h("span", { class: "n" }, String(t.n)) : null,
      );
      b.addEventListener("click", () => {
        state.tab = t.id;
        renderChips();
        renderCards();
      });
      return b;
    }),
  );
  chips.hidden = state.i === 0;
}

function renderCards(): void {
  const s = current();
  const box = $("cards");
  if (state.i === 0) {
    box.replaceChildren(
      h(
        "div",
        { class: "card" },
        h("h3", {}, "How it works"),
        h(
          "p",
          {},
          "Each stop starts with how he looked, as his Companions described him. Then tap the buttons to see the good character it reminds us of, the special signs Allah gave him, and a little mirror challenge for you.",
        ),
        h(
          "p",
          { class: "k-explain" },
          "Following the order of Imam al-Tirmidhī’s book al-Shamāʾil al-Muḥammadiyya.",
        ),
      ),
    );
    return;
  }
  let cards: HTMLElement[] = [];
  if (state.tab === "char") {
    cards = s.character.map((c) =>
      h(
        "article",
        { class: "card" },
        h("h3", {}, h("span", { class: "pill k-trait" }, c.trait)),
        h("p", {}, c.line),
        h(
          "div",
          { class: "adult" },
          c.note ? h("p", { class: "note" }, c.note) : null,
          c.ref
            ? sourceBlock(c.ref, [
                h(
                  "span",
                  { class: "badge" },
                  c.basis === "classical" ? "Classical link" : "Our reflection",
                ),
              ])
            : null,
        ),
      ),
    );
    if (!cards.length)
      cards = [
        h(
          "article",
          { class: "card research" },
          h("h3", {}, h("span", { class: "pill k-research" }, KINDS.research.label)),
          h("p", {}, "We are still looking for checked reports that link this to his character."),
        ),
      ];
  } else if (state.tab === "sign") {
    const kinds = Object.keys(KINDS) as Kind[];
    cards = kinds.flatMap((kind) => {
      const group = s.signs.filter((g) => g.kind === kind);
      if (!group.length) return [];
      return [
        h(
          "div",
          { class: "group" },
          h(
            "h3",
            { class: "group-head" },
            h("span", { class: `pill k-${kind}` }, KINDS[kind].label),
          ),
          h("p", { class: "k-explain" }, KINDS[kind].explain),
          ...group.map((g) =>
            h(
              "article",
              { class: `card ${kind === "research" ? "research" : ""}` },
              h("h3", {}, g.title),
              h("p", {}, g.line),
              g.trait
                ? h("p", { class: "k-explain" }, `Reminds us he was ${g.trait.toLowerCase()}.`)
                : null,
              g.ref
                ? h(
                    "div",
                    { class: "adult" },
                    g.note ? h("p", { class: "note" }, g.note) : null,
                    sourceBlock(g.ref, [h("span", { class: "badge" }, "Category: ours")]),
                  )
                : null,
            ),
          ),
        ),
      ];
    });
  } else {
    // Story beats that link here (and have a prompt) replace the station's own mirror line.
    cards = STORY.map((b, k) => [b, k + 1] as const)
      .filter(([b]) => b.prompt && (b.stations ?? []).includes(s.id))
      .map(([b, k]) => {
        const btn = h(
          "button",
          { type: "button", class: "go-link" },
          raw("span", { class: "mini", "aria-hidden": "true" }, b.prop ? PROPS[b.prop] : ""),
          "See it in the story →",
        );
        btn.addEventListener("click", () => handlers.openStory(k));
        return h(
          "article",
          { class: "card mirror" },
          h("h3", {}, h("span", { class: "pill k-khasisa" }, "Mirror"), b.title),
          h("p", {}, [b.prompt ?? []].flat()[0]),
          btn,
        );
      });
    if (!cards.length)
      cards = [
        h(
          "article",
          { class: "card mirror" },
          h("h3", {}, h("span", { class: "pill k-khasisa" }, "Mirror"), "Your turn"),
          h("p", {}, s.mirror),
        ),
      ];
  }
  box.replaceChildren(...cards);
}

function renderAdult(): void {
  const s = current();
  $("adult").replaceChildren(
    h(
      "div",
      { class: "banner" },
      "Draft. Awaiting scholarly review. Links to character are our own reflections unless marked “Classical link”, and sign categories are ours unless a source states one.",
    ),
    h("h2", {}, "What the Companions described"),
    ...s.physical.map((p) =>
      h(
        "article",
        { class: "card quote" },
        h("p", { lang: "ar" }, p.phrase),
        p.gloss ? h("p", {}, p.gloss) : null,
        p.note ? h("p", { class: "note" }, p.note) : null,
        sourceBlock(p.ref),
      ),
    ),
    h(
      "p",
      { class: "k-explain" },
      "Numbers, links and grades are sunnah.com’s, matched to our copy of each text. Some detailed descriptions in the Shamāʾil have a weak (ḍaʿīf) chain. Many scholars accept such reports for describing his appearance and manners, while others are stricter, so the grade is shown for grown-ups to weigh.",
    ),
  );
}

export function render(animate = false): void {
  renderIndex();
  renderStage(animate);
  renderChips();
  renderCards();
  renderAdult();
  const next = $as("next", HTMLButtonElement);
  $as("back", HTMLButtonElement).disabled = state.i === 0;
  next.disabled = state.i === STATIONS.length - 1;
  next.textContent = state.i === 0 ? "Begin" : "Next";
  $("count").textContent = state.i === 0 ? "Start" : `${state.i} of ${STATIONS.length - 1}`;
}

export function go(i: number): void {
  if (i < 0 || i >= STATIONS.length || i === state.i) return;
  state.i = i;
  state.seen.add(i);
  state.tab = "char";
  render(true);
}
