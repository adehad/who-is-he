import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "voice",
  name: "His voice",
  icon: "ripples",
  phrase: "مَا سَمِعْتُ أَحَدًا أَحْسَنَ صَوْتًا مِنْهُ",
  title: "A beautiful voice",
  line: "He had a beautiful voice. He recited the Qur’an slowly and clearly, letter by letter, stretching out the long sounds.",
  physical: [
    {
      ref: "bukhari:769",
      phrase: "وَمَا سَمِعْتُ أَحَدًا أَحْسَنَ صَوْتًا مِنْهُ أَوْ قِرَاءَةً",
      gloss: "I never heard anyone with a more beautiful voice or recitation than him.",
    },
    {
      ref: "hakim:4274",
      phrase: "وَفِي صَوْتِهِ صَهَلٌ",
      gloss: "And in his voice there was a slight huskiness.",
      note: "Umm Maʿbad. Abū Nuʿaym and Tāj al-ʿArūs (after Abū ʿUbayd) explain ṣahal as a slight huskiness, not a heavy one, but beautiful; al-Nihāya reads ṣaḥal, “his voice was not sharp”.",
    },
    {
      ref: "shamail:313",
      phrase: "قِرَاءَةً مُفَسَّرَةً حَرْفًا حَرْفًا",
      gloss: "A recitation that was explained letter by letter.",
      note: "مُفَسَّرَة here means “clear, distinct”, from the same root as tafsīr (al-Qārī). Al-Ḥākim has the same “letter by letter” from Umm Salama, graded on the conditions of al-Bukhārī and Muslim.",
    },
    {
      ref: "shamail:314",
      phrase: "مَدًّا",
      gloss: "With the voice drawn out over the long vowels.",
      note: "Al-Qārī: he gave each letter its full length where length is due, without overdoing it.",
    },
    {
      ref: "shamail:317",
      phrase: "كُنْتُ أَسْمَعُ قِرَاءَةَ النَّبِيِّ ﷺ، بِاللَّيْلِ وَأَنَا عَلَى عَرِيشِي",
      gloss:
        "I used to hear the recitation of the Prophet during the night while I was on my pallet.",
    },
    {
      ref: "bukhari:5047",
      phrase: "قِرَاءَةً لَيِّنَةً يَقْرَأُ وَهْوَ يُرَجِّعُ",
      gloss: "A soft recitation; he recited with tarjīʿ, a rippling of the voice.",
      grownUp: true,
      note: "Ibn Mughaffal saw him reciting Sūrat al-Fatḥ on his camel; in bukhari:7540 it is the day Makka was opened, and the rippling is imitated “ā ā ā”. A report in the Shamāʾil (#319) that he did not do tarjīʿ has a very weak chain (Ḥusām ibn Miṣakk, abandoned), so it is not used here. Scholars explain the sound reports three ways: the camel’s motion (Ibn al-Athīr); not deliberate, or full long vowels (al-Qārī); deliberate, from joy at the Conquest (al-Haytamī). Which to follow is for a scholar.",
    },
  ],
  character: [
    {
      trait: "Unhurried",
      line: "He paused after each verse of al-Fātiḥa, taking his time with every word.",
      ref: "shamail:315",
      basis: "reflection",
      note: "Al-Ḥākim gives the same from Umm Salama, graded on the conditions of al-Bukhārī and Muslim. Al-Haytamī: his recitation was tartīl, neither dragged out nor hurried. Compare 73:4, “recite the Qur’an slowly and distinctly.”",
      review: draft(),
    },
    {
      trait: "Considerate",
      line: "When he came home at night, he said salām softly enough not to wake anyone asleep, but loud enough for anyone awake to hear.",
      ref: "muslim:2055a",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "mujiza",
      title: "Heard from far away",
      line: "At Minā, the people could hear what he said even while they were sitting in their own tents.",
      ref: "abudawud:1957",
      note: "Al-Nasāʾī’s wording has “Allah opened our hearing”. Abū Nuʿaym puts it in a chapter on his voice reaching where no one else’s could.",
    },
    {
      kind: "mujiza",
      title: "“Sit down!”",
      line: "One Friday he said “Sit down!” from the minbar. ‘Abdullāh ibn Rawāḥa heard him from another neighbourhood and sat down right where he was.",
      ref: "abunuaym-dalail:358",
    },
    {
      kind: "khasisa",
      title: "Described before he came",
      line: "The Torah described him long before he was born: not harsh, not rough, and never shouting in the markets.",
      ref: "bukhari:2125",
      note: "ʿĀʾisha says the same of the Gospel (al-Ḥākim). Al-Qārī: “in the markets” is meant, for he did raise his voice in recitation and in sermons.",
    },
    {
      kind: "khasisa",
      title: "An honoured voice",
      line: "Allah told the believers not to raise their voices above the Prophet’s voice.",
      ref: "quran:49:2",
      note: "After this verse ʿUmar spoke to him so softly that he had to ask him to repeat himself (al-Bukhārī).",
    },
  ],
  mirror: "Read a few words to the mirror, slowly and clearly. How does it feel to take your time?",
});
