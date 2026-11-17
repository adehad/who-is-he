import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "neck",
  name: "His neck",
  icon: "vase",
  phrase: "كَأَنَّ عُنُقَهُ جِيدُ دُمْيَةٍ، فِي صَفَاءِ الْفِضَّةِ",
  title: "Like pure silver",
  line: "Umm Ma‘bad saw his neck rise tall and graceful, and Hind said it shone like pure silver. He turned all the way round to look at someone.",
  physical: [
    {
      ref: "shamail:8",
      phrase: "كَأَنَّ عُنُقَهُ جِيدُ دُمْيَةٍ، فِي صَفَاءِ الْفِضَّةِ",
      gloss:
        "It was as if his neck were the neck of a finely carved figure, in the clearness of silver.",
      note: "Jīd is the neck, and a dumya is a figure made with great care to be as beautiful as it can be (al-Nihāya). Al-Haytamī: the likeness is of shape, and “in the clearness of silver” adds the colour. Al-Qārī: its length was perfectly balanced. It describes form and colour, not a picture to be drawn. How to word دُمْيَة for children is for a scholar to settle.",
    },
    {
      ref: "bayhaqi-dalail:1/285",
      phrase: "كَأَنَّ عُنُقَهُ جِيدُ دُمْيَةٍ فِي صَفَاءِ الْفِضَّةِ",
      gloss:
        "It was as if his neck were the neck of a finely carved figure, in the clearness of silver.",
      note: "Hind’s description again. Al-Bayhaqī gives it through two chains: Jumayʿ’s, as in the Shamāʾil, and one through ʿAlī’s descendants (Jaʿfar al-Ṣādiq from his fathers) that avoids Jumayʿ and the unnamed man in Mecca. No grade is printed; how far the second chain strengthens the report is for a scholar to judge.",
    },
    {
      ref: "hakim:4274",
      phrase: "وَفِي عُنُقِهِ سَطَعٌ",
      gloss: "And there was a tall rise to his neck.",
      note: "Umm Maʿbad, who saw him on the Hijra without knowing who he was. Al-Bayhaqī glosses سَطَع as length, and Lisān al-ʿArab as a long neck; Ibn Fāris gives the root as a thing being long and rising up into the air, the word also used for dawn light spreading up the sky.",
    },
    {
      ref: "ibnsad:1/410-2",
      phrase: "كَأَنَّ عُنُقَهُ إِبْرِيقُ فِضَّةٍ",
      gloss: "It was as if his neck were a silver ewer.",
      note: "ʿAlī’s description, through an unnamed man of the Anṣār. The same report ends the walk with «إِذَا الْتَفَتَ الْتَفَتَ جَمِيعًا», “when he turned, he turned altogether”.",
    },
    {
      ref: "shamail:12",
      phrase: "أَبْيَضَ كَأَنَّمَا صِيغَ مِنْ فِضَّةٍ",
      gloss: "He was white, as if he were fashioned from silver.",
    },
    {
      ref: "shamail:7",
      phrase: "وَإِذَا الْتَفَتَ الْتَفَتَ مَعًا",
      gloss: "When he looked around, he looked around altogether.",
      note: "Ibn al-Athīr (al-Nihāya): he did not steal sideways glances, or did not twist his neck right and left as a hasty person does, but faced fully and turned away fully.",
    },
  ],
  character: [
    {
      trait: "Attentive",
      line: "Abū Hurayra said that when he turned to face someone, he turned to them with his whole self.",
      ref: "adab:255",
      basis: "classical",
      note: "Al-Qārī: he turned his whole self to whoever came to him to show he cared about them, and turned away only once their need was met; turning by twisting the neck alone is what the proud do.",
      review: draft("al-Adab al-Mufrad has no grade in our source; check al-Albānī’s grading."),
    },
    {
      trait: "Forgiving",
      line: "A man pulled his cloak so hard that it left a mark on his neck, and asked to be given something. He turned to the man, laughed, and had a gift given to him.",
      ref: "bukhari:6088",
      basis: "classical",
      note: "Al-Haytamī draws from this his great forgiveness, his patience when he himself was hurt, and his kindness to rough-mannered people.",
      review: draft(),
    },
    {
      trait: "Loving",
      line: "He carried his little grandson al-Ḥasan on his shoulder and said: “O Allah, I love him, so love him.”",
      ref: "muslim:2422a",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Gentle",
      line: "He came out to pray carrying his little granddaughter Umāma on his neck. When he bowed he put her down, and when he stood up he picked her up again.",
      ref: "darimi:1399",
      basis: "reflection",
      note: "Al-Dārimī’s wording has “on his neck, or his shoulder”; al-Bukhārī and Muslim have the same report.",
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
  signs: [
    {
      kind: "khasisa",
      title: "Weighty words",
      line: "When Allah’s words came down to him while he was riding, his camel lowered her neck to the ground and could not move, because the revelation was so weighty.",
      ref: "hakim:3865",
      note: "ʿĀʾisha then recited 73:5, “We shall send down on you a weighty word.” Jirān, the word for what the camel laid down, is the underside of the neck (al-Nihāya).",
    },
    {
      kind: "khasisa",
      title: "Protected",
      line: "Abū Jahl threatened to tread on his neck if he saw him praying at the Ka‘ba. The Prophet said that if he had tried, the angels would have seized him.",
      ref: "bukhari:4958",
      grownUp: true,
    },
  ],
  mirror:
    "Turn all the way round to face the mirror. Who will you turn to and really listen to today?",
});
