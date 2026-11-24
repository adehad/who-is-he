import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "face",
  name: "His face",
  icon: "moon",
  phrase: "يَتَلأْلأُ وَجْهُهُ، تَلأْلُؤَ الْقَمَرِ لَيْلَةَ الْبَدْرِ",
  title: "Like the full moon",
  line: "His face shone like the full moon. One Companion looked at the moon, then at him, and said he was more beautiful than the moon!",
  physical: [
    {
      ref: "shamail:8",
      phrase: "يَتَلأْلأُ وَجْهُهُ، تَلأْلُؤَ الْقَمَرِ لَيْلَةَ الْبَدْرِ",
      gloss: "His face shone with the radiance of the moon on the night of the full moon.",
      note: "Al-Nihāya: يَتَلأْلأُ, “it gleamed”, is taken from لُؤْلُؤ, pearl. Al-Qārī and al-Haytamī ask why the moon and not the sun: the moon can be looked at and gives comfort. Al-Qārī adds that the moon’s light is borrowed and wanes, while his was his own. Every likeness only brings him near; nothing equals him.",
    },
    {
      ref: "shamail:10",
      phrase: "فَلَهُوَ عِنْدِي أَحْسَنُ مِنَ الْقَمَرِ",
      gloss: "He is indeed more beautiful, in my opinion, than the moon.",
    },
    {
      ref: "hakim:7383",
      phrase: "فجعلت أنظر إليه وإلى القمر فلهو أحسن في عيني من القمر",
      gloss:
        "I kept looking at him and at the moon, and to my eyes he was more beautiful than the moon.",
      note: "The same report of Jābir ibn Samura as shamail:10, which is graded weak. Al-Ḥākim calls this chain sound, but al-Dārimī’s editor grades the same report weak for its narrator Ashʿath (darimi:58), so the grades disagree. Al-Haytamī reads “to my eyes” as a fact anyone would see, not one man’s taste.",
    },
    {
      ref: "shamail:11",
      phrase: "بَلْ مِثْلَ الْقَمَرِ",
      gloss: "Was his face like a sword? No, it was like the moon.",
    },
    {
      ref: "muslim:2344b",
      phrase: "لاَ بَلْ كَانَ مِثْلَ الشَّمْسِ وَالْقَمَرِ وَكَانَ مُسْتَدِيرًا",
      gloss: "No, it was like the sun and the moon, and it was round.",
      note: "A fuller wording of shamail:11. Other reports say his face was not fully round; al-Qārī (Jamʿ al-Wasāʾil 1:26) takes it as gently rounded, between round and long.",
    },
    {
      ref: "shamail:122",
      phrase: "كَأَنَّ الشَّمْسَ تَجْرِي فِي وَجْهِهِ",
      gloss: "It was as if the sun were moving across his face.",
    },
    {
      ref: "hakim:4274",
      phrase: "ظاهر الوضاءة، أبلج الوجه",
      gloss: "Of shining radiance, his face bright and open.",
      note: "Umm Maʿbad. Al-Nihāya: أبلج الوجه is a face that shines, as the dawn breaks (تبلّج الصبح).",
    },
  ],
  character: [
    {
      trait: "Cheerful",
      line: "When he was happy, his face lit up like a piece of the moon, and everyone could see his joy.",
      ref: "bukhari:3556",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Cheerful",
      line: "He taught: never think any good deed is too small, even meeting your brother with a cheerful face.",
      ref: "muslim:2626",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Shy",
      line: "He was very shy. When he saw something he did not like, he did not say it to embarrass anyone, but his Companions could see it in his face.",
      ref: "bukhari:6102",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "khasisa",
      title: "A wish answered",
      line: "He loved to face the Ka‘ba when he prayed, and he kept turning his face towards the sky. Allah sent down a verse: “We have seen the turning of your face towards the sky”, and from then on he prayed towards the Ka‘ba.",
      ref: "bukhari:399",
    },
    {
      kind: "khasisa",
      title: "Not the face of a liar",
      line: "When he came to Medina, a learned man called ‘Abdullāh ibn Salām went to look at him. As soon as he saw his face, he knew: this is not the face of someone who lies.",
      ref: "tirmidhi:2485",
      note: "Also in al-Dārimī (darimi:2674, the editor: sound chain). In a report al-Ḥākim grades sound (hakim:4219), a woman travelling with men who had handed him their camel before being paid told them not to worry: a man with a face so like the full moon would not cheat them.",
    },
  ],
  mirror: "Smile at yourself in the mirror. Who can you share that smile with today?",
});
