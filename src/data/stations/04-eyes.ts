import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export default defineStation({
  id: "eyes",
  name: "His eyes",
  icon: "tulip",
  phrase: "أَدْعَجُ الْعَيْنَيْنِ، أَهْدَبُ الأَشْفَارِ",
  title: "Dark eyes, long lashes",
  line: "His eyes were deep black with long eyelashes. He often looked gently down, like a tulip bowing its head, because he was so modest.",
  physical: [
    {
      ref: "shamail:6",
      phrase: "أَدْعَجُ الْعَيْنَيْنِ، أَهْدَبُ الأَشْفَارِ",
      gloss: "Dark black-eyed, with long eyelashes.",
    },
    {
      ref: "shamail:7",
      phrase: "خَافِضُ الطَّرْفِ",
      gloss: "He lowered his eyesight.",
    },
  ],
  character: [
    {
      trait: "Modest",
      line: "His Companions said he was even shyer than a girl in her own private room.",
      ref: "shamail:346",
      basis: "reflection",
      review: draft(),
    },
  ],
  signs: [
    {
      kind: "khasisa",
      title: "He could see behind him",
      line: "In prayer he told the people: “Straighten your rows, for I see you from behind my back.”",
      ref: "bukhari:701",
    },
    {
      kind: "khasisa",
      title: "A heart that stays awake",
      line: "He told ‘Ā’isha: “My eyes sleep, but my heart remains awake.”",
      ref: "bukhari:1115",
    },
  ],
  mirror: "Look into your own eyes. What good things will they look at today?",
});
