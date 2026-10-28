import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "smile",
  name: "His smile",
  icon: "sunrise",
  phrase: "جُلُّ ضَحِكِهِ التَّبَسُّمُ",
  title: "Mostly a smile",
  line: "When he laughed, it was mostly a smile, showing teeth as white as hailstones. Nobody smiled more than he did!",
  physical: [
    {
      ref: "shamail:219",
      phrase: "جُلُّ ضَحِكِهِ التَّبَسُّمُ، يَفْتَرُّ عَنْ مِثْلِ حَبِّ الْغَمَامِ",
      gloss:
        "Most of his laughter was in the form of a smile that revealed teeth as white as hailstones.",
    },
    {
      ref: "shamail:221",
      phrase: "مَا رَأَيْتُ أَحَدًا أَكْثَرَ تَبَسُّمًا مِنْ رَسُولِ اللهِ ﷺ",
      gloss: "I have not seen anyone with a more cheerful countenance than Allah’s Messenger!",
      note: "The Arabic is more direct: “I have not seen anyone who smiled more”.",
    },
  ],
  character: [
    {
      trait: "Friendly",
      line: "Jarīr said that from the day he became Muslim, the Prophet ﷺ never once saw him without smiling at him.",
      ref: "shamail:225",
      basis: "reflection",
      review: draft(),
      note: "Dataset English for #225 is only “Same as the above hadith” (#224, which has ضَحِكَ “laughed”); #225’s Arabic has تَبَسَّمَ “smiled”.",
    },
    {
      trait: "Hopeful",
      line: "He laughed and explained: “Your Lord surely marvels at His servant when he says: My Lord, forgive me my sins.”",
      ref: "shamail:227",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [],
  mirror: "Practise a smile that reaches your eyes. Who could use one today?",
});
