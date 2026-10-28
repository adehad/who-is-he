import { defineBeat } from "@/models/story";

export default defineBeat({
  part: 4,
  title: "Look back at your day",
  prop: "stars",
  greet: "What a day, {name}!",
  recap: true,
  lines: ["Back at the mirror in your pyjamas."],
  prompt: [
    "What did your hands give today?",
    "What did your eyes look at?",
    "Who did you greet first?",
  ],
  refs: [],
  stations: [],
});
