import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "smile",
  name: "His smile",
  icon: "sunrise",
  phrase: "مَا كَانَ ضَحِكُ رَسُولِ اللهِ ﷺ إِلا تَبَسُّمًا",
  title: "Mostly a smile",
  line: "When he laughed, it was mostly a smile, showing teeth as white as hailstones. Nobody smiled more than he did!",
  physical: [
    {
      ref: "shamail:227",
      phrase: "مَا كَانَ ضَحِكُ رَسُولِ اللهِ ﷺ إِلا تَبَسُّمًا",
      gloss: "His laughter was nothing but a smile.",
      note: "Al-Qārī (Jamʿ al-Wasāʾil 2/15) and al-Haytamī (Ashraf al-Wasāʾil 1/320) take “nothing but” to describe most of his states, since sound reports have him laughing until his back teeth showed. Al-Qārī likens a smile to laughter as drowsiness is to sleep, citing Sulaymān in the Qur’an (27:19): “he smiled, beginning to laugh”.",
    },
    {
      ref: "bukhari:6092",
      phrase: "مَا رَأَيْتُ النَّبِيَّ ﷺ مُسْتَجْمِعًا قَطُّ ضَاحِكًا حَتَّى أَرَى مِنْهُ لَهَوَاتِهِ، إِنَّمَا كَانَ يَتَبَسَّمُ",
      gloss:
        "‘Ā’isha: I never saw the Prophet ﷺ laugh so fully that I could see the back of his throat; he used only to smile.",
    },
    {
      ref: "shamail:224",
      phrase: "جُلُّ ضَحِكِهِ التَّبَسُّمُ، يَفْتَرُّ عَنْ مِثْلِ حَبِّ الْغَمَامِ",
      gloss:
        "Most of his laughter was in the form of a smile that revealed teeth as white as hailstones.",
      note: "Ibn Manẓūr (Lisān, حبب): his teeth are likened to hail in whiteness, clearness and coolness. Ibn al-Athīr (al-Nihāya, فرر): يفترّ is smiling until the teeth show, without loud laughter.",
    },
    {
      ref: "tirmidhi:3641",
      phrase: "مَا رَأَيْتُ أَحَدًا أَكْثَرَ تَبَسُّمًا مِنْ رَسُولِ اللَّهِ ﷺ",
      gloss: "I have not seen anyone who smiled more than the Messenger of Allah.",
    },
    {
      ref: "bayhaqi-dalail:1/274-2",
      phrase: "وَإِذَا ضَحِكَ يَتَلأْلأُ، لَمْ أَرَ قَبْلَهُ وَلا بَعْدَهُ مِثْلَهُ",
      gloss: "When he laughed, it shone. I never saw anyone like him, before him or after.",
      note: "Abū Hurayra’s description, through al-Zuhrī, who did not meet Abū Hurayra; ungraded in the corpus. Qāḍī ʿIyāḍ (al-Shifāʾ 1/149) has «وإذا ضحك يتلألأ في الجدر», as if it shone on the walls.",
      review: draft(),
    },
  ],
  character: [
    {
      trait: "Friendly",
      line: "Jarīr said that from the day he became Muslim, the Prophet ﷺ never once saw him without smiling at him.",
      ref: "shamail:230",
      basis: "reflection",
      review: draft(),
      note: "Dataset English for #230 is only “Same as the above hadith” (#229, which has ضَحِكَ “laughed”); #230’s Arabic has تَبَسَّمَ “smiled”. Al-Haytamī (1/319) and al-Qārī (2/16): he carried a constant concern inwardly, yet smiled a great deal with people to put them at ease.",
    },
    {
      trait: "Welcoming",
      line: "When two seven-year-old boys came to give their promise to him, he smiled and held out his hand to them.",
      ref: "hakim:6410",
      basis: "reflection",
      review: draft(),
      note: "ʿAbdullāh ibn al-Zubayr and ʿAbdullāh ibn Jaʿfar. Mursal from ʿUrwa; al-Dhahabī is silent on it.",
    },
    {
      trait: "Generous",
      line: "He taught: “Your smile in your brother’s face is a charity.”",
      ref: "tirmidhi:1956",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Hopeful",
      line: "He laughed and explained: “Your Lord surely marvels at His servant when he says: My Lord, forgive me my sins.”",
      ref: "shamail:232",
      basis: "reflection",
      review: draft(),
      note: "Al-Qārī (2/21): since wonder cannot be meant of Allah as it is of people, its outcome is meant, His pleasure; that pleasure made the Prophet ﷺ glad, and his gladness made him laugh.",
    },
  ],
  signs: [
    {
      kind: "mujiza",
      title: "Rain around us",
      line: "It rained for a whole week, and a man asked him to pray for it to stop. He smiled and prayed: “Around us, not on us.” The clouds opened up around Madina like a crown.",
      ref: "bukhari:3582",
    },
    {
      kind: "karama",
      title: "Firm on his horse",
      line: "Jarīr told him that he kept falling off his horse. The Prophet ﷺ, who always smiled at Jarīr, patted his chest and prayed: “O Allah, make him firm.” Jarīr never fell off a horse again.",
      ref: "bukhari:6089",
      trait: "Friendly",
      note: "“I never fell from a horse after that”: Jarīr in bukhari:4357.",
    },
    {
      kind: "khasisa",
      title: "A smile for a new sūra",
      line: "He woke from a short doze, smiling. When they asked why, he said: “A sūra has just been sent down to me,” and recited Sūrat al-Kawthar.",
      ref: "muslim:400a",
    },
  ],
  mirror: "Practise a smile that reaches your eyes. Who could use one today?",
});
