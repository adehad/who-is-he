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
      ref: "shamail:8",
      phrase: "يَتَلأْلأُ وَجْهُهُ، تَلأْلُؤَ الْقَمَرِ لَيْلَةَ الْبَدْرِ",
      gloss: "His face shone with the radiance of the moon on the night of the full moon.",
    },
    {
      ref: "shamail:10",
      phrase: "فَلَهُوَ عِنْدِي أَحْسَنُ مِنَ الْقَمَرِ",
      gloss: "He is indeed more beautiful, in my opinion, than the moon.",
    },
    {
      ref: "shamail:11",
      phrase: "بَلْ مِثْلَ الْقَمَرِ",
      gloss: "Was his face like a sword? No, it was like the moon.",
    },
  ],
  character: [
    {
      trait: "Cheerful",
      line: "When he was happy, his face lit up like a piece of the moon, and everyone could see his joy.",
      ref: "bukhari:3556",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Cheerful",
      line: "He taught: never think any good deed is too small, even meeting your brother with a cheerful face.",
      ref: "muslim:2626",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "khasisa",
      title: "A wish answered",
      line: "He loved to face the Ka‘ba when he prayed, and he kept turning his face towards the sky. Allah sent down a verse: “We have seen the turning of your face towards the sky”, and from then on he prayed towards the Ka‘ba.",
      ref: "bukhari:399",
    },
  ],
  mirror: "Smile at yourself in the mirror. Who can you share that smile with today?",
});
