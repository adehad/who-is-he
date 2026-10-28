import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "seal",
  name: "The Seal",
  icon: "nest",
  phrase: "بَيْنَ كَتِفَيْهِ خَاتَمُ النُّبُوَّةِ، وَهُوَ خَاتَمُ النَّبِيِّينَ",
  title: "The Seal of Prophethood",
  line: "Between his shoulders was a special mark, about the size of a dove’s egg, called the Seal of Prophethood. It showed that he is the last of all the prophets.",
  physical: [
    {
      ref: "shamail:18",
      phrase: "بَيْنَ كَتِفَيْهِ خَاتَمُ النُّبُوَّةِ، وَهُوَ خَاتَمُ النَّبِيِّينَ",
      gloss:
        "Between his shoulders was the Seal of Prophethood, for he is the Seal of the Prophets.",
    },
    {
      ref: "shamail:16",
      phrase: "غُدَّةً حَمْرَاءَ، مِثْلَ بَيْضَةِ الْحَمَامَةِ",
      gloss: "A red swelling like the egg of the dove.",
    },
    {
      ref: "shamail:15",
      phrase: "فَإِذَا هُوَ مِثْلُ زِرِّ الْحَجَلَةِ",
      gloss: "It was like the button of the bridal canopy.",
      note: "زِرّ الحَجَلة is explained two ways: the button of a canopy, or a partridge’s egg (Tirmidhi’s own gloss in his Jāmi‘ says “egg”).",
    },
    {
      ref: "shamail:19",
      phrase: "شَعَرَاتٌ مُجْتَمِعَاتٌ",
      gloss: "Intertwined hairs.",
      note: "Literally “hairs gathered together”.",
    },
  ],
  character: [
    {
      trait: "Caring",
      line: "When a little boy, as-Sā’ib, was unwell, he stroked his head and prayed for blessings for him.",
      ref: "shamail:15",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Understanding",
      line: "When ‘Abdullāh ibn Sarjis walked round behind him hoping to see the Seal, he understood and moved his cloak so he could see it.",
      ref: "shamail:22",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "khasisa",
      title: "A sign for Salmān",
      line: "Salmān al-Fārisī looked at the Seal on his back, and then he believed in him.",
      ref: "shamail:20",
    },
    {
      kind: "mujiza",
      title: "Date palms in one year",
      line: "To free Salmān, the Prophet ﷺ planted date palms, and they gave fruit in that very same year.",
      ref: "shamail:20",
      note: "Dataset English says the palms “bore their annual crop”; the Arabic مِنْ عَامِهَا means “in that same year”, which is the point of the story.",
    },
    {
      kind: "karama",
      title: "Strong at ninety-four",
      line: "As-Sā’ib, the boy he prayed for, was still strong and straight at 94. He said he could hear and see well only because of the Prophet’s ﷺ prayer for him.",
      ref: "bukhari:3390",
      trait: "Caring",
    },
  ],
  mirror: "A seal means something is complete and true. What promise will you keep today?",
});
