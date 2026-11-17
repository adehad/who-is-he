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
      ref: "shamail:8",
      phrase: "كَأَنَّ عُنُقَهُ جِيدُ دُمْيَةٍ، فِي صَفَاءِ الْفِضَّةِ",
      gloss: "It was as if his neck were the neck of a statue shaped in pure silver.",
    },
    {
      ref: "shamail:12",
      phrase: "أَبْيَضَ كَأَنَّمَا صِيغَ مِنْ فِضَّةٍ",
      gloss: "He was white, as if he were fashioned from silver.",
    },
    {
      ref: "shamail:7",
      phrase: "وَإِذَا الْتَفَتَ الْتَفَتَ مَعًا",
      gloss: "When he looked around, he looked around altogether.",
    },
  ],
  character: [
    {
      trait: "Attentive",
      line: "Abū Hurayra said that when he turned to face someone, he turned to them with his whole self.",
      ref: "adab:255",
      basis: "reflection",
      review: draft("al-Adab al-Mufrad has no grade in our source; check al-Albānī’s grading."),
    },
    {
      trait: "Loving",
      line: "He carried his little grandson al-Ḥasan on his shoulder and said: “O Allah, I love him, so love him.”",
      ref: "muslim:2422a",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Brave",
      line: "One night a loud noise scared the people of Madina. He rode out first to see what it was, with his sword hanging from his neck, and came back saying: “Don’t be afraid, don’t be afraid!”",
      ref: "bukhari:2908",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [],
  mirror:
    "Turn all the way round to face the mirror. Who will you turn to and really listen to today?",
});
