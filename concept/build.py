"""Inline data/texts.json into little-hilya.src.html -> little-hilya.html.

Applies the "clear" entries of data/corrections.json on top of the raw texts.
Each corrected text gets `corrected: [{original, replacement, reason}]`.
Fails if a correction's `find` string is not in its text exactly once.
"""
import json
import sys
from pathlib import Path

here = Path(__file__).parent
texts = json.loads((here / "data/texts.json").read_text(encoding="utf-8"))
corrections = json.loads((here / "data/corrections.json").read_text(encoding="utf-8"))

errors, applied, skipped = [], 0, 0
for c in corrections:
    if c["field"] not in ("en", "narrator") or c["confidence"] not in ("clear", "scholar-check"):
        errors.append(f'{c["ref"]}: bad field/confidence')
        continue
    t = texts.get(c["ref"])
    if t is None:
        skipped += 1  # not used on the page; extract_texts.py checks it against the dataset
        continue
    n = t[c["field"]].count(c["find"])
    if n != 1:
        errors.append(f'{c["ref"]} {c["field"]}: find occurs {n} times: {c["find"]!r}')
        continue
    if c["confidence"] != "clear":
        continue
    if not c["replace"]:
        errors.append(f'{c["ref"]}: clear correction needs a replace')
        continue
    t[c["field"]] = t[c["field"]].replace(c["find"], c["replace"])
    t.setdefault("corrected", []).append({"original": c["find"], "replacement": c["replace"], "reason": c["reason"]})
    applied += 1
if errors:
    sys.exit("corrections failed:\n  " + "\n  ".join(errors))

sunnah = json.loads((here / "data/sunnah_refs.json").read_text(encoding="utf-8"))
for ref, t in texts.items():
    m = sunnah.get(ref)
    if m:
        t["sunnah"] = {"ref": m["sunnah_ref"], "in_book": m["in_book"], "grade": m["grade"]}
unmatched = sorted(r for r in texts if r not in sunnah)

src = (here / "little-hilya.src.html").read_text(encoding="utf-8")
blob = json.dumps(texts, ensure_ascii=False).replace("</", r"<\/")
assert src.count("/*TEXTS*/null") == 1
(here / "little-hilya.html").write_text(src.replace("/*TEXTS*/null", blob), encoding="utf-8")
print("ok", len(blob), f"corrections applied {applied}, refs not on page {skipped}, no sunnah.com match {unmatched}")
