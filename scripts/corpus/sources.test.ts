import { expect, test } from "bun:test";
import { uniqueKeys } from "./sources";

test("uniqueKeys suffixes each repeat of a key, keeping the first as is", () => {
  expect(uniqueKeys(["1/5", "1/5", "1/6", "1/5"])).toEqual({
    keys: ["1/5", "1/5-2", "1/6", "1/5-3"],
    repeats: 2,
  });
});
