import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { part1, part2, parseInput } from "./day08.ts"

const input = parseInput("input.test.txt")

Deno.test({
  name: "Day 08, part 1",
  fn: () => {
    assertEquals(part1(input), 26)
  },
})

Deno.test({
  name: "Day 08, part 2",
  fn: () => {
    assertEquals(part2(input), 61229)
  },
})
