"""Check that every ref in little-hilya.src.html is in data/texts.json.

Also fails if a station's icon is not defined in ICONS, and warns when a quoted
`phrase` does not occur verbatim in its hadith (ﷺ expanded, NFC).
For STORY beats it fails on unknown station links, props or backdrops, and warns
about story refs not yet in texts.json.

Usage: python -I concept/scripts/check_refs.py
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

CONCEPT = Path(__file__).resolve().parent.parent
src = (CONCEPT / "little-hilya.src.html").read_text(encoding="utf-8")
texts = json.loads((CONCEPT / "data" / "texts.json").read_text(encoding="utf-8"))
SAW = "صلى الله عليه وسلم"
# NFC so that shadda+fatha and fatha+shadda (same rendering) compare equal.
nfc = lambda s: unicodedata.normalize("NFC", s)

refs = set(re.findall(r'ref:\s*"([a-z]+:\d+)"', src))
errors = [f"missing from texts.json: {r}" for r in sorted(refs - texts.keys())]

warnings = []
for ref, phrase in re.findall(r'ref:\s*"([a-z]+:\d+)",\s*phrase:\s*"([^"]+)"', src):
    if ref in texts and nfc(phrase.replace("ﷺ", SAW)) not in nfc(texts[ref]["ar"]):
        warnings.append(f"phrase not verbatim in {ref}: {phrase}")
if warnings:
    sys.stdout.buffer.write(("warning:\n  " + "\n  ".join(warnings) + "\n").encode("utf-8"))

icons = set(re.findall(r"^  (\w+): `<svg", src, re.M))
errors += [f"icon not in ICONS: {i}" for i in re.findall(r'\bicon:\s*"(\w+)"', src) if i not in icons]

# STORY beats: station links must name a station; props and backdrops must exist.
# Story refs not yet in texts.json are only warned about (the page lists them as unchecked).
def block(name):
    """Source of a top-level `const NAME = [...]` / `{...}`, up to its closing line."""
    start = src.index(f"const {name} = ")
    end = src.index("\n];\n" if src[start:].split("=", 1)[1].lstrip()[0] == "[" else "\n};\n", start)
    return src[start:end]


quoted = lambda s: re.findall(r'"([^"]+)"', s)
station_ids = set(re.findall(r'\bid:\s*"(\w+)"', block("STATIONS")))
story = block("STORY")
story_refs = {r for m in re.findall(r"\brefs:\s*\[([^\]]*)\]", story) for r in quoted(m)}
links = [s for m in re.findall(r"\bstations:\s*\[([^\]]*)\]", story) for s in quoted(m)]
errors += [f"story links unknown station: {s}" for s in links if s not in station_ids]
props = set(re.findall(r"^  (\w+): `<svg", block("PROPS"), re.M))
errors += [f"story prop not in PROPS: {p}" for p in re.findall(r'\bprop:\s*"(\w+)"', story) if p not in props]
backdrops = set(re.findall(r"^  (\w+): \{", block("BACKDROPS"), re.M))
errors += [f"story backdrop not in BACKDROPS: {b}" for b in re.findall(r'\bbackdrop:\s*"(\w+)"', src) if b not in backdrops]
unlinked = sorted(station_ids - set(links) - {"intro"})
missing_story = sorted(story_refs - texts.keys(), key=lambda r: (r.split(":")[0], int(r.split(":")[1])))
if missing_story:
    print("warning: story refs not in texts.json (shown as unchecked):\n  " + ", ".join(missing_story))
if unlinked:
    print("warning: stations with no story beat: " + ", ".join(unlinked))

if errors:
    sys.exit("check_refs failed:\n  " + "\n  ".join(errors))
print(f"ok: {len(refs)} station refs, all in texts.json; {len(story_refs)} story refs, {len(links)} story links")
