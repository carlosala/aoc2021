import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { part1, parseInput } from "./day13.ts";

const input = parseInput("input.test.txt");

Deno.test({
  name: "Day 13, part 1",
  fn: () => {
    assertEquals(part1(input), 17);
  },
});
