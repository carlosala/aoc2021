import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { part1, part2, parseInput } from "./day04.ts"

const input = parseInput("input.test.txt")

Deno.test({
  name: "Day 04, part 1",
  fn: () => {
    assertEquals(4512, part1(input))
  },
})

Deno.test({
  name: "Day 04, part 2",
  fn: () => {
    assertEquals(1924, part2(input))
  },
})
