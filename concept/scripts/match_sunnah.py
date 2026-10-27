"""Map dataset refs (hadith-json numbering) to real sunnah.com references.

Matches by normalised Arabic text against pages read from sunnah.com.

Usage: python -I match_sunnah.py <dataset_dir> <sunnah_json> [<sunnah_json> ...]
Writes concept/data/sunnah_refs.json and prints a summary.
"""
import json
import re
import sys
from pathlib import Path

here = Path(__file__).resolve().parent.parent
DIACRITICS = re.compile(r"[ؐ-ًؚ-ٰٟۖ-ۭـ‏‎]")
NON_LETTER = re.compile(r"[^ء-ي ]+")
FOLD = str.maketrans({"أ": "ا", "إ": "ا", "آ": "ا", "ٱ": "ا", "ى": "ي", "ة": "ه", "ؤ": "و", "ئ": "ي"})
DATASET_FILES = {"shamail": "shamail.json", "bukhari": "bukhari.json", "muslim": "muslim.json",
                 "tirmidhi": "tirmidhi.json", "abudawud": "abudawud.json"}


def norm(ar):
    ar = DIACRITICS.sub("", ar or "").translate(FOLD)
    return NON_LETTER.sub(" ", ar).split()


def score(a, b):
    sa, sb = set(a), set(b)
    if not sa or not sb:
        return 0.0
    return len(sa & sb) / len(sa | sb)


def main():
    dataset_dir = Path(sys.argv[1])
    sunnah = []
    for f in sys.argv[2:]:
        sunnah += json.loads(Path(f).read_text(encoding="utf-8"))
    by_col = {}
    for row in sunnah:
        if not row.get("ref"):
            continue
        col = row["ref"].strip("/").split(":")[0]
        row["tokens"] = norm(row["ar"])
        by_col.setdefault(col, []).append(row)

    texts = json.loads((here / "data/texts.json").read_text(encoding="utf-8"))
    corrections = json.loads((here / "data/corrections.json").read_text(encoding="utf-8"))
    wanted = set(texts) | {c["ref"] for c in corrections}

    datasets = {}
    out, weak = {}, []
    for ref in sorted(wanted):
        col, n = ref.split(":")
        if col not in by_col:
            continue
        if col not in datasets:
            files = [p for d in [dataset_dir, *dataset_dir.parent.glob("dl*")] for p in [d / DATASET_FILES[col]] if p.exists()]
            datasets[col] = {h["idInBook"]: h for h in json.loads(files[0].read_text(encoding="utf-8"))["hadiths"]}
        h = datasets[col].get(int(n))
        if h is None:
            continue
        toks = norm(h["arabic"])
        best = max(by_col[col], key=lambda r: score(toks, r["tokens"]))
        s = score(toks, best["tokens"])
        inbook = next((r for r in best["refs"] if r.startswith("In-book")), None)
        out[ref] = {"sunnah_ref": best["ref"].strip("/"), "url": "https://sunnah.com" + best["ref"],
                    "in_book": inbook.split(":", 1)[1].strip() if inbook else None,
                    "grade": best["grade"], "score": round(s, 3), "en_sunnah": best["en"],
                    "narrator_sunnah": best.get("narrator")}
        if s < 0.6:
            weak.append((ref, best["ref"], round(s, 3)))

    (here / "data/sunnah_refs.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
    moved = [(k, v["sunnah_ref"]) for k, v in out.items() if k != v["sunnah_ref"]]
    print(f"matched {len(out)}; numbers differ for {len(moved)}; weak matches {len(weak)}")
    for w in weak:
        print("  weak:", *w)
    for c in corrections:
        m = out.get(c["ref"])
        if m and m["en_sunnah"]:
            present = c["find"] in m["en_sunnah"] if c["field"] == "en" else None
            print(f"  correction {c['ref']} ({c['confidence']}): error text on sunnah.com: {present}")


if __name__ == "__main__":
    main()
