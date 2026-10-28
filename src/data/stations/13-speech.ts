import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "speech",
  name: "His words",
  icon: "pearls",
  phrase: "كَلامُهُ فَصْلٌ، لا فُضُولَ، وَلا تَقْصِيرَ",
  title: "Clear, careful words",
  line: "He spoke clearly, so anyone sitting with him could remember what he said. He never said too much or too little, and was often quiet.",
  physical: [
    {
      ref: "shamail:219",
      phrase: "كَلامُهُ فَصْلٌ، لا فُضُولَ، وَلا تَقْصِيرَ",
      gloss: "His speech was concise, neither excessive nor abridged.",
    },
    {
      ref: "shamail:217",
      phrase: "يَتَكَلَّمُ بِكَلامٍ بَيِّنٍ فَصْلٍ، يَحْفَظُهُ مَنْ جَلَسَ إِلَيْهِ",
      gloss:
        "He would pause periodically, so that those who sat with him would remember what he said.",
      note: "The Arabic says “he spoke clear, distinct speech that whoever sat with him could memorise”; “pause periodically” is an interpretation.",
    },
    {
      ref: "shamail:219",
      phrase: "طَوِيلُ السَّكْتِ، لا يَتَكَلَّمُ فِي غَيْرِ حَاجَةٍ",
      gloss: "Prolonged in silence. He would not speak unnecessarily.",
    },
  ],
  character: [
    {
      trait: "Patient teacher",
      line: "He would repeat his words three times so that everyone could understand.",
      ref: "shamail:218",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Thankful",
      line: "He made much of every blessing, however small, and never found fault with it.",
      ref: "shamail:219",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "khasisa",
      title: "Short words, huge meanings",
      line: "He said he was sent with jawāmi‘ al-kalim: short sayings that hold the widest meanings.",
      ref: "bukhari:2855",
    },
  ],
  mirror: "Say one kind sentence slowly and clearly to the mirror. Who needs to hear it today?",
});
