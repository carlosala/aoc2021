import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { part1, part2, parseInput } from "./day03.ts"

const input = parseInput("input.test.txt")

Deno.test({
  name: "Day 03, part 1",
  fn: () => {
    assertEquals(198, part1(input))
  },
})

Deno.test({
  name: "Day 03, part 2",
  fn: () => {
    assertEquals(230, part2(input))
  },
})
