import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "hair",
  name: "His hair and beard",
  icon: "waves",
  phrase: "لَمْ يَكُنْ بِالْجَعْدِ، وَلا بِالسَّبْطِ",
  title: "Soft waves, few white hairs",
  line: "His hair was gently wavy, not tightly curled and not straight, and reached his earlobes. His beard was thick, and Anas counted only fourteen white hairs.",
  physical: [
    {
      ref: "shamail:26",
      phrase: "لَمْ يَكُنْ بِالْجَعْدِ، وَلا بِالسَّبْطِ، كَانَ يَبْلُغُ شَعَرُهُ شَحْمَةَ أُذُنَيْهِ",
      gloss:
        "It was neither crisply curled nor lank. His hair used to reach the lobes of his ears.",
    },
    {
      ref: "shamail:30",
      phrase: "ذَا ضَفَائِرَ أَرْبَعٍ",
      gloss: "With four braids of hair.",
    },
    {
      ref: "shamail:7",
      phrase: "كَثُّ اللِّحْيَةِ",
      gloss: "He was thickly bearded.",
    },
    {
      ref: "shamail:37",
      phrase: "مَا عَدَدْتُ فِي رَأْسِ رَسُولِ اللهِ ﷺ وَلِحْيَتِهِ، إِلا أَرْبَعَ عَشْرَةَ شَعَرَةً بَيْضَاءَ",
      gloss: "On his head and his beard, I counted only fourteen white hairs.",
    },
  ],
  character: [
    {
      trait: "Neat",
      line: "He often oiled his hair and combed his beard.",
      ref: "shamail:32",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Moved by the Qur’an",
      line: "When his Companions noticed a few grey hairs, he said: “Hūd and its sister sūras have made me grey.”",
      ref: "shamail:41",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "karama",
      title: "Umm Salama’s little silver box",
      line: "Umm Salama kept a few of his hairs in a small silver container. When someone was ill, people sent a cup of water to her.",
      ref: "bukhari:5669",
    },
    {
      kind: "karama",
      title: "Hardly a white hair at 120",
      line: "He wiped his hand over Abū Zayd’s face and prayed for him. Abū Zayd lived to 120, with only a few white hairs on his head.",
      ref: "tirmidhi:3722",
      note: "Tirmidhi grades it ḥasan gharīb. The “120 years” is a comment by the narrator ‘Azra, not Abū Zayd himself.",
    },
  ],
  mirror: "Comb your hair in the mirror. How can you look neat and clean today?",
});
