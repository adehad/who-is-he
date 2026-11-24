import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "mouth",
  name: "His mouth",
  icon: "lantern",
  phrase: "ضَلِيعُ الْفَمِ، مُفْلَجُ الأَسْنَانِ",
  title: "A wide mouth, bright teeth",
  line: "His cheeks were smooth, his mouth was wide and his front teeth shone white. Only true words ever came out of it!",
  physical: [
    {
      ref: "shamail:8",
      phrase: "سَهْلُ الْخدَّيْنِ",
      gloss: "Endowed with smooth cheeks.",
      note: "Ibn Manẓūr (Lisān, سهل): smooth cheeks, not raised high at the cheekbones.",
    },
    {
      ref: "shamail:9",
      phrase: "ضَلِيعَ الْفَمِ",
      gloss: "Wide-mouthed.",
      note: "The narrator Simāk explains it as “a large mouth” (Musnad Aḥmad 20986 has the same). Ibn al-Athīr (al-Nihāya, ضلع): the Arabs praised a large mouth and disliked a small one. Al-Qārī (Jamʿ al-Wasāʾil 1/45) adds that it is a kināya for perfect eloquence; Lisān (فوه) says مُفَوَّه, “eloquent”, is “as if taken from” width of the mouth.",
    },
    {
      ref: "shamail:8",
      phrase: "ضَلِيعُ الْفَمِ، مُفْلَجُ الأَسْنَانِ",
      gloss: "A wide mouth, cleft teeth.",
      note: "Ibn al-Athīr (al-Nihāya, فلج): falaj is a small gap between the front teeth and the teeth beside them.",
    },
    {
      ref: "tabarani-kabir:10/10397",
      phrase: "بَرَّاقُ الثَّنَايَا",
      gloss: "His front teeth shone.",
      note: "Ibn Masʿūd, on first seeing him in Mecca; ungraded in the corpus. Qāḍī ʿIyāḍ (al-Shifāʾ 1/316) glosses the related شَنَب as the brightness and freshness of the teeth. The report that light was seen coming from between his teeth when he spoke (shamail:15, darimi:59) is not shown: its one chain is graded Daʿīf Jiddan. Al-Haytamī (1/79) and al-Qārī (1/56) read it as the shine of these bright teeth, a likeness for clear speech, or a miracle.",
      review: draft(),
    },
  ],
  character: [
    {
      trait: "Truthful",
      line: "He pointed to his own mouth and said that nothing but the truth ever came out of it, whether he was happy or cross.",
      ref: "abudawud:3646",
      basis: "classical",
      review: draft(),
      note: "He makes the link to his mouth himself (فَأَوْمَأَ بِأُصْبُعِهِ إِلَى فِيهِ). Al-Dārimī 501 has it with a ṣaḥīḥ chain.",
    },
  ],
  signs: [
    {
      kind: "mujiza",
      title: "‘Alī’s sore eyes",
      line: "At Khaybar ‘Alī had sore eyes. The Prophet ﷺ put a little of his saliva on them and prayed, and they were healed at once, as if nothing had been wrong.",
      ref: "bukhari:3009",
      note: "ʿAlī later said: “My eyes have never been sore since the Prophet ﷺ put his saliva in them” (Musnad Aḥmad 579, ungraded in the corpus).",
    },
    {
      kind: "mujiza",
      title: "Food for a thousand",
      line: "At the Battle of the Trench, Jābir had only a little food. The Prophet ﷺ put a little of his saliva in the dough and the pot and prayed for blessing. A thousand people ate, and the pot was still full!",
      ref: "bukhari:4102",
    },
    {
      kind: "mujiza",
      title: "The well that filled up",
      line: "At Ḥudaybiya the well was empty, and 1,400 people were thirsty. The Prophet ﷺ sat at its edge, rinsed his mouth with a little water and poured it in. Soon everyone, and all their animals, drank their fill.",
      ref: "bukhari:3577",
    },
    {
      kind: "karama",
      title: "A baby’s first taste",
      line: "When baby ‘Abdullāh ibn al-Zubayr was born, the Prophet ﷺ chewed a date, put a little in his mouth, and prayed for blessings for him.",
      ref: "bukhari:3909",
    },
  ],
  mirror: "Say something kind to your reflection. What true words will you speak today?",
});
