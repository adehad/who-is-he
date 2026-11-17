import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "stature",
  name: "His height",
  icon: "scales",
  phrase: "رَبْعَةً، لَيْسَ بِالطَّوِيلِ وَلا بِالْقَصِيرِ",
  title: "Just the right height",
  line: "He was not too tall and not too short, but just right. Al-Barā’ said he had never seen anything more beautiful than him!",
  physical: [
    {
      ref: "shamail:2",
      phrase: "رَبْعَةً، لَيْسَ بِالطَّوِيلِ وَلا بِالْقَصِيرِ، حَسَنَ الْجِسْمِ",
      gloss: "He was of medium height, neither tall nor short. He was of handsome physique.",
      note: "Dataset English attaches “brown of color” to his hair; in the Arabic أَسْمَرَ اللَّوْنِ describes his complexion.",
    },
    {
      ref: "muslim:2340b",
      phrase: "كَانَ أَبْيَضَ مَلِيحًا مُقَصَّدًا",
      gloss: "He was fair, pleasing to look at, and of balanced build.",
      note: "Al-Nihāya explains مُقَصَّد as neither tall, nor short, nor bulky, “as if his form were made to follow the middle course in all things”. It is the same word as his prayer and sermon being قَصْد, just right (muslim:866a, under Balanced).",
    },
    {
      ref: "shamail:8",
      phrase: "أَطْوَلُ مِنَ الْمَرْبُوعِ، وَأَقْصَرُ مِنَ الْمُشَذَّبِ",
      gloss: "He was taller than medium-sized, and shorter than the slender giant.",
      note: "Al-Nihāya: the مُشَذَّب is the very tall, lean man, named after a tall date palm stripped of its fronds. Al-Haytamī (Ashraf al-Wasāʾil 1:41) reads “medium” and “taller than medium” together: he was medium, and nearer to tall.",
    },
    {
      ref: "ahmad:1300",
      phrase: "كان ليس بالذاهب طولا، وفوق الربعة، إذا جاء مع القوم غمرهم",
      gloss:
        "He was not overly tall, and was above medium height. When he came with a group of people, he stood out above them.",
      note: "ʿAlī’s answer to a man who asked him to describe the Prophet ﷺ, in an addition by Aḥmad’s son ʿAbd Allāh. Al-Nihāya glosses غمرهم as “he was above everyone with him”.",
    },
    {
      ref: "hakim:4274",
      phrase: "ربعة لا تشنأه من طول، ولا تقتحمه عين من قصر، غصن بين غصنين، فهو أنضر الثلاثة منظرا",
      gloss:
        "Of medium height: not so tall that anyone would dislike it, and not so short that an eye would pass over him. A branch between two branches, the freshest-looking of the three.",
      note: "Umm Maʿbad, describing him walking between his two companions. Al-Nihāya on تقتحمه: no eye passes over him to someone else, as if he were small.",
    },
    {
      ref: "shamail:8",
      phrase: "مُعْتَدِلُ الْخَلْقِ",
      gloss: "He was well proportioned in physique.",
      note: "Al-Qārī (Jamʿ al-Wasāʾil 1:39): his limbs were in proportion with one another.",
    },
    {
      ref: "shamail:3",
      phrase: "مَا رَأَيْتُ شَيْئًا قَطُّ أَحْسَنَ مِنْهُ",
      gloss: "I have never seen anything more beautiful than him!",
      note: "Dataset English names the narrator “Ibn Ishaq” (Arabic: Abū Isḥāq) and adds “neither curly nor lank-haired”, which is not in this Arabic.",
    },
  ],
  character: [
    {
      trait: "Lovable",
      line: "‘Alī said that people who saw him suddenly felt in awe of him, but anyone who got to know him loved him.",
      ref: "shamail:7",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Balanced",
      line: "His prayers were not too long and not too short, and his talks were the same: just right.",
      ref: "muslim:866a",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "mujiza",
      title: "Never looking shorter",
      line: "When he walked on his own, people thought he was of medium height. But when a tall man walked beside him, he looked the taller of the two!",
      ref: "bayhaqi-dalail:1/285",
      note: "From a description al-Bayhaqī gives through Ṣubayḥ ibn ʿAbd Allāh al-Farghānī, whom he calls not well known; he adds that it agrees with the sound reports, and that those are what to rely on. Al-Qārī (Jamʿ al-Wasāʾil 1:34) counts it among his miracles. ʿAlī’s “when he came with a group of people, he stood out above them” (ahmad:1300) is a separate report. Whether to present this as a miracle needs a scholar.",
    },
    {
      kind: "khasisa",
      title: "Heavier than a thousand",
      line: "He told Abū Dharr that two angels once weighed him against one man, then ten, then a hundred, then a thousand, and each time he was heavier. One angel said: “If you weighed him against his whole Umma, he would still be heavier.”",
      ref: "darimi:14",
      note: "His answer when Abū Dharr asked how he first knew for certain that he was a prophet. The weighing is of his worth, not his size. The editor grades the chain broken (ʿUrwa did not meet Abū Dharr), with trustworthy narrators.",
    },
  ],
  mirror:
    "Stand up straight in front of the mirror. Whatever your size, how can you make people glad to know you?",
});
