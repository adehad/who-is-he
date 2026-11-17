import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "hair",
  name: "His hair and beard",
  icon: "waves",
  phrase: "لَمْ يَكُنْ بِالْجَعْدِ، وَلا بِالسَّبْطِ",
  title: "Soft waves, few white hairs",
  line: "His hair was gently wavy, not tightly curled and not straight, and reached his earlobes. His beard was thick, and Anas counted only fourteen white hairs.",
  physical: [
    {
      ref: "shamail:27",
      phrase: "لَمْ يَكُنْ بِالْجَعْدِ، وَلا بِالسَّبْطِ، كَانَ يَبْلُغُ شَعَرُهُ شَحْمَةَ أُذُنَيْهِ",
      gloss:
        "It was neither crisply curled nor lank. His hair used to reach the lobes of his ears.",
      note: "Al-Qārī (Jamʿ al-Wasāʾil 1:12): his hair was midway between curly and straight. Reports give its length as halfway down the ears, to the earlobes, or to the shoulders; Qāḍī ʿIyāḍ and al-Qārī reconcile them by how long it had grown since he last shaved his head at ʿumra or Ḥajj.",
    },
    {
      ref: "abudawud:4191",
      phrase: "وَلَهُ أَرْبَعُ غَدَائِرَ",
      gloss: "He had four plaits of hair.",
      note: "Al-Nihāya: غَدَائِر are locks or plaits, singular غَدِيرَة.",
    },
    {
      ref: "shamail:31",
      phrase: "ذَا ضَفَائِرَ أَرْبَعٍ",
      gloss: "With four braids of hair.",
      note: "The same report of Umm Hāniʾ as abudawud:4191, through a weaker chain.",
    },
    {
      ref: "shamail:8",
      phrase: "كَثُّ اللِّحْيَةِ",
      gloss: "He was thickly bearded.",
      note: "Lisān al-ʿArab: his beard had many roots and much hair; it was dense, neither thin nor long.",
    },
    {
      ref: "shamail:38",
      phrase: "مَا عَدَدْتُ فِي رَأْسِ رَسُولِ اللهِ ﷺ وَلِحْيَتِهِ، إِلا أَرْبَعَ عَشْرَةَ شَعَرَةً بَيْضَاءَ",
      gloss: "On his head and his beard, I counted only fourteen white hairs.",
    },
    {
      ref: "hakim:4201",
      phrase:
        "كان قد متع بالسواد ولو عددت ما أقبل علي من شيبه في رأسه ولحيته، ما كنت أزيدهن على إحدى عشرة شيبة",
      gloss:
        "He was blessed with black hair. Had I counted the white hairs I could see on his head and beard, I would not have gone above eleven.",
      note: "Anas, asked by ʿUmar ibn ʿAbd al-ʿAzīz whether he dyed his hair; Anas said the colour on some kept hairs came from the perfume used on them. The counts differ between reports: eleven here, fourteen in shamail:38, and seventeen or eighteen in a report of Ibn Saʿd that al-Qārī calls sound (Jamʿ al-Wasāʾil 1:13). All agree they were few.",
    },
    {
      ref: "muslim:2344b",
      phrase: "قَدْ شَمِطَ مُقَدَّمُ رَأْسِهِ وَلِحْيَتِهِ وَكَانَ إِذَا ادَّهَنَ لَمْ يَتَبَيَّنْ",
      gloss:
        "A little grey had appeared at the front of his head and in his beard. When he oiled his hair, it could not be seen.",
    },
  ],
  character: [
    {
      trait: "Neat",
      line: "He liked to start with his right side when he combed his hair, put on his sandals and made wuḍū’.",
      ref: "bukhari:168",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Neat",
      line: "He often oiled his hair and combed his beard.",
      ref: "shamail:33",
      basis: "reflection",
      note: "‘Ā’isha also combed and oiled his hair (bukhari:2028). Al-Qārī, quoting Ibn Baṭṭāl, counts grooming the hair as part of cleanliness.",
      review: draft(),
    },
    {
      trait: "Moved by the Qur’an",
      line: "When his Companions noticed a few grey hairs, he said: “Hūd and its sister sūras have made me grey.”",
      ref: "shamail:42",
      basis: "reflection",
      note: "Abū Bakr asked the same, and he named Hūd, al-Wāqiʿa, al-Mursalāt, ʿAmma yatasāʾalūn and al-Takwīr (tirmidhi:3297; al-Ḥākim grades a similar wording sound, hakim:3314). Al-Qārī: Hūd commands steadfastness, and his concern was for his Umma, knowing how hard they would find it. Al-Haytamī: what greyed him was his tenderness and mercy for them, while his open heart kept the grey to a few hairs.",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "karama",
      title: "Umm Salama’s little silver box",
      line: "Umm Salama kept a few of his hairs in a small silver container. When someone was ill, people sent a cup of water to her.",
      ref: "bukhari:5896",
    },
    {
      kind: "khasisa",
      title: "Shared out at Ḥajj",
      line: "At Ḥajj, after his head was shaved, he gave his hair to Abū Ṭalḥa and said: “Share it out among the people.”",
      ref: "muslim:1305d",
    },
    {
      kind: "mujiza",
      title: "Rain on his beard",
      line: "In a dry year, a man asked him to pray for rain. There was not a cloud in the sky. Before he even came down from the minbar, rain was dripping from his beard!",
      ref: "bukhari:933",
    },
    {
      kind: "karama",
      title: "Hardly a white hair at 120",
      line: "He wiped his hand over Abū Zayd’s face and prayed for him. Abū Zayd lived to 120, with only a few white hairs on his head.",
      ref: "tirmidhi:3629",
      note: "Tirmidhi grades it ḥasan gharīb. The “120 years” is a comment by the narrator ‘Azra, not Abū Zayd himself.",
    },
    {
      kind: "karama",
      title: "Khālid’s cap",
      line: "When the Prophet ﷺ shaved his head at ‘umra, Khālid ibn al-Walīd took the hair from the front of his head and kept it in his cap. Khālid said he never went into battle wearing it without being given victory.",
      ref: "bayhaqi-dalail:6/249",
      note: "Told when Khālid lost the cap at Yarmūk and had it searched for. No grade is printed here; al-Dhahabī calls al-Ḥākim’s version broken (munqaṭiʿ). Qāḍī ʿIyāḍ cites it among his blessings (al-Shifāʾ).",
      grownUp: true,
    },
  ],
  mirror: "Comb your hair in the mirror. How can you look neat and clean today?",
});
