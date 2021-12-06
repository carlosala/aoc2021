import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { part1, part2, parseInput } from "./day06.ts"

const input = parseInput("input.test.txt")

Deno.test({
  name: "Day 06, part 1",
  fn: () => {
    assertEquals(part1(input), 5934)
  },
})

Deno.test({
  name: "Day 06, part 2",
  fn: () => {
    assertEquals(part2(input), 26984457539)
  },
})
