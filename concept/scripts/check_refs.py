"""Check that every ref in little-hilya.src.html is in data/texts.json.

Also fails if a station's icon is not defined in ICONS, and warns when a quoted
`phrase` does not occur verbatim in its hadith (ﷺ expanded, NFC).

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

if errors:
    sys.exit("check_refs failed:\n  " + "\n  ".join(errors))
print(f"ok: {len(refs)} refs, all in texts.json")
