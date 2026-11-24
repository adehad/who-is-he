import { expect, test } from "bun:test";
import { leadTrait } from "@/models/station";

test("lead trait skips grown-up-only character", () => {
  const character = [
    { trait: "Hidden", line: "l", grownUp: true as const },
    { trait: "Shown", line: "l" },
  ];
  expect(leadTrait({ character })).toBe("Shown");
  expect(leadTrait({ character: character.slice(0, 1) })).toBeUndefined();
});
