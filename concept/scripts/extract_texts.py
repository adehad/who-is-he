"""Regenerate concept/data/texts.json from the hadith-json dataset.

Collects every `book:number` ref used by the stations in little-hilya.src.html
and data/stations.draft.json, looks each up in the dataset files and writes
{ref: {ar, narrator, en, ch, ch_en, ch_ar}}. Also checks that every Arabic
`phrase` in the draft stations occurs verbatim in its hadith, and that every
`find` in data/corrections.json occurs in the raw dataset text. texts.json stays
the raw dataset copy; build.py applies the corrections.

Usage: python -I concept/scripts/extract_texts.py DATASET_DIR [DATASET_DIR ...]

Each DATASET_DIR holds files from github.com/AhmedBaset/hadith-json
(db/by_book/...), named <book>.json, e.g. shamail.json, bukhari.json,
muslim.json, tirmidhi.json, abudawud.json. Numbers are the dataset's
idInBook, which only match sunnah.com for the Shamail.
"""
import json
import re
import sys
from pathlib import Path

CONCEPT = Path(__file__).resolve().parent.parent
SRC = CONCEPT / "little-hilya.src.html"
DRAFT = CONCEPT / "data" / "stations.draft.json"
OUT = CONCEPT / "data" / "texts.json"
CORRECTIONS = CONCEPT / "data" / "corrections.json"
BOOK_ORDER = ["shamail", "bukhari", "muslim", "tirmidhi", "abudawud"]
SAW = "صلى الله عليه وسلم"


def refs_in_src():
    return set(re.findall(r'ref:\s*"([a-z]+:\d+)"', SRC.read_text(encoding="utf-8")))


def walk(node):
    if isinstance(node, dict):
        yield node
        for v in node.values():
            yield from walk(v)
    elif isinstance(node, list):
        for v in node:
            yield from walk(v)


def lookup(dirs, refs):
    wanted = {}
    for ref in refs:
        book, n = ref.split(":")
        wanted.setdefault(book, set()).add(int(n))

    out, missing = {}, []
    for book in sorted(wanted, key=lambda b: (BOOK_ORDER.index(b) if b in BOOK_ORDER else 99, b)):
        path = next((Path(d) / f"{book}.json" for d in dirs if (Path(d) / f"{book}.json").is_file()), None)
        if path is None:
            missing += [f"{book}:{n}" for n in sorted(wanted[book])]
            continue
        data = json.loads(path.read_text(encoding="utf-8"))
        chapters = {c["id"]: c for c in data["chapters"]}
        found = {h["idInBook"]: h for h in data["hadiths"] if h["idInBook"] in wanted[book]}
        for n in sorted(wanted[book]):
            h = found.get(n)
            if h is None:
                missing.append(f"{book}:{n}")
                continue
            c = chapters[h["chapterId"]]
            out[f"{book}:{n}"] = {
                "ar": h["arabic"].strip(),
                "narrator": (h["english"].get("narrator") or "").strip(),
                "en": (h["english"].get("text") or "").strip(),
                "ch": h["chapterId"],
                "ch_en": c["english"],
                "ch_ar": c["arabic"].lstrip("-"),
            }
    if missing:
        sys.exit(f"missing refs: {', '.join(missing)}")
    return out


def main(dirs):
    stations = json.loads(DRAFT.read_text(encoding="utf-8"))
    refs = refs_in_src() | {n["ref"] for n in walk(stations) if "ref" in n}
    out = lookup(dirs, refs)

    # Every correction's `find` must be in the raw dataset text, including refs not on the page.
    corrections = json.loads(CORRECTIONS.read_text(encoding="utf-8"))
    raw = lookup(dirs, {c["ref"] for c in corrections})
    stale = [f'{c["ref"]} {c["field"]}: {c["find"]}' for c in corrections if c["find"] not in raw[c["ref"]][c["field"]]]
    if stale:
        sys.exit("corrections not found in dataset:\n  " + "\n  ".join(stale))

    bad = []
    for node in walk(stations):
        if "ref" in node and "phrase" in node:
            if node["phrase"].replace("ﷺ", SAW) not in out[node["ref"]]["ar"]:
                bad.append(f'{node["ref"]}: {node["phrase"]}')
    if bad:
        sys.exit("phrases not found verbatim:\n  " + "\n  ".join(bad))

    OUT.write_text(json.dumps(out, ensure_ascii=False), encoding="utf-8")
    print(f"wrote {len(out)} texts to {OUT.relative_to(CONCEPT.parent)}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1:])
