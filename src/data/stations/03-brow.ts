import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "brow",
  name: "His forehead and brows",
  icon: "lamp",
  phrase: "وَاسِعُ الْجَبِينِ، أَزَجُّ الْحَوَاجِبِ",
  title: "A wide, bright brow",
  line: "His forehead was wide, and his eyebrows were long, fine arches that did not join in the middle. A light seemed to shine over him.",
  physical: [
    {
      ref: "shamail:8",
      phrase: "وَاسِعُ الْجَبِينِ",
      gloss: "Broad of forehead.",
      note: "Al-Qārī (Jamʿ al-Wasāʾil 1:35): clear and wide in length and breadth. Some take it also as a figure for a bright, open face.",
    },
    {
      ref: "shamail:8",
      phrase: "أَزَجُّ الْحَوَاجِبِ، سَوَابِغَ فِي غَيْرِ قَرَنٍ",
      gloss: "Endowed with arched eyebrows, perfect without being conjoined.",
      note: "Al-Nihāya: زَجَج is an arch in the brow, long and drawn out at its tip. Qāḍī ʿIyāḍ: arched, long and full of hair. قَرَن is the meeting of the two brows.",
    },
    {
      ref: "bayhaqi-dalail:1/285",
      phrase: "واسع الجبين أزج الحواجب سوابغ في غير قرن بينهما عرق يدره الغضب",
      gloss:
        "Broad of forehead, with arched eyebrows, full without joining, and between them a vein that anger would make swell.",
      note: "The same words through a second chain: al-Bayhaqī gives Hind’s description through Jaʿfar al-Ṣādiq and his fathers, avoiding the weak link in shamail:8, and marks no difference in this passage. Whether that family chain is sound needs a scholar’s check.",
    },
    {
      ref: "hakim:4274",
      phrase: "أزج أقرن",
      gloss: "Arched brows, meeting in the middle.",
      note: "Umm Maʿbad, in a report al-Ḥākim grades sound, says the brows met, where Hind says they did not. Al-Nihāya holds Hind’s wording to be the correct one. Al-Qārī and al-Haytamī reconcile the two: the brows were so full that they almost met, with a fine gap seen only by someone who looked closely. A scholar should confirm which to teach.",
      grownUp: true,
    },
    {
      ref: "bukhari:3555",
      phrase: "مَسْرُورًا تَبْرُقُ أَسَارِيرُ وَجْهِهِ",
      gloss: "Happy, with the lines of his forehead shining.",
      note: "أَسَارِير are the lines of the face, especially the forehead; the word shares its root with مَسْرُور (happy). Lisān al-ʿArab: they shone like lightning (بَرْق).",
    },
    {
      ref: "shamail:8",
      phrase: "بَيْنَهُمَا عِرْقٌ، يُدِرُّهُ الْغَضَبُ",
      gloss: "With a vein between them that anger would cause to pulsate.",
      note: "Al-Qārī, quoting al-Zamakhsharī: anger made it stir and show.",
    },
    {
      ref: "shamail:8",
      phrase: "أَقْنَى الْعِرْنَيْنِ، لَهُ نُورٌ يَعْلُوهُ",
      gloss: "The bridge of his nose was curved. He had a light that would rise over him.",
      note: "Dataset English goes on: “someone who did not reflect on him would consider him haughty”. The Arabic أَشَمَّ describes a high-bridged nose (at a glance it looked raised), not haughtiness.",
    },
  ],
  character: [
    {
      trait: "Angry only for what is right",
      line: "He never took revenge for his own sake. He only stood up for what was right when something Allah made sacred was broken.",
      ref: "bukhari:3560",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Angry only for what is right",
      line: "Nothing in this world made him angry for himself. But when someone went against what was right, he did not rest until it was put right.",
      ref: "shamail:224",
      basis: "reflection",
      review: draft(),
    },
    {
      trait: "Forgiving",
      line: "When someone made him cross, he turned away and let it go.",
      ref: "shamail:224",
      basis: "reflection",
      note: "Hind: إِذَا غَضِبَ أَعْرَضَ وَأَشَاحَ. Al-Qārī (Jamʿ al-Wasāʾil 2:14) explains that he turned away from what anger calls for, to forbearance and generosity, and pardoned.",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "khasisa",
      title: "Sweat on a cold day",
      line: "‘Ā’isha saw revelation come to him on a very cold day. When it was over, drops of sweat were running down his forehead.",
      ref: "bukhari:2",
      note: "Zayd ibn Thābit describes the drops as pearls (al-Ṭabarānī, al-Muʿjam al-Kabīr 5:4787).",
    },
    {
      kind: "mujiza",
      title: "Mud on his forehead",
      line: "He saw in a dream that he would bow down in water and mud on a special night. That night it rained, the roof of the masjid dripped, and in the morning there was mud on his forehead.",
      ref: "bukhari:2027",
    },
  ],
  mirror:
    "Look at your forehead and eyebrows. When you feel cross, how can you keep your face calm?",
});
