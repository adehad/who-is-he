import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "chest",
  name: "His chest and shoulders",
  icon: "chest",
  phrase: "عَرِيضُ الصَّدْرِ، بَعِيدُ مَا بَيْنَ الْمَنْكِبَيْنِ",
  title: "A wide chest, a big heart",
  line: "He had a broad chest and wide shoulders. ‘Alī said he was the most generous-hearted of all people.",
  physical: [
    {
      ref: "shamail:8",
      phrase: "عَرِيضُ الصَّدْرِ، بَعِيدُ مَا بَيْنَ الْمَنْكِبَيْنِ",
      gloss: "He was wide-chested, broad-shouldered.",
    },
    {
      ref: "bukhari:3551",
      phrase: "بَعِيدَ مَا بَيْنَ الْمَنْكِبَيْنِ",
      gloss: "He was broad across the shoulders.",
      note: "Al-Barā’ ibn ‘Āzib’s report, giving Hind’s phrase on a sound chain. Ibn Ḥajar: the mankib is where the upper arm meets the shoulder blade, so this means broad across the upper back, which goes with a broad chest. Al-Qārī adds that the space between the shoulders was also read as a figure for an open chest, a sign of generosity and calm dignity (qari-jam:1/17-2).",
    },
    {
      ref: "bayhaqi-dalail:1/285",
      phrase: "فسيح الصدر",
      gloss: "Spacious of chest.",
      note: "Al-Bayhaqī gives Hind’s description by two routes. Where the route through Jumay‘ ibn ‘Umar (Tirmidhī’s) has عَرِيضُ الصَّدْرِ, the ‘Alawī route, through Ja‘far al-Ṣādiq and his fathers to al-Ḥasan, has فَسِيحُ الصَّدْرِ. That route avoids the unnamed man in Mecca in Tirmidhī’s chain; how far it strengthens the report is for a scholar to judge.",
    },
    {
      ref: "shamail:8",
      phrase: "سَوَاءُ الْبَطْنِ وَالصَّدْرِ",
      gloss: "With the stomach and the breast in even balance.",
      note: "Ibn Manẓūr: his stomach did not stand out and his chest was broad, so the two were level and neither rose above the other (lisan:سوا).",
    },
    {
      ref: "shamail:7",
      phrase: "جَلِيلُ الْمُشَاشِ وَالْكَتَدِ",
      gloss: "He had large joints and a broad upper back.",
      note: "الْمُشَاش are the heads of the bones, such as the elbows, knees and shoulders. الْكَتَد is where the two shoulder blades meet, the upper back (al-Nihāya, كتد; al-Bayhaqī 1/270). Al-Qārī reads both as signs of great strength and courage (qari-jam:1/26-2).",
    },
  ],
  character: [
    {
      trait: "Big-hearted",
      line: "Ibn ‘Abbās said he was the most generous of people, and in Ramaḍān he gave good things more freely than the wind blows.",
      ref: "bukhari:6",
      basis: "reflection",
      note: "Al-Qārī: as the wind spreads rain over dry land, he spread good among people, and his giving brought hearts to life as rain brings the earth (qari-jam:2/170). جُود (generosity) shares its root with جَوْد, heavy rain (maqayis:جود).",
      review: draft(),
    },
    {
      trait: "Big-hearted",
      line: "‘Alī said he was the most generous of people “in his chest”: his giving came from his heart.",
      ref: "shamail:7",
      basis: "classical",
      note: "أَجْوَدُ النَّاسِ صَدْرًا. Al-Qārī: generosity grows from an open chest, the home of the heart, so his giving came from a glad heart and his nature, not from effort (qari-jam:1/27). Al-Haytamī links it to the washing of his chest (haytami-ashraf:1/57).",
      review: draft(),
    },
    {
      trait: "Soft-hearted",
      line: "Allah says to him in the Qur’an: “By a mercy from Allah you were gentle with them. Had you been harsh and hard-hearted, they would have left you.”",
      ref: "quran:3:159",
      basis: "classical",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "khasisa",
      title: "Washed with Zamzam",
      line: "The angel Jibrīl opened his chest, washed it with Zamzam water, and filled it with wisdom and faith.",
      ref: "bukhari:349",
    },
    {
      kind: "khasisa",
      title: "An opened chest",
      line: "Allah says to him in the Qur’an: “Did We not open up your chest for you?”",
      ref: "quran:94:1",
      note: "Ibn ‘Abbās: He opened it with the light of Islam; al-Ḥasan: He filled it with wisdom and knowledge (shifa:1/59). Al-Bayhaqī cites Anas’s report of the washing of his chest under this verse (bayhaqi-dalail:2/6). The verse is read both as the widening of his heart and as the opening of his chest.",
    },
    {
      kind: "karama",
      title: "Jarīr stays on his horse",
      line: "Jarīr could not sit firmly on a horse. The Prophet ﷺ pressed his hand on Jarīr’s chest and prayed for him, and Jarīr never fell off a horse again.",
      ref: "bukhari:4357",
      trait: "Big-hearted",
    },
    {
      kind: "karama",
      title: "A steady heart for ‘Alī",
      line: "When ‘Alī was sent to Yemen as a young judge, he was worried he would not know what to do. The Prophet ﷺ put his hand on ‘Alī’s chest and prayed: “O Allah, make his tongue firm and guide his heart.” After that, ‘Alī never doubted how to judge.",
      ref: "hakim:4658",
    },
    {
      grownUp: true,
      kind: "khasisa",
      title: "Mercy put into his heart",
      line: "Asked by Abū Hurayra what he first saw of prophethood, he said that at about ten years old two men laid him down and opened his chest without blood or pain. They took out rancour and envy and put in kindness and mercy, and he went home tender to the young and merciful to the old.",
      ref: "ahmad:21261",
      note: "The opening in his childhood is also in Muslim, from Anas, in more vivid detail; this is its gentlest wording. The corpus gives no grade for this chain of Aḥmad’s. How far to tell the opening of the chest to children is still to be decided, so this card is for grown-ups.",
    },
  ],
  mirror: "Put your hand on your chest. What will you share with an open heart today?",
});
