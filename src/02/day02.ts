import { inputPath } from "../utils.ts"

export function parseInput(file: string) {
  return Deno.readTextFileSync(inputPath(import.meta.url, file))
    .trim()
    .split("\n")
    .map((x) => x.split(" "))
}

export function part1(i: string[][]) {
  let xPos = 0
  let depth = 0
  i.forEach((act) => {
    const num = parseInt(act[1], 10)
    if (act[0] === "up") {
      depth -= num
      return
    }
    if (act[0] === "down") {
      depth += num
      return
    }
    xPos += num
  })
  return xPos * depth
}

export function part2(i: string[][]) {
  let xPos = 0
  let depth = 0
  let aim = 0
  i.forEach((act) => {
    const num = parseInt(act[1], 10)
    if (act[0] === "up") {
      aim -= num
      return
    }
    if (act[0] === "down") {
      aim += num
      return
    }
    xPos += num
    depth += aim * num
  })
  return xPos * depth
}

if (import.meta.main) {
  const input = parseInput("input.txt")
  console.log("Part 1: " + part1(input))
  console.log("Part 2: " + part2(input))
}
