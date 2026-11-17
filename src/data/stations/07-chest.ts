import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "chest",
  name: "His chest and shoulders",
  icon: "chest",
  phrase: "عَرِيضُ الصَّدْرِ، بَعِيدُ مَا بَيْنَ الْمَنْكِبَيْنِ",
  title: "A wide chest, a big heart",
  line: "He had a broad chest and wide shoulders. ‘Alī said he was the most generous-hearted of all people.",
  physical: [
    {
      ref: "shamail:8",
      phrase: "عَرِيضُ الصَّدْرِ، بَعِيدُ مَا بَيْنَ الْمَنْكِبَيْنِ",
      gloss: "He was wide-chested, broad-shouldered.",
    },
    {
      ref: "shamail:8",
      phrase: "سَوَاءُ الْبَطْنِ وَالصَّدْرِ",
      gloss: "With the stomach and the breast in even balance.",
    },
    {
      ref: "shamail:7",
      phrase: "جَلِيلُ الْمُشَاشِ وَالْكَتَدِ",
      gloss: "He had splendid joints and shoulder blades.",
    },
  ],
  character: [
    {
      trait: "Big-hearted",
      line: "Ibn ‘Abbās said he was the most generous of people, and in Ramaḍān he gave good things more freely than the wind blows.",
      ref: "bukhari:6",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "khasisa",
      title: "Washed with Zamzam",
      line: "The angel Jibrīl opened his chest, washed it with Zamzam water, and filled it with wisdom and faith.",
      ref: "bukhari:349",
    },
    {
      kind: "karama",
      title: "Jarīr stays on his horse",
      line: "Jarīr could not sit firmly on a horse. The Prophet ﷺ pressed his hand on Jarīr’s chest and prayed for him, and Jarīr never fell off a horse again.",
      ref: "bukhari:4357",
      trait: "Big-hearted",
    },
  ],
  mirror: "Put your hand on your chest. What will you share with an open heart today?",
});
