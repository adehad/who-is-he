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
      ref: "shamail:7",
      phrase: "أَزْهَرُ اللَّوْنِ",
      gloss: "He was bright of colour.",
    },
    {
      ref: "shamail:333",
      phrase: "وَلا شَمَمْتُ مِسْكًا قَطُّ، وَلا عِطْرًا كَانَ أَطْيَبَ مِنْ عَرَقِ رسول الله ﷺ",
      gloss: "I never smelled musk or perfume more fragrant than his sweat.",
    },
  ],
  character: [],
  signs: [
    {
      kind: "karama",
      title: "Umm Sulaym’s perfume bottle",
      line: "Umm Sulaym collected drops of his sweat in a little bottle and mixed them into her perfume. It became the best perfume of all!",
      ref: "muslim:5899",
    },
  ],
  mirror: "Take a deep breath. How can you leave a sweet feeling wherever you go?",
});
