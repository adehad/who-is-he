import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "voice",
  name: "His voice",
  icon: "ripples",
  phrase: "حَسَنَ الْوَجْهِ، حَسَنَ الصَّوْتِ",
  title: "A beautiful voice",
  line: "He had a beautiful voice. He recited the Qur’an slowly and clearly, letter by letter, stretching out the long sounds.",
  physical: [
    {
      ref: "shamail:308",
      phrase: "حَسَنَ الْوَجْهِ، حَسَنَ الصَّوْتِ",
      gloss: "Endowed with a handsome face and a beautiful voice.",
      note: "These are the words of Qatāda (a Successor), not a Companion. Its last clause “he did not chant in a quavering tone” sits oddly beside #307, where the same verb رَجَّعَ is translated “recited in a quivering voice”.",
    },
    {
      ref: "shamail:302",
      phrase: "قِرَاءَةً مُفَسَّرَةً حَرْفًا حَرْفًا",
      gloss: "A recitation that was explained letter by letter.",
      note: "مُفَسَّرَة here means “clear, distinct”.",
    },
    {
      ref: "shamail:303",
      phrase: "مَدًّا",
      gloss: "With the voice drawn out over the long vowels.",
    },
    {
      ref: "shamail:306",
      phrase: "كُنْتُ أَسْمَعُ قِرَاءَةَ النَّبِيِّ ﷺ، بِاللَّيْلِ وَأَنَا عَلَى عَرِيشِي",
      gloss:
        "I used to hear the recitation of the Prophet during the night while I was on my pallet.",
    },
  ],
  character: [
    {
      trait: "Unhurried",
      line: "He paused after each verse of al-Fātiḥa, taking his time with every word.",
      ref: "shamail:304",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "mujiza",
      title: "Heard from far away",
      line: "At Minā, the people could hear what he said even while they were sitting in their own tents.",
      ref: "abudawud:1958",
      note: "Arabic فَفُتِحَتْ أَسْمَاعُنَا, “our ears were opened (for us)”; dataset English “Our ears were open” loses that.",
    },
  ],
  mirror: "Read a few words to the mirror, slowly and clearly. How does it feel to take your time?",
});
