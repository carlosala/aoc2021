import { inputPath } from "../utils.ts"
import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { part1, part2 } from "./day01.ts"

const inputArray = Deno.readTextFileSync(
  inputPath(import.meta.url, "input.test.txt")
)
  .trim()
  .split("\n")
  .map((x: string) => Number(x))

Deno.test({
  name: "Day 01, part 1",
  fn: () => {
    assertEquals(7, part1(inputArray))
  },
})

Deno.test({
  name: "Day 01, part 2",
  fn: () => {
    assertEquals(5, part2(inputArray))
  },
})
