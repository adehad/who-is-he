import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "mouth",
  name: "His mouth",
  icon: "lantern",
  phrase: "إِذَا تَكَلَّمَ رُئِيَ كَالنُّورِ يَخْرُجُ مِنْ بَيْنِ ثَنَايَاهُ",
  title: "Light when he spoke",
  line: "His cheeks were smooth and his mouth was wide. When he spoke, it seemed as if light came out from between his front teeth!",
  physical: [
    {
      ref: "shamail:7",
      phrase: "سَهْلُ الْخدَّيْنِ",
      gloss: "Endowed with smooth cheeks.",
    },
    {
      ref: "shamail:7",
      phrase: "ضَلِيعُ الْفَمِ، مُفْلَجُ الأَسْنَانِ",
      gloss: "A wide mouth, cleft teeth.",
    },
    {
      ref: "shamail:14",
      phrase: "إِذَا تَكَلَّمَ رُئِيَ كَالنُّورِ يَخْرُجُ مِنْ بَيْنِ ثَنَايَاهُ",
      gloss: "When he spoke, it seemed as if light were emerging from between his middle teeth.",
    },
  ],
  character: [
    {
      trait: "Truthful",
      line: "‘Alī said he was the most truthful of all people in what he said.",
      ref: "shamail:6",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "mujiza",
      title: "‘Alī’s sore eyes",
      line: "At Khaybar ‘Alī had sore eyes. The Prophet ﷺ put a little of his saliva on them and prayed, and they were healed at once, as if nothing had been wrong.",
      ref: "bukhari:2887",
    },
    {
      kind: "mujiza",
      title: "Food for a thousand",
      line: "At the Battle of the Trench, Jābir had only a little food. The Prophet ﷺ put a little of his saliva in the dough and the pot and prayed for blessing. A thousand people ate, and the pot was still full!",
      ref: "bukhari:3930",
    },
    {
      kind: "karama",
      title: "A baby’s first taste",
      line: "When baby ‘Abdullāh ibn al-Zubayr was born, the Prophet ﷺ chewed a date, put a little in his mouth, and prayed for blessings for him.",
      ref: "bukhari:3746",
    },
  ],
  mirror: "Say something kind to your reflection. What true words will you speak today?",
});
