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
      ref: "shamail:7",
      phrase: "عَرِيضُ الصَّدْرِ، بَعِيدُ مَا بَيْنَ الْمَنْكِبَيْنِ",
      gloss: "He was wide-chested, broad-shouldered.",
    },
    {
      ref: "shamail:7",
      phrase: "سَوَاءُ الْبَطْنِ وَالصَّدْرِ",
      gloss: "With the stomach and the breast in even balance.",
    },
    {
      ref: "shamail:6",
      phrase: "جَلِيلُ الْمُشَاشِ وَالْكَتَدِ",
      gloss: "He had splendid joints and shoulder blades.",
    },
  ],
  character: [
    {
      trait: "Big-hearted",
      line: "‘Alī said he was the best of people in generosity: in Arabic, the most generous “of chest”.",
      ref: "shamail:6",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "khasisa",
      title: "Washed with Zamzam",
      line: "The angel Jibrīl opened his chest, washed it with Zamzam water, and filled it with wisdom and faith.",
      ref: "bukhari:345",
    },
    {
      kind: "karama",
      title: "Jarīr stays on his horse",
      line: "Jarīr could not sit firmly on a horse. The Prophet ﷺ pressed his hand on Jarīr’s chest and prayed for him, and Jarīr never fell off a horse again.",
      ref: "bukhari:4167",
      trait: "Big-hearted",
    },
  ],
  mirror: "Put your hand on your chest. What will you share with an open heart today?",
});
