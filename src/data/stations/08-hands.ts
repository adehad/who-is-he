import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "hands",
  name: "His hands",
  icon: "cloud",
  phrase: "شَثْنُ الْكَفَّيْنِ",
  title: "Big hands, soft as silk",
  line: "His hands were big and strong, yet softer than silk. He loved to give with them, like a rain cloud giving rain.",
  physical: [
    {
      ref: "shamail:5",
      phrase: "شَثْنُ الْكَفَّيْنِ وَالْقَدَمَيْنِ",
      gloss: "Endowed with sturdy hands and feet.",
    },
    {
      ref: "shamail:7",
      phrase: "رَحْبُ الرَّاحَةِ",
      gloss: "Wide of palm.",
    },
    {
      ref: "shamail:333",
      phrase: "وَلا شَيْئًا كَانَ أَلْيَنَ مِنْ كَفِّ رَسُولِ اللهِ ﷺ",
      gloss: "I never felt silk, or anything at all, softer than the palm of his hand.",
    },
  ],
  character: [
    {
      trait: "Generous",
      line: "When a girl brought him dates and cucumbers, he gave her a whole handful of gifts back.",
      ref: "shamail:197",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Gentle",
      line: "Anas served him for ten years, and he never once said “uff!” to him.",
      ref: "shamail:333",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Gentle",
      line: "He never hit a servant.",
      ref: "shamail:336",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "mujiza",
      title: "Water from his fingers",
      line: "When there was not enough water, he put his hand in a small pot. Water sprang out from under his fingers until everyone had made wuḍū’.",
      ref: "bukhari:169",
      trait: "Generous",
    },
    {
      kind: "karama",
      title: "A pat that smelled like perfume",
      line: "He patted children’s cheeks. Jābir said his hand felt cool and smelled as if it came out of a perfume seller’s bag.",
      ref: "muslim:5896",
      trait: "Gentle",
    },
    {
      kind: "research",
      title: "Hair that stayed black",
      line: "There is a report of a Companion whose hair stayed black where the Prophet ﷺ touched it, even in old age. We have not found and checked its source yet.",
    },
  ],
  mirror: "Hold up your hands. What can you give with them today?",
});
