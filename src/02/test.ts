import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { part1, part2, parseInput } from "./day02.ts";

const input = parseInput("input.test.txt");

Deno.test({
  name: "Day 02, part 1",
  fn: () => {
    assertEquals(part1(input), 150);
  },
});

Deno.test({
  name: "Day 02, part 2",
  fn: () => {
    assertEquals(part2(input), 900);
  },
});
