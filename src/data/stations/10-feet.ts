import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "feet",
  name: "His feet and walk",
  icon: "stream",
  phrase: "كَأَنَّمَا يَنْحَطُّ مِنْ صَبَبٍ",
  title: "Walking as if downhill",
  line: "His feet were so smooth that water ran off them. He walked quickly and firmly, as if going down a slope, and his Companions had to hurry to keep up!",
  physical: [
    {
      ref: "shamail:7",
      phrase: "خَمْصَانُ الأَخْمَصَيْنِ، مَسِيحُ الْقَدَمَيْنِ، يَنْبُو عَنْهُمَا الْمَاءُ",
      gloss:
        "The hollows of his soles were deep-set. His feet were so smooth that water bounced off them.",
    },
    {
      ref: "shamail:7",
      phrase: "إِذَا مَشَى كَأَنَّمَا يَنْحَطُّ مِنْ صَبَبٍ",
      gloss: "When he walked, it was as if he were descending a declivity.",
    },
    {
      ref: "shamail:7",
      phrase: "يَخْطُو تَكَفِّيًا، وَيَمْشِي هَوْنًا",
      gloss: "He would tread inclining forward and walk comfortably.",
      note: "هَوْنًا is usually understood as “gently, with calm dignity” (compare Qur’an 25:63); “comfortably” undersells it.",
    },
    {
      ref: "shamail:119",
      phrase: "كَأَنَّمَا الأَرْضُ تُطْوَى لَهُ",
      gloss:
        "The earth seemed to be folded up for him. We must strenuously exert ourselves, while he is not subject to any stress.",
    },
  ],
  character: [
    {
      trait: "Grateful",
      line: "He prayed at night until his feet swelled. When asked why, he said: “Shall I not be a thankful servant?”",
      ref: "shamail:252",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Humble",
      line: "He let his Companions walk ahead of him, and he was the first to say salām to anyone he met.",
      ref: "shamail:7",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "mujiza",
      title: "“Be firm, Uḥud!”",
      line: "When the mountain of Uḥud shook beneath him and his Companions, he struck it with his foot and said: “Be firm, Uḥud!”",
      ref: "bukhari:3528",
    },
  ],
  mirror:
    "Look down at your feet. Where will they take you to do good today, and who will you greet first?",
});
