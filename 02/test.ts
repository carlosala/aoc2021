import { inputPath } from "../utils.ts"
import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { part1, part2 } from "./day02.ts"

const inputArray = Deno.readTextFileSync(
  inputPath(import.meta.url, "input.test.txt")
)
  .trim()
  .split("\n")

Deno.test({
  name: "Day 02, part 1",
  fn: () => {
    assertEquals(150, part1(inputArray))
  },
})

Deno.test({
  name: "Day 02, part 2",
  fn: () => {
    assertEquals(900, part2(inputArray))
  },
})
