"""Inline data/texts.json into little-hilya.src.html -> little-hilya.html."""
import json
from pathlib import Path

here = Path(__file__).parent
texts = json.loads((here / "data/texts.json").read_text(encoding="utf-8"))
src = (here / "little-hilya.src.html").read_text(encoding="utf-8")
blob = json.dumps(texts, ensure_ascii=False).replace("</", r"<\/")
assert src.count("/*TEXTS*/null") == 1
(here / "little-hilya.html").write_text(src.replace("/*TEXTS*/null", blob), encoding="utf-8")
print("ok", len(blob))
