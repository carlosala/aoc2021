import { inputPath } from "../utils.ts"
import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { part1, part2 } from "./day03.ts"

const inputArray = Deno.readTextFileSync(
  inputPath(import.meta.url, "input.test.txt")
)
  .trim()
  .split("\n")

Deno.test({
  name: "Day 03, part 1",
  fn: () => {
    assertEquals(198, part1(inputArray))
  },
})

Deno.test({
  name: "Day 03, part 2",
  fn: () => {
    assertEquals(230, part2(inputArray))
  },
})
