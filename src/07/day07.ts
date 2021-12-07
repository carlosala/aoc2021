import { inputPath } from "../utils.ts"

export function parseInput(file: string) {
  return Deno.readTextFileSync(inputPath(import.meta.url, file))
    .trim()
    .split(",")
    .map((x) => parseInt(x, 10))
}

export function part1(i: Array<number>) {
  const maxNumber = Math.max(...i)
  let result = 0
  for (let j = 1; j <= maxNumber; j++) {
    let counter = 0
    for (let k = 0; k < i.length; k++) {
      counter += Math.abs(i[k] - j)
      if (counter > result && result !== 0) break
    }
    if (counter < result || result === 0) result = counter
  }
  return result
}

export function part2(i: Array<number>) {
  const maxNumber = Math.max(...i)
  let result = 0
  const differences: Array<number> = []
  let arrCounter = 0
  for (let j = 0; j <= maxNumber; j++) {
    arrCounter += j
    differences.push(arrCounter)
  }
  for (let j = 1; j <= maxNumber; j++) {
    let counter = 0
    for (let k = 0; k < i.length; k++) {
      counter += differences[Math.abs(i[k] - j)]
      if (counter > result && result !== 0) break
    }
    if (counter < result || result === 0) result = counter
  }
  return result
}

if (import.meta.main) {
  const input = parseInput("input.txt")
  console.log("Part 1: " + part1(input))
  console.log("Part 2: " + part2(input))
}
