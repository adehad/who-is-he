import { defineBeat } from "@/models/story";

export default defineBeat({
  part: 1,
  title: "Wake up",
  prop: "sun",
  greet: "Good morning, {name}!",
  lines: [
    "You open your eyes and rub the sleepy tears away. His eyes had tears too: when he prayed at night, and when he felt mercy for people he loved.",
    "Say the waking du‘ā’ like he did: “Praise be to Allah, who gave us life again.”",
  ],
  prompt: "What is the first thing your eyes see today?",
  refs: ["shamail:247", "shamail:310", "shamail:313", "shamail:315"],
  stations: ["eyes", "tears"],
});
