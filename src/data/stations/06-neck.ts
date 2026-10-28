import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "neck",
  name: "His neck",
  icon: "vase",
  phrase: "كَأَنَّ عُنُقَهُ جِيدُ دُمْيَةٍ، فِي صَفَاءِ الْفِضَّةِ",
  title: "Like pure silver",
  line: "Hind said his neck was beautifully shaped and shone like pure silver. When he turned to look at someone, he turned all the way round.",
  physical: [
    {
      ref: "shamail:7",
      phrase: "كَأَنَّ عُنُقَهُ جِيدُ دُمْيَةٍ، فِي صَفَاءِ الْفِضَّةِ",
      gloss: "It was as if his neck were the neck of a statue shaped in pure silver.",
    },
    {
      ref: "shamail:11",
      phrase: "أَبْيَضَ كَأَنَّمَا صِيغَ مِنْ فِضَّةٍ",
      gloss: "He was white, as if he were fashioned from silver.",
    },
    {
      ref: "shamail:6",
      phrase: "وَإِذَا الْتَفَتَ الْتَفَتَ مَعًا",
      gloss: "When he looked around, he looked around altogether.",
    },
  ],
  character: [
    {
      trait: "Attentive",
      line: "When he turned to someone, he turned all the way round to face them.",
      ref: "shamail:7",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [],
  mirror:
    "Turn all the way round to face the mirror. Who will you turn to and really listen to today?",
});
