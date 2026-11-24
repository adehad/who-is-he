import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "speech",
  name: "His words",
  icon: "pearls",
  phrase: "كَلامُهُ فَصْلٌ، لا فُضُولَ، وَلا تَقْصِيرَ",
  title: "Clear, careful words",
  line: "He spoke clearly, his words like beads on a string, so everyone could remember. He never said too much or too little, and was often quiet.",
  physical: [
    {
      ref: "shamail:224",
      phrase: "كَلامُهُ فَصْلٌ، لا فُضُولَ، وَلا تَقْصِيرَ",
      gloss: "His speech was concise, neither excessive nor abridged.",
      note: "Faṣl: clear, separating truth from falsehood (al-Nihāya, al-Haytamī); or each phrase set apart so the listener is not muddled or rushed; or the just middle between too much and too little, which “no excess, no falling short” then explains (al-Qārī).",
    },
    {
      ref: "hakim:4274",
      phrase: "حُلْوُ الْمَنْطِقِ، فَصْلًا، لَا نَزْرٌ وَلَا هَذْرٌ، كَأَنَّ مَنْطِقَهُ خَرَزَاتُ نَظْمٍ يَتَحَدَّرْنَ",
      gloss:
        "Sweet of speech, clear and distinct, neither too little nor rambling, as if his words were beads on a string, coming down one after another.",
      note: "Umm Maʿbad, a second witness to Hind’s “neither excessive nor abridged”. Nazr is too little, as when someone struggles to speak (al-Nihāya); hadhr is babbling (Ibn Fāris).",
    },
    {
      ref: "shamail:222",
      phrase: "يَتَكَلَّمُ بِكَلامٍ بَيِّنٍ فَصْلٍ، يَحْفَظُهُ مَنْ جَلَسَ إِلَيْهِ",
      gloss:
        "He would pause periodically, so that those who sat with him would remember what he said.",
      note: "The Arabic says “he spoke clear, distinct speech that whoever sat with him could memorise”; “pause periodically” is an interpretation.",
    },
    {
      ref: "bukhari:3567",
      phrase: "كَانَ يُحَدِّثُ حَدِيثًا لَوْ عَدَّهُ الْعَادُّ لأَحْصَاهُ",
      gloss:
        "He spoke in such a way that anyone who wanted to count his words could have counted them.",
      note: "Al-Haytamī: he set his sentences apart so a listener could count them, which helps the words stay in the mind. ʿĀʾisha adds in the same report that he did not rush his words on one after another (lam yakun yasrud).",
    },
    {
      ref: "ibnsad:1/375-4",
      phrase: "تَرْتِيلٌ وَتَرْسِيلٌ",
      gloss: "There was a measured, unhurried pace in his speech.",
      note: "Jābir, through an unnamed shaykh. Al-Nihāya: tarsīl is the same as tartīl, and a man is mutarassil in his speech and his walk when he does not hurry.",
    },
    {
      ref: "shamail:224",
      phrase: "طَوِيلُ السَّكْتِ، لا يَتَكَلَّمُ فِي غَيْرِ حَاجَةٍ",
      gloss: "Prolonged in silence. He would not speak unnecessarily.",
      note: "Lisān al-ʿArab: a man is called sikkīt when he speaks little, not from being unable to: when he speaks, he speaks well. In al-Ṭabarānī’s wording of Hind’s report, his silence was for four things: forbearance, caution, weighing things up and reflection.",
    },
    {
      ref: "ahmad:20810",
      phrase: "وَكَانَ طَوِيلَ الصَّمْتِ",
      gloss: "And he was often silent.",
      note: "Jābir ibn Samura, by a connected chain: the same as Hind’s طَوِيلُ السَّكْتِ.",
    },
  ],
  character: [
    {
      trait: "Patient teacher",
      line: "He would repeat his words three times so that everyone could understand.",
      ref: "shamail:223",
      basis: "classical",
      note: "Al-Ḥākim’s wording (hakim:7716) adds “so that it would be understood from him”. Al-Haytamī: this came from his tender care for his community, and shows that a teacher should speak unhurriedly and repeat three times until understood.",
      review: draft(),
    },
    {
      trait: "Thankful",
      line: "He made much of every blessing, however small, and never found fault with it.",
      ref: "shamail:224",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Content",
      line: "He never said a bad word about any food. If he liked it, he ate it, and if not, he simply left it.",
      ref: "bukhari:3563",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Mindful",
      line: "When he spoke, he was remembering Allah, and when he was quiet, he was thinking.",
      ref: "qari-jam:2/11",
      basis: "classical",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "khasisa",
      title: "Short words, huge meanings",
      line: "He said he was sent with jawāmi‘ al-kalim: short sayings that hold the widest meanings.",
      ref: "bukhari:2977",
      note: "Al-Nihāya: many meanings in few words. Al-Zuhrī: Allah gathered for him in one or two sayings matters that earlier books set out at length (al-Bayhaqī, Dalāʾil).",
    },
    {
      kind: "khasisa",
      title: "Words from Allah",
      line: "Allah says in the Qur’an that he does not speak from his own wishes.",
      ref: "quran:53:3",
      note: "The next verse (53:4): “It is naught save an inspiration that is inspired.” Qāḍī ʿIyāḍ (al-Shifāʾ 1/100) reads 53:3 as Allah praising his tongue, beside his heart (53:11) and his sight (53:17).",
    },
    {
      kind: "mujiza",
      title: "Abū Hurayra’s cloak",
      line: "He said that whoever spread out his cloak while he spoke would not forget anything he heard. Abū Hurayra spread his, gathered it to his chest, and never forgot anything he heard from him.",
      ref: "muslim:2492a",
    },
  ],
  mirror: "Say one kind sentence slowly and clearly to the mirror. Who needs to hear it today?",
});
