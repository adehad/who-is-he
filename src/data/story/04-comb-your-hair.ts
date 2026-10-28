import { defineBeat } from "@/models/story";

export default defineBeat({
  part: 1,
  title: "Comb your hair",
  prop: "comb",
  lines: [
    "Start on the right side. He loved to begin with the right: when combing, putting on shoes, and washing for prayer.",
  ],
  prompt: "Which side did you start with?",
  refs: ["shamail:83"],
  stations: ["hair"],
});
