import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "face",
  name: "His face",
  icon: "moon",
  phrase: "يَتَلأْلأُ وَجْهُهُ، تَلأْلُؤَ الْقَمَرِ لَيْلَةَ الْبَدْرِ",
  title: "Like the full moon",
  line: "His face shone like the full moon. One Companion looked at the moon, then at him, and said he was more beautiful than the moon!",
  physical: [
    {
      ref: "shamail:7",
      phrase: "يَتَلأْلأُ وَجْهُهُ، تَلأْلُؤَ الْقَمَرِ لَيْلَةَ الْبَدْرِ",
      gloss: "His face shone with the radiance of the moon on the night of the full moon.",
    },
    {
      ref: "shamail:9",
      phrase: "فَلَهُوَ عِنْدِي أَحْسَنُ مِنَ الْقَمَرِ",
      gloss: "He is indeed more beautiful, in my opinion, than the moon.",
    },
    {
      ref: "shamail:10",
      phrase: "بَلْ مِثْلَ الْقَمَرِ",
      gloss: "Was his face like a sword? No, it was like the moon.",
    },
  ],
  character: [
    {
      trait: "Cheerful",
      line: "When he laughed, it was nearly always a happy smile.",
      ref: "shamail:222",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "research",
      title: "Signs connected to his face",
      line: "We are still looking for checked reports to put here.",
    },
  ],
  mirror: "Smile at yourself in the mirror. Who can you share that smile with today?",
});
