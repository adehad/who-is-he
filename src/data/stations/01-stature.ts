import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "stature",
  name: "His height",
  icon: "scales",
  phrase: "رَبْعَةً، لَيْسَ بِالطَّوِيلِ وَلا بِالْقَصِيرِ",
  title: "Just the right height",
  line: "He was not too tall and not too short, but just right. Al-Barā’ said he had never seen anything more beautiful than him!",
  physical: [
    {
      ref: "shamail:2",
      phrase: "رَبْعَةً، لَيْسَ بِالطَّوِيلِ وَلا بِالْقَصِيرِ، حَسَنَ الْجِسْمِ",
      gloss: "He was of medium height, neither tall nor short. He was of handsome physique.",
      note: "Dataset English attaches “brown of color” to his hair; in the Arabic أَسْمَرَ اللَّوْنِ describes his complexion.",
    },
    {
      ref: "shamail:7",
      phrase: "أَطْوَلُ مِنَ الْمَرْبُوعِ، وَأَقْصَرُ مِنَ الْمُشَذَّبِ",
      gloss: "He was taller than medium-sized, and shorter than the slender giant.",
    },
    {
      ref: "shamail:7",
      phrase: "مُعْتَدِلُ الْخَلْقِ",
      gloss: "He was well proportioned in physique.",
    },
    {
      ref: "shamail:3",
      phrase: "مَا رَأَيْتُ شَيْئًا قَطُّ أَحْسَنَ مِنْهُ",
      gloss: "I have never seen anything more beautiful than him!",
      note: "Dataset English names the narrator “Ibn Ishaq” (Arabic: Abū Isḥāq) and adds “neither curly nor lank-haired”, which is not in this Arabic.",
    },
  ],
  character: [
    {
      trait: "Lovable",
      line: "‘Alī said that people who saw him suddenly felt in awe of him, but anyone who got to know him loved him.",
      ref: "shamail:6",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "research",
      title: "Never looking shorter",
      line: "There is a report that when he walked with tall people, he looked taller than them. We have not found and checked its source yet.",
    },
  ],
  mirror:
    "Stand up straight in front of the mirror. Whatever your size, how can you make people glad to know you?",
});
