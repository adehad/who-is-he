import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "eyes",
  name: "His eyes",
  icon: "tulip",
  phrase: "أَدْعَجُ الْعَيْنَيْنِ، أَهْدَبُ الأَشْفَارِ",
  title: "Dark eyes, long lashes",
  line: "His eyes were deep black with long eyelashes. He often looked gently down, like a tulip bowing its head, because he was so modest.",
  physical: [
    {
      ref: "shamail:7",
      phrase: "أَدْعَجُ الْعَيْنَيْنِ، أَهْدَبُ الأَشْفَارِ",
      gloss: "Dark black-eyed, with long eyelashes.",
      note: "Ibn al-Athīr (al-Nihāya, دعج): the black of his eyes was intensely black; or, intense black set in intense white. Al-Qārī (Jamʿ al-Wasāʾil 1/30) prefers the second as “most fitting for praise”. Ibn Fāris (Maqāyīs, هدب) gives the root of أهدب as a fringe, like the threads that hang from a cloud about to rain.",
    },
    {
      ref: "hakim:4274",
      phrase: "فِي عَيْنَيْهِ دَعَجٌ، وَفِي أَشْفَارِهِ وَطَفٌ",
      gloss: "In his eyes a deep blackness, and in his eyelashes a long, full fall.",
      note: "Umm Maʿbad’s description, from the night of the Hijra. Abū ʿUbayd (in Abū Nuʿaym’s Dalāʾil, no. 238) reads وطف as anything long and flowing; some copies have عطف or غطف. A scholar should confirm whether the corpus grade field (صحيح) is al-Dhahabī’s or al-Ḥākim’s.",
    },
    {
      ref: "shamail:9",
      phrase: "أَشْكَلَ الْعَيْنِ",
      gloss: "With a touch of red in the whites of his eyes.",
      note: "The narrator Simāk explains أشكل as “long in the slit of the eye” (the English follows him). Qāḍī ʿIyāḍ, Ibn al-Athīr (al-Nihāya, شكل) and al-Qārī (1/46) call that a slip and say the gharīb scholars agree it means a redness in the white of the eye, a praised feature; ʿAlī’s «مشرب العين بحمرة» (Musnad Aḥmad 684) agrees. The gloss follows them; a scholar should confirm.",
      review: draft(),
    },
    {
      ref: "shamail:225",
      phrase: "أَكْحَلُ الْعَيْنَيْنِ، وَلَيْسَ بِأَكْحَلَ",
      gloss: "His eyes looked as if lined with kohl, though they were not.",
      note: "Ibn al-Athīr (al-Nihāya, كحل): كَحَل is a natural darkness of the eyelids. al-Ḥākim 4196 has the same chain (Ḥajjāj from Simāk), which al-Ḥākim calls ṣaḥīḥ al-isnād and al-Dhahabī answers “Ḥajjāj is soft (layyin)”.",
    },
    {
      ref: "shamail:8",
      phrase: "خَافِضُ الطَّرْفِ",
      gloss: "He lowered his eyesight.",
      note: "Al-Haytamī (Ashraf al-Wasāʾil 1/69): he lowered his gaze because he was deep in thought for his community, and looked down out of modesty and good manners before his Lord.",
    },
    {
      ref: "bayhaqi-dalail:1/285",
      phrase: "نَظَرُهُ إِلَى الأَرْضِ أَطْوَلُ مِنْ نَظْرَةٍ إِلَى السَّمَاءِ، جُلُّ نَظَرِهِ الْمُلاحَظَةُ",
      gloss:
        "He looked at the ground longer than at the sky; most of his looking was a glance from the corner of the eye.",
      note: "Hind’s description again, here through the ʿAlawī route (Jaʿfar al-Ṣādiq, from his fathers, to al-Ḥasan), which avoids Jumayʿ and the unnamed man of Mecca in the Shamāʾil chain; al-Bayhaqī joins it to the Jumayʿ route and marks the ʿAlawī variants. The ʿAlawī chain is ungraded and needs a scholar. Al-Qārī (1/44) says the downward gaze was while he sat silent, so it does not clash with Abū Dāwūd 5094, that when he talked he often raised his eyes to the sky.",
      review: draft(),
    },
  ],
  character: [
    {
      trait: "Modest",
      line: "His Companions said he was even shyer than a girl in her own private room.",
      ref: "shamail:357",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Caring",
      line: "Abū Hurayra was very hungry but too shy to say so. The Prophet ﷺ looked at his face, smiled, understood, and took him home to share some milk.",
      ref: "bukhari:6452",
      basis: "reflection",
      review: draft(),
      note: "Abū Hurayra: «فَتَبَسَّمَ حِينَ رَآنِي وَعَرَفَ مَا فِي نَفْسِي وَمَا فِي وَجْهِي», he smiled when he saw me and knew what was in my heart and on my face.",
    },
  ],
  signs: [
    {
      kind: "khasisa",
      title: "He could see behind him",
      line: "In prayer he told the people: “Straighten your rows, for I see you from behind my back.”",
      ref: "bukhari:718",
      note: "Al-Haytamī (1/71): the One who made sight in the eye can make it elsewhere, so it is best understood as seeing without the eye, a miracle given to him.",
    },
    {
      kind: "khasisa",
      title: "A heart that stays awake",
      line: "He told ‘Ā’isha: “My eyes sleep, but my heart remains awake.”",
      ref: "bukhari:1147",
    },
    {
      kind: "khasisa",
      title: "Eyes that did not wander",
      line: "On the Night Journey he was shown great signs, and Allah says of him in the Qur’an: “The eye did not turn aside, nor did it go too far.”",
      ref: "quran:53:17",
      note: "Ibn ʿAbbās (al-Ḥākim 3749, on the Shaykhayn’s condition): it went neither right nor left, and did not go beyond its bounds. Qāḍī ʿIyāḍ (al-Shifāʾ 1/100) reads the verse as Allah praising his sight.",
    },
    {
      kind: "mujiza",
      title: "Seeing again",
      line: "A man came whose eyes had gone white, so he could not see at all. The Prophet ﷺ blew gently into his eyes and he could see. His son said: “I saw him threading a needle when he was eighty!”",
      ref: "abunuaym-dalail:397",
      note: "The chain has an unnamed man of Banū Salāmān; the corpus gives no grade. Al-Bayhaqī has it at Dalāʾil 6/173.",
    },
    {
      kind: "mujiza",
      title: "Qatāda’s eye",
      line: "At Uḥud, Qatāda shielded the Prophet’s ﷺ face with his own, and an arrow struck his eye. The Prophet’s eyes filled with tears. He prayed for him, and that eye became the better and sharper of his two eyes.",
      ref: "tabarani-kabir:19/12",
      grownUp: true,
      note: "A family chain from Qatāda, ungraded in the corpus; Abū Nuʿaym (Dalāʾil 416–417) and Qāḍī ʿIyāḍ (al-Shifāʾ 1/617) have it too. Al-Bayhaqī (Dalāʾil 3/251) gives both Badr and Uḥud as the day: a scholar should choose.",
      review: draft(),
    },
  ],
  mirror: "Look into your own eyes. What good things will they look at today?",
});
