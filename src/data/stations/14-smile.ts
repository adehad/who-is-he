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
    },
    {
      ref: "shamail:224",
      phrase: "جُلُّ ضَحِكِهِ التَّبَسُّمُ، يَفْتَرُّ عَنْ مِثْلِ حَبِّ الْغَمَامِ",
      gloss:
        "Most of his laughter was in the form of a smile that revealed teeth as white as hailstones.",
    },
    {
      ref: "tirmidhi:3641",
      phrase: "مَا رَأَيْتُ أَحَدًا أَكْثَرَ تَبَسُّمًا مِنْ رَسُولِ اللَّهِ ﷺ",
      gloss: "I have not seen anyone who smiled more than the Messenger of Allah.",
    },
  ],
  character: [
    {
      trait: "Friendly",
      line: "Jarīr said that from the day he became Muslim, the Prophet ﷺ never once saw him without smiling at him.",
      ref: "shamail:230",
      basis: "reflection",
      review: draft(),
      note: "Dataset English for #225 is only “Same as the above hadith” (#224, which has ضَحِكَ “laughed”); #225’s Arabic has تَبَسَّمَ “smiled”.",
    },
    {
      trait: "Hopeful",
      line: "He laughed and explained: “Your Lord surely marvels at His servant when he says: My Lord, forgive me my sins.”",
      ref: "shamail:232",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "mujiza",
      title: "Rain around us",
      line: "It rained for a whole week, and a man asked him to pray for it to stop. He smiled and prayed: “Around us, not on us.” The clouds opened up around Madina like a crown.",
      ref: "bukhari:3582",
    },
  ],
  mirror: "Practise a smile that reaches your eyes. Who could use one today?",
});
