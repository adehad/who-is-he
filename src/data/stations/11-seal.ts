import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "seal",
  name: "The Seal",
  icon: "nest",
  phrase: "بَيْنَ كَتِفَيْهِ خَاتَمُ النُّبُوَّةِ، وَهُوَ خَاتَمُ النَّبِيِّينَ",
  title: "The Seal of Prophethood",
  line: "Between his shoulders was a special mark, about the size of a dove’s egg, called the Seal of Prophethood. It showed that he is the last of all the prophets.",
  physical: [
    {
      ref: "shamail:19",
      phrase: "بَيْنَ كَتِفَيْهِ خَاتَمُ النُّبُوَّةِ، وَهُوَ خَاتَمُ النَّبِيِّينَ",
      gloss:
        "Between his shoulders was the Seal of Prophethood, for he is the Seal of the Prophets.",
    },
    {
      ref: "muslim:2344b",
      phrase: "وَرَأَيْتُ الْخَاتَمَ عِنْدَ كَتِفِهِ مِثْلَ بَيْضَةِ الْحَمَامَةِ يُشْبِهُ جَسَدَهُ",
      gloss:
        "I saw the Seal near his shoulder, like a dove’s egg, and it looked like the rest of his body.",
    },
    {
      ref: "shamail:17",
      phrase: "غُدَّةً حَمْرَاءَ، مِثْلَ بَيْضَةِ الْحَمَامَةِ",
      gloss: "A reddish lump, like a dove’s egg.",
      note: "The same witness, Jābir ibn Samura, says in Muslim that it looked like the rest of his body, and in Aḥmad that its colour was the colour of his body (ahmad:20978); ‘Alī describes his skin as white tinged with red.",
    },
    {
      ref: "shamail:22",
      phrase: "كَانَ فِي ظَهْرِهِ بَضْعَةٌ نَاشِزَةٌ",
      gloss: "On his back was a small raised piece of flesh.",
      note: "The plainest description. Al-Qārī: the reports do not really differ; each witness compared it to what came to mind, and all mean one raised piece of flesh, with hair gathered over it (qari-jam:1/59).",
    },
    {
      ref: "shamail:16",
      phrase: "فَإِذَا هُوَ مِثْلُ زِرِّ الْحَجَلَةِ",
      gloss: "It was like the button of the bridal canopy.",
      note: "زِرّ الحَجَلة is explained two ways. Most (al-Nawawī, al-Haytamī, al-Nihāya) read it as one of the large buttons that fasten a bride’s canopy (nihaya:زرر, nihaya:حجل). Al-Khaṭṭābī, some copies of al-Bukhārī and al-Qārī read رِزّ, a partridge’s egg, and Tirmidhī’s own gloss in his Jāmi‘ says “egg”. The dove’s-egg report does not settle it; the choice is for a scholar.",
    },
    {
      ref: "shamail:20",
      phrase: "شَعَرَاتٌ مُجْتَمِعَاتٌ",
      gloss: "Intertwined hairs.",
      note: "Literally “hairs gathered together”. Al-Ḥākim’s version: “hair gathered together at his shoulders” (hakim:4198).",
    },
  ],
  character: [
    {
      trait: "Caring",
      line: "When a little boy, as-Sā’ib, was unwell, he stroked his head and prayed for blessings for him.",
      ref: "shamail:16",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Understanding",
      line: "When ‘Abdullāh ibn Sarjis walked round behind him hoping to see the Seal, he understood and moved his cloak so he could see it.",
      ref: "shamail:23",
      basis: "reflection",
      note: "Al-Qārī: he knew what Ibn Sarjis wanted, by the light of prophethood or from seeing him walk round (qari-jam:1/72).",
      review: draft(),
    },
    {
      trait: "Patient",
      line: "A little girl, Umm Khālid, came with her father and began to play with the Seal on his back. Her father told her off, but the Prophet ﷺ said: “Leave her,” and prayed that she would live a long life.",
      ref: "bukhari:5993",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "khasisa",
      title: "A sign for Salmān",
      line: "Salmān al-Fārisī looked at the Seal on his back, and then he believed in him.",
      ref: "shamail:21",
      note: "Al-Qārī: the Seal was a sign of the promised prophet, by which he had been described in the earlier books, as Salmān’s story shows (qari-jam:1/56-3).",
    },
    {
      kind: "khasisa",
      title: "Foretold to Salmān",
      line: "Before Salmān met him, his last teacher told him the coming prophet would have three signs: he would accept a gift, he would not eat charity, and he would have the Seal on his back.",
      ref: "ibnsad:4/81-2",
      note: "Ibn Sa‘d, ungraded. This report puts the Seal by the right shoulder, like a dove’s egg and the colour of his skin; Muslim’s report from Ibn Sarjis puts it by the left (muslim:2346). Compare Qur’an 7:157: the people of the Torah and the Gospel find him written about with them.",
    },
    {
      kind: "mujiza",
      title: "Date palms in one year",
      line: "To free Salmān, the Prophet ﷺ planted date palms, and they gave fruit in that very same year.",
      ref: "shamail:21",
      note: "Dataset English says the palms “bore their annual crop”; the Arabic مِنْ عَامِهَا means “in that same year”, which is the point of the story.",
    },
    {
      kind: "karama",
      title: "Strong at ninety-four",
      line: "As-Sā’ib, the boy he prayed for, was still strong and straight at 94. He said he could hear and see well only because of the Prophet’s ﷺ prayer for him.",
      ref: "bukhari:3540",
      trait: "Caring",
    },
    {
      kind: "khasisa",
      title: "The last brick",
      line: "He said the prophets were like a beautiful house with one brick missing: “I am that brick, and I am the last of the prophets.”",
      ref: "bukhari:3535",
    },
    {
      kind: "khasisa",
      title: "The Seal of the Prophets",
      line: "Allah says in the Qur’an that Muhammad ﷺ is “the Messenger of Allah and the Seal of the Prophets”.",
      ref: "quran:33:40",
      note: "Ibn Fāris: خ ت م means reaching the end of a thing. A seal is set on something only once it is complete, and he is the Seal of the Prophets because he is the last of them (maqayis:ختم). Al-Khātam and al-Khātim are among his names (lisan:ختم).",
    },
    {
      grownUp: true,
      kind: "khasisa",
      title: "A heart filled and sealed",
      line: "In a report of his childhood, after his heart was washed, sakīna, calm, was sprinkled into it, and it was closed and sealed with the Seal of Prophethood.",
      ref: "darimi:13",
      note: "Al-Dārimī’s editor grades the chain weak (Baqiyya’s tadlīs); al-Ḥākim gives the same report as on Muslim’s criteria (hakim:4230). Al-Suhaylī: once his heart was filled with wisdom and certainty it was sealed, as a vessel filled with musk is sealed (qari-jam:1/72-2). Whether the Seal between his shoulders is the mark of this sealing is disputed (Qāḍī ‘Iyāḍ for it, al-Nawawī against; qari-jam:1/58), so it is for a scholar.",
    },
  ],
  mirror: "A seal means something is complete and true. What promise will you keep today?",
});
