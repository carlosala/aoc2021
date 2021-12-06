import { inputPath } from "../utils.ts"

type Input = Array<Array<Array<number>>>

export function parseInput(file: string) {
  const inputString = Deno.readTextFileSync(inputPath(import.meta.url, file))
  const inputArray = inputString
    .trim()
    .split("\n")
    .map((x) =>
      x.split(" -> ").map((y) => y.split(",").map((z) => parseInt(z, 10)))
    )
  return inputArray
}

export function part1(i: Input) {
  let result = 0
  const counters: Array<Array<number>> = Array(1000)
    .fill(0)
    .map(() => Array(1000).fill(0))
  for (const line of i) {
    const first = { x: line[0][0], y: line[0][1] }
    const second = { x: line[1][0], y: line[1][1] }
    const xDif = Math.abs(second.x - first.x)
    const yDif = Math.abs(second.y - first.y)
    if (xDif === 0 || yDif === 0) {
      const dif = xDif !== 0 ? xDif : yDif
      const xInc = Math.sign(second.x - first.x)
      const yInc = Math.sign(second.y - first.y)
      for (let j = 0; j <= dif; j++) {
        counters[first.x + j * xInc][first.y + j * yInc] += 1
        if (counters[first.x + j * xInc][first.y + j * yInc] === 2) ++result
      }
    }
  }
  return result
}

export function part2(i: Input) {
  let result = 0
  const counters: Array<Array<number>> = Array(1000)
    .fill(0)
    .map(() => Array(1000).fill(0))
  for (const line of i) {
    const first = { x: line[0][0], y: line[0][1] }
    const second = { x: line[1][0], y: line[1][1] }
    const xDif = Math.abs(second.x - first.x)
    const yDif = Math.abs(second.y - first.y)
    if (xDif === yDif || xDif === 0 || yDif === 0) {
      const dif = xDif !== 0 ? xDif : yDif
      const xInc = Math.sign(second.x - first.x)
      const yInc = Math.sign(second.y - first.y)
      for (let j = 0; j <= dif; j++) {
        counters[first.x + j * xInc][first.y + j * yInc] += 1
        if (counters[first.x + j * xInc][first.y + j * yInc] === 2) ++result
      }
    }
  }
  return result
}

if (import.meta.main) {
  const input = parseInput("input.txt")
  console.log("Part 1: " + part1(input))
  console.log("Part 2: " + part2(input))
}
