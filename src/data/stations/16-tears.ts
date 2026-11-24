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
      ref: "shamail:322",
      phrase: "فَرَأَيْتُ عَيْنَيْ رَسُولِ اللهِ تَهْمِلانِ",
      gloss: "Then I saw the eyes of Allah’s Messenger bathed in tears.",
      note: "Ibn Manẓūr (Lisān, همل): the eye overflowed and ran, as the sky is said to when it rains steadily, quietly and gently. Al-Haytamī (Ashraf al-Wasāʾil 1/453): his weeping was like his laughter, with no loud sobbing, just as his laughter was never loud.",
    },
    {
      ref: "shamail:321",
      phrase: "وَلِجَوْفِهِ أَزِيزٌ كَأَزِيزِ الْمِرْجَلِ مِنَ الْبُكَاءِ",
      gloss:
        "His inner body was producing a humming sound like the humming of the cauldron due to his weeping.",
      note: "Ibn al-Athīr (al-Nihāya, أزز): a soft sound of weeping from awe; or, his inside welled up and simmered with weeping. Al-Haytamī (1/453): he held the sound in until his chest simmered like a pot.",
    },
    {
      ref: "hakim:1671",
      phrase: "فَبَدَأَ بِالْحَجَرِ فَاسْتَلَمَهُ، وَفَاضَتْ عَيْنَاهُ بِالْبُكَاءِ",
      gloss: "He began with the Black Stone and touched it, and his eyes overflowed with tears.",
      note: "Jābir, on entering Mecca. Al-Ḥākim: ṣaḥīḥ on Muslim’s condition. The chain runs through Nuʿaym ibn Ḥammād.",
      review: draft(),
    },
  ],
  character: [
    {
      trait: "Good listener",
      line: "He asked Ibn Mas‘ūd to recite to him, saying: “I like to hear it from someone other than myself.”",
      ref: "shamail:322",
      basis: "reflection",
      review: draft(),
      note: "Ibn Baṭṭāl (in al-Qārī 2/117): the listener can reflect on it better than the reciter, who is busy reciting.",
    },
    {
      trait: "Merciful",
      line: "When someone saw him cry, he said: “It is a mercy.”",
      ref: "shamail:324",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Patient",
      line: "When his baby son Ibrāhīm was dying, his eyes filled with tears. He said: “The eye weeps and the heart grieves, but we say only what pleases our Lord.”",
      ref: "bukhari:1303",
      basis: "reflection",
      grownUp: true,
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "mujiza",
      title: "The palm trunk that cried",
      line: "He used to give his talks standing by a palm-tree trunk. When he moved to a new pulpit, the trunk cried like a camel, until he came down and put his hand on it.",
      ref: "bukhari:918",
      trait: "Merciful",
      note: "Qāḍī ʿIyāḍ (al-Shifāʾ 1/581) calls it mutawātir, from more than ten Companions. al-Dārimī 39 (ṣaḥīḥ chain): “Had I not held it, it would have kept yearning until the Day of Resurrection.” Al-Ḥasan al-Baṣrī would weep at it and say: a piece of wood longs for him; are people who hope to meet him not more deserving of longing? (al-Bayhaqī, Dalāʾil 2/559).",
    },
    {
      kind: "mujiza",
      title: "The camel that cried",
      line: "In a garden in Madina, a camel saw the Prophet ﷺ and its eyes filled with tears. He stroked its head until it was calm, then told its young owner: “Be kind to this animal Allah has given you. It has told me you keep it hungry and tire it out.”",
      ref: "hakim:2485",
      trait: "Merciful",
      note: "al-Ḥākim: ṣaḥīḥ al-isnād; al-Bayhaqī (Dalāʾil 6/26) says Muslim recorded it. Abū Dāwūd 2549 has it too, ungraded in the corpus.",
    },
    {
      kind: "khasisa",
      title: "Tears for his Ummah",
      line: "He recited the prayers of Ibrāhīm and ‘Īsā for their people, then raised his hands and wept: “O Allah, my Ummah, my Ummah!” Allah sent Jibrīl to tell him: “We will make you happy about your Ummah, and never sad.”",
      ref: "muslim:202",
      trait: "Merciful",
      note: "He recites 14:36 and 5:118. Compare 93:5, «وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ», “your Lord will give you, and you will be content”: an echo only, as the hadith does not cite it.",
    },
  ],
  mirror: "It is okay to cry. When you feel sad, what gentle words can you say to yourself?",
});
