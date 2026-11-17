import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "brow",
  name: "His forehead and brows",
  icon: "lamp",
  phrase: "وَاسِعُ الْجَبِينِ، أَزَجُّ الْحَوَاجِبِ",
  title: "A wide, bright brow",
  line: "His forehead was wide, and his eyebrows were long, fine arches that did not join in the middle. A light seemed to shine over him.",
  physical: [
    {
      ref: "shamail:8",
      phrase: "وَاسِعُ الْجَبِينِ",
      gloss: "Broad of forehead.",
    },
    {
      ref: "shamail:8",
      phrase: "أَزَجُّ الْحَوَاجِبِ، سَوَابِغَ فِي غَيْرِ قَرَنٍ",
      gloss: "Endowed with arched eyebrows, perfect without being conjoined.",
    },
    {
      ref: "bukhari:3555",
      phrase: "مَسْرُورًا تَبْرُقُ أَسَارِيرُ وَجْهِهِ",
      gloss: "Happy, with the lines of his forehead shining.",
      note: "أَسَارِير are the lines of the face, especially the forehead; the word shares its root with مَسْرُور (happy).",
    },
    {
      ref: "shamail:8",
      phrase: "بَيْنَهُمَا عِرْقٌ، يُدِرُّهُ الْغَضَبُ",
      gloss: "With a vein between them that anger would cause to pulsate.",
    },
    {
      ref: "shamail:8",
      phrase: "أَقْنَى الْعِرْنَيْنِ، لَهُ نُورٌ يَعْلُوهُ",
      gloss: "The bridge of his nose was curved. He had a light that would rise over him.",
      note: "Dataset English goes on: “someone who did not reflect on him would consider him haughty”. The Arabic أَشَمَّ describes a high-bridged nose (at a glance it looked raised), not haughtiness.",
    },
  ],
  character: [
    {
      trait: "Angry only for what is right",
      line: "He never took revenge for his own sake. He only stood up for what was right when something Allah made sacred was broken.",
      ref: "bukhari:3560",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "khasisa",
      title: "Sweat on a cold day",
      line: "‘Ā’isha saw revelation come to him on a very cold day. When it was over, drops of sweat were running down his forehead.",
      ref: "bukhari:2",
    },
  ],
  mirror:
    "Look at your forehead and eyebrows. When you feel cross, how can you keep your face calm?",
});
