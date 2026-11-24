import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "fragrance",
  name: "His fragrance",
  icon: "bottle",
  phrase: "أَزْهَرُ اللَّوْنِ",
  title: "Sweeter than musk",
  line: "His skin was bright and glowing, and he smelled sweeter than musk, even when he was hot and sweaty!",
  physical: [
    {
      ref: "muslim:2330b",
      phrase: "أَزْهَرَ اللَّوْنِ كَأَنَّ عَرَقَهُ اللُّؤْلُؤُ",
      gloss: "He was bright of colour, and his drops of sweat were like pearls.",
      note: "Azhar is white and full of light (al-Nihāya); Qāḍī ʿIyāḍ adds “beautiful”, as in “the flower (zahra) of this world’s life”. The pearl here and the “shining” (yatalaʾlaʾ) of his face are one word, from luʾluʾ (al-Nihāya).",
    },
    {
      ref: "shamail:344",
      phrase: "وَلا شَمَمْتُ مِسْكًا قَطُّ، وَلا عِطْرًا كَانَ أَطْيَبَ مِنْ عَرَقِ رسول الله ﷺ",
      gloss: "I never smelled musk or perfume more fragrant than his sweat.",
      note: "One copy reads عَرْف (scent) for عَرَق (sweat); al-Qārī relies on عَرَق.",
    },
    {
      ref: "bukhari:3561",
      phrase: "وَلاَ شَمِمْتُ رِيحًا قَطُّ أَوْ عَرْفًا قَطُّ أَطْيَبَ مِنْ رِيحِ أَوْ عَرْفِ النَّبِيِّ",
      gloss: "Nor have I ever smelled a scent or a fragrance sweeter than his scent or fragrance.",
      note: "ʿArf is a scent, mostly a sweet one (Lisān al-ʿArab, Lane); sweat is ʿaraq. “Or” is the narrator unsure which of the two words was said.",
    },
    {
      ref: "darimi:1407",
      phrase: "فَإِذَا هِيَ أَبْرَدُ مِنَ الثَّلْجِ، وَأَطْيَبُ رِيحًا مِنَ الْمِسْكِ",
      gloss: "And it was cooler than snow and sweeter-smelling than musk.",
      note: "Yazīd ibn al-Aswad, after the dawn prayer, when people took his hand and wiped their faces with it.",
    },
  ],
  character: [
    {
      trait: "Gracious",
      line: "Anas said he never turned down a gift of perfume.",
      ref: "shamail:216",
      basis: "classical",
      note: "Al-Qārī: a small gift that does some good should not be turned down, so that the giver is not hurt. He cites scholars who say that, though his scent was sweet without perfume, he often wore it to meet the angels and sit with people, and to be followed in it.",
      review: draft(),
    },
    {
      trait: "Fresh",
      line: "When he came home, the first thing he did was use the siwāk, a twig for cleaning the teeth.",
      ref: "muslim:253b",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "karama",
      title: "Umm Sulaym’s perfume bottle",
      line: "Umm Sulaym collected drops of his sweat in a little bottle and mixed them into her perfume. It became the best perfume of all!",
      ref: "muslim:2331a",
      note: "Aḥmad’s wording adds that he made a beautiful duʿāʾ for her. Ibn Saʿd reports the perfume being given on, from Umm Sulaym to Ibn Sīrīn and from him to Ayyūb.",
    },
    {
      kind: "khasisa",
      title: "A sweet trail",
      line: "Jābir said that whenever he walked along a path, anyone coming after him could tell he had passed that way, from his sweet scent.",
      ref: "darimi:67",
      note: "The narrator wavers between عَرْفه (his scent) and عَرَقه (his sweat). Al-Bayhaqī lists it among his special qualities, and Isḥāq ibn Rāhawayh said it was his own scent, without perfume (al-Shifāʾ). The editor gives no grade, and every version rests on Isḥāq ibn al-Faḍl, whom a scholar should check.",
    },
  ],
  mirror: "Take a deep breath. How can you leave a sweet feeling wherever you go?",
});
