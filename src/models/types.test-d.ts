import { draft } from "@/models/review";
import { defineStation } from "@/models/station";

export const _ok = defineStation({
  id: "hands",
  name: "His hands",
  icon: "cloud",
  phrase: "ش",
  title: "t",
  line: "l",
  mirror: "m",
  physical: [{ ref: "shamail:5", phrase: "ش", gloss: "g" }],
  character: [
    { trait: "Generous", ref: "shamail:197", basis: "reflection", review: draft(), line: "l" },
  ],
  signs: [{ kind: "mujiza", trait: "Generous", ref: "bukhari:169", title: "t", line: "l" }],
});

export const _badRef = defineStation({
  id: "x",
  name: "n",
  icon: "cloud",
  phrase: "p",
  title: "t",
  line: "l",
  mirror: "m",
  // @ts-expect-error ref not in data/texts.json
  physical: [{ ref: "shamail:99999", phrase: "p", gloss: "g" }],
  character: [],
  signs: [],
});

export const _badTrait = defineStation({
  id: "x",
  name: "n",
  icon: "cloud",
  phrase: "p",
  title: "t",
  line: "l",
  mirror: "m",
  physical: [],
  character: [{ trait: "Gentle", line: "l" }],
  // @ts-expect-error trait not declared in this station's character
  signs: [{ kind: "karama", trait: "Brave", title: "t", line: "l" }],
});

export const _badIcon = defineStation({
  id: "x",
  name: "n",
  // @ts-expect-error unknown icon
  icon: "unicorn",
  phrase: "p",
  title: "t",
  line: "l",
  mirror: "m",
  physical: [],
  character: [],
  signs: [],
});

export const _noCharTrait = defineStation({
  id: "x",
  name: "n",
  icon: "cloud",
  phrase: "p",
  title: "t",
  line: "l",
  mirror: "m",
  physical: [],
  character: [],
  signs: [
    // @ts-expect-error no character traits declared
    { kind: "karama", trait: "Brave", title: "t", line: "l" },
  ],
});
