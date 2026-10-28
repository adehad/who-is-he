import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "tears",
  name: "His tears",
  icon: "rose",
  phrase: "فَرَأَيْتُ عَيْنَيْ رَسُولِ اللهِ تَهْمِلانِ",
  title: "A tender heart",
  line: "His eyes filled with tears when he listened to the Qur’an, and when someone he loved was dying. He called such tears a mercy.",
  physical: [
    {
      ref: "shamail:311",
      phrase: "فَرَأَيْتُ عَيْنَيْ رَسُولِ اللهِ تَهْمِلانِ",
      gloss: "Then I saw the eyes of Allah’s Messenger bathed in tears.",
    },
    {
      ref: "shamail:310",
      phrase: "وَلِجَوْفِهِ أَزِيزٌ كَأَزِيزِ الْمِرْجَلِ مِنَ الْبُكَاءِ",
      gloss:
        "His inner body was producing a humming sound like the humming of the cauldron due to his weeping.",
    },
  ],
  character: [
    {
      trait: "Good listener",
      line: "He asked Ibn Mas‘ūd to recite to him, saying: “I like to hear it from someone other than myself.”",
      ref: "shamail:311",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Merciful",
      line: "When someone saw him cry, he said: “It is a mercy.”",
      ref: "shamail:313",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "mujiza",
      title: "The palm trunk that cried",
      line: "He used to give his talks standing by a palm-tree trunk. When he moved to a new pulpit, the trunk cried like a camel, until he came down and put his hand on it.",
      ref: "bukhari:896",
      trait: "Merciful",
    },
  ],
  mirror: "It is okay to cry. When you feel sad, what gentle words can you say to yourself?",
});
