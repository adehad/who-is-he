import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "feet",
  name: "His feet and walk",
  icon: "stream",
  phrase: "كَأَنَّمَا يَنْحَطُّ مِنْ صَبَبٍ",
  title: "Walking as if downhill",
  line: "His feet were so smooth that water ran off them. He walked quickly and firmly, as if going down a slope, and his Companions had to hurry to keep up!",
  physical: [
    {
      ref: "shamail:8",
      phrase: "خَمْصَانُ الأَخْمَصَيْنِ، مَسِيحُ الْقَدَمَيْنِ، يَنْبُو عَنْهُمَا الْمَاءُ",
      gloss:
        "The hollows of his soles were drawn in. His feet were so smooth that water ran off them.",
      note: "خَمْصَان: the middle of the sole is drawn in and does not touch the ground. Ibn al-A‘rābī reads it as a moderate arch, neither high nor flat (al-Nihāya, خمص). Abū Hurayra’s report says he stepped with his whole foot and had no hollow; al-Haytamī and al-Qārī reconcile the two as a slight arch (haytami-ashraf:1/68-2, qari-jam:1/42-2), Mīrak prefers Abū Hurayra’s report on its chains, and Qāḍī ‘Iyāḍ does not reconcile them. Which reading to show is for a scholar. مَسِيح: smooth and soft, with no cracks, so water runs off (al-Nihāya, مسح).",
    },
    {
      ref: "shamail:8",
      phrase: "إِذَا مَشَى كَأَنَّمَا يَنْحَطُّ مِنْ صَبَبٍ",
      gloss: "When he walked, it was as if he were descending a declivity.",
      note: "صَبَب is a downward slope, and water runs fastest downhill (qari-jam:1/23). Ibn ‘Abbās read it as strength of body, as if he walked on the fronts of his feet (lisan:صبب). ‘Alī’s report has the same words (shamail:5, Ḥasan), and al-Ḥākim gives them on a sound chain (hakim:4194). Al-Khaṭṭābī prefers the wording يمشي في صبب; which wording to show is for a scholar.",
    },
    {
      ref: "muslim:2330b",
      phrase: "إِذَا مَشَى تَكَفَّأَ",
      gloss: "When he walked, he leaned forward.",
      note: "Anas’s wording of Hind’s يَخْطُو تَكَفِّيًا. Al-Haytamī: leaning forward along the way, like a ship under sail (haytami-ashraf:1/49).",
    },
    {
      ref: "shamail:8",
      phrase: "يَخْطُو تَكَفِّيًا، وَيَمْشِي هَوْنًا",
      gloss: "He would tread inclining forward and walk comfortably.",
      note: "هَوْن is gentleness, softness and steadiness (al-Nihāya, هون), as in the servants of the Most Merciful “who walk upon the earth gently” (Qur’an 25:63); “comfortably” undersells it. Just before it Hind says إِذَا زَالَ زَالَ قَلِعًا: he lifted his feet firmly, like a tree pulled up by its root, not with the short steps of a proud walker (qari-jam:1/176). Mīrak: قلعًا is how he lifted his feet, هونًا how he set them down (qari-jam:1/43).",
    },
    {
      ref: "shamail:122",
      phrase: "كَأَنَّمَا الأَرْضُ تُطْوَى لَهُ",
      gloss:
        "The earth seemed to be folded up for him. We must strenuously exert ourselves, while he is not subject to any stress.",
    },
  ],
  character: [
    {
      trait: "Grateful",
      line: "He prayed at night until his feet swelled. When asked why, he said: “Shall I not be a thankful servant?”",
      ref: "shamail:260",
      basis: "reflection",
      note: "“A thankful servant”, عَبْدًا شَكُورًا, is how the Qur’an praises Nūḥ (17:3). Al-Qārī: how could he not thank Him, who had blessed him and chosen him for the good of both worlds? (qari-jam:2/66).",
      review: draft(),
    },
    {
      trait: "Humble",
      line: "He was never too proud to walk along with a widow or a poor person to help them with what they needed.",
      ref: "nasai:1414",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Humble",
      line: "He let his Companions walk ahead of him, and he was the first to say salām to anyone he met.",
      ref: "shamail:8",
      basis: "classical",
      note: "يَسُوقُ أَصْحَابَهُ. Al-Qārī: he walked behind them out of humility, like a shepherd, staying back to look after the weakest (qari-jam:1/44).",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "mujiza",
      title: "“Be firm, Uḥud!”",
      line: "When the mountain of Uḥud shook beneath him and his Companions, he struck it with his foot and said: “Be firm, Uḥud!”",
      ref: "bukhari:3686",
      note: "Al-Haytamī: the mountain shook out of joy, and it is sound that he said “Uḥud loves us, and we love it” (haytami-ashraf:1/246-2).",
    },
    {
      kind: "mujiza",
      title: "A tired camel runs",
      line: "Jābir’s camel was too tired to go on. The Prophet ﷺ nudged it with his foot and prayed for it, and it went as it had never gone before. Later he bought the camel from Jābir, then gave him back both the camel and its price!",
      ref: "ahmad:14195",
      note: "Muslim has the same story from Jābir (the Book of Musāqāh) without naming the foot. The corpus gives no grade for Aḥmad’s chain.",
    },
  ],
  mirror:
    "Look down at your feet. Where will they take you to do good today, and who could you walk with and help?",
});
