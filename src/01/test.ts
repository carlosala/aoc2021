import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { part1, part2, parseInput } from "./day01.ts"

const input = parseInput("input.test.txt")

Deno.test({
  name: "Day 01, part 1",
  fn: () => {
    assertEquals(7, part1(input))
  },
})

Deno.test({
  name: "Day 01, part 2",
  fn: () => {
    assertEquals(5, part2(input))
  },
})
