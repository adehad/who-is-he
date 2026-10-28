import { defineBeat } from "@/models/story";

export default defineBeat({
  part: 3,
  title: "Say salām first",
  prop: "salam",
  lines: ["“As-salāmu ‘alaykum!” He was always the first to greet anyone he met."],
  prompt: "Who will you greet first today?",
  refs: ["shamail:7"],
  stations: ["speech", "voice"],
});
