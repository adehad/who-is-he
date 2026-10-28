import { CORNER } from "@/art/corner";
import { STATIONS, type StationId } from "@/data/stations";
import { $, $as, replay } from "./dom";
import { setHandlers } from "./handlers";
import { go, render, state } from "./learn";
import { applyChild, renderStory, story, storyGo } from "./story";

type Mode = "learn" | "story";
const isMode = (m: string | null | undefined): m is Mode => m === "learn" || m === "story";

const app = $("app");
let mode: Mode = isMode(app.dataset.mode) ? app.dataset.mode : "learn";
if (app.dataset.honourStoredMode === "1") {
  try {
    if (localStorage.getItem("mode") === "story") mode = "story";
  } catch {}
}
const station = Number(app.dataset.station ?? 0);
if (Number.isInteger(station) && station > 0 && station < STATIONS.length) {
  state.i = station;
  state.seen.add(station);
}

function openStory(k: number): void {
  story.i = k;
  story.seen.add(k);
  setMode("story");
}

function openStation(id: StationId): void {
  const i = STATIONS.findIndex((s) => s.id === id);
  if (i < 0) return;
  state.i = i;
  state.seen.add(i);
  state.tab = "char";
  setMode("learn");
}

setHandlers({ openStation, openStory });

const modeButtons = () => document.querySelectorAll<HTMLButtonElement>("#modes button");

function setMode(m: Mode, animate = true): void {
  mode = m;
  for (const id of ["learn", "story"] as const) $(id).hidden = id !== m;
  for (const b of modeButtons()) b.setAttribute("aria-pressed", String(b.dataset.mode === m));
  try {
    localStorage.setItem("mode", m);
  } catch {}
  if (m === "learn") render(animate);
  else renderStory(animate);
  if (animate) {
    replay($(m));
    window.scrollTo(0, 0);
  }
}

/* ---- Wiring ---- */

const step = (d: number) => (mode === "story" ? storyGo(story.i + d) : go(state.i + d));
$("back").addEventListener("click", () => go(state.i - 1));
$("next").addEventListener("click", () => go(state.i + 1));
$("sback").addEventListener("click", () => storyGo(story.i - 1));
$("snext").addEventListener("click", () => storyGo(story.i + 1));
for (const b of modeButtons())
  b.addEventListener("click", () => {
    const m = b.dataset.mode;
    if (isMode(m) && m !== mode) setMode(m);
  });
document.addEventListener("keydown", (e) => {
  if (e.target instanceof Element && e.target.closest("input, summary")) return;
  if (e.key === "ArrowRight") step(1);
  if (e.key === "ArrowLeft") step(-1);
});
let x0: number | null = null;
for (const id of ["stage", "sstage"]) {
  $(id).addEventListener("pointerdown", (e) => {
    x0 = e.clientX;
  });
  $(id).addEventListener("pointerup", (e) => {
    if (x0 == null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });
}

const grown = $as("grown", HTMLInputElement);
try {
  grown.checked = localStorage.getItem("grown") === "1";
} catch {}
const applyGrown = () => {
  app.classList.toggle("grown", grown.checked);
  try {
    localStorage.setItem("grown", grown.checked ? "1" : "0");
  } catch {}
};
grown.addEventListener("change", applyGrown);
applyGrown();
for (const c of document.querySelectorAll(".corner")) c.innerHTML = CORNER;
applyChild();
setMode(mode, false);
