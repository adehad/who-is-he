import { defineStation } from "@/models/station";

export default defineStation({
  id: "intro",
  name: "The Hilya",
  icon: "star",
  phrase: "حِلْيَةُ رَسُولِ اللهِ ﷺ",
  title: "Something to hold on to",
  line: "Long ago, a boy called al-Ḥasan asked his uncle to describe the Prophet ﷺ, so he would have something to hold on to. A description like this is called a hilya.",
  physical: [
    {
      ref: "shamail:7",
      phrase: "عَنْ حِلْيَةِ رَسُولِ اللهِ ﷺ، وَأَنَا أَشْتَهِي أَنْ يَصِفَ لِي مِنْهَا شَيْئًا أَتَعَلَّقُ بِهِ",
    },
  ],
  character: [],
  signs: [],
  mirror: null,
});
