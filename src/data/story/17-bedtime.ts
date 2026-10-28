import { defineBeat } from "@/models/story";

export default defineBeat({
  part: 4,
  title: "Bedtime",
  prop: "pillow",
  greet: "Good night, {name}.",
  lines: [
    "Lie on your right side with your right hand under your cheek, like he did.",
    "Cup your hands, blow gently into them, recite the three Quls (Ikhlāṣ, Falaq and Nās), and wipe them over yourself.",
  ],
  note: "Dataset English for shamail:248 labels the sūra “(Al-Qur'an;114:1)”. “Say: He is Allah, One” is 112:1.",
  refs: ["shamail:246", "shamail:248"],
  stations: ["hands"],
});
