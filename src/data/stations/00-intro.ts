import { defineStation } from "@/models/station";

export default defineStation({
  id: "intro",
  name: "The Hilya",
  icon: "star",
  phrase: "حِلْيَةُ رَسُولِ اللهِ ﷺ",
  title: "Something to hold on to",
  line: "Long ago, a boy called al-Ḥasan asked his uncle to describe the Prophet ﷺ, so he would have something to hold on to. A description like this is called a hilya.",
  physical: [
    {
      ref: "shamail:8",
      phrase: "عَنْ حِلْيَةِ رَسُولِ اللهِ ﷺ، وَأَنَا أَشْتَهِي أَنْ يَصِفَ لِي مِنْهَا شَيْئًا أَتَعَلَّقُ بِهِ",
      gloss:
        "About the hilya of the Messenger of Allah ﷺ, and I longed for him to describe some of it to me, so that I could hold on to it.",
      note: "Al-Qārī (Jamʿ al-Wasāʾil 1:33) reads “hold on to it” two ways: keep the description safe in one’s imagination, or hold to it by taking on those qualities. Al-Ḥasan was too young to remember the Prophet ﷺ himself. The chain runs through Jumayʿ ibn ʿUmar, whom Ibn Ḥibbān counted reliable and others weak (al-Haytamī, Ashraf al-Wasāʾil 1:61), and an unnamed man from Mecca.",
    },
    {
      ref: "ibnsad:1/422",
      phrase: "وأنا أشتهي أن يصف لي منها شيئا أتعلق به",
      gloss: "And I longed for him to describe some of it to me, so that I could hold on to it.",
      note: "Ibn Saʿd wrote before al-Tirmidhī and gives the same request through another student of Jumayʿ, so the weak point of the chain is shared.",
    },
    {
      ref: "bayhaqi-dalail:1/285",
      phrase: "وأنا أرجو أن يصف لي شيئا أتعلق به",
      gloss: "And I hoped he would describe something to me that I could hold on to.",
      note: "Al-Bayhaqī gives this first through a family chain: Jaʿfar al-Ṣādiq from his fathers back to al-Ḥasan, which avoids Jumayʿ and the unnamed man. He then gives Jumayʿ’s route and marks where the family wording differs. Whether the family chain is itself sound needs a scholar’s check.",
    },
    {
      ref: "hakim:4274",
      phrase: "صفيه لي يا أم معبد",
      gloss: "Describe him to me, Umm Maʿbad.",
      note: "The second classic hilya. On the road to Medina he stopped at Umm Maʿbad’s tent, and her husband, coming home to find milk, asked her to describe the man who had passed by. Her answer is quoted at several stations.",
    },
    {
      ref: "lisan:حلا",
      phrase: "والحلية: تحليتك وجه الرجل إذا وصفته",
      gloss: "Hilya is how you set out a man’s face when you describe him.",
      note: "Lisān al-ʿArab also gives hilya as a person’s make, form and description. Tāj al-ʿArūs adds that “the hilya of the Prophet ﷺ” comes from this sense.",
    },
  ],
  character: [],
  signs: [],
  mirror: null,
});
