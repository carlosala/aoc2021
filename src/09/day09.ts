import { inputPath } from "../utils.ts"

export function parseInput(file: string) {
  return Deno.readTextFileSync(inputPath(import.meta.url, file))
    .trim()
    .split("\n")
    .map((x) => x.split("").map((y) => parseInt(y, 10)))
}

function arrNotCont(arr: Array<Array<number>>, x: Array<number>) {
  for (const el of arr) if (el[0] === x[0] && el[1] === x[1]) return false
  return true
}

function recurseBasin(
  i: Array<Array<number>>,
  j: number,
  k: number,
  stack: Array<Array<number>>
) {
  stack.push([j, k])
  if (j !== 0)
    if (
      i[j - 1][k] !== 9 &&
      arrNotCont(stack, [j - 1, k]) &&
      i[j][k] < i[j - 1][k]
    )
      stack.concat(recurseBasin(i, j - 1, k, stack))

  if (j !== i.length - 1)
    if (
      i[j + 1][k] !== 9 &&
      arrNotCont(stack, [j + 1, k]) &&
      i[j][k] < i[j + 1][k]
    )
      stack.concat(recurseBasin(i, j + 1, k, stack))
  if (k !== 0)
    if (
      i[j][k - 1] !== 9 &&
      arrNotCont(stack, [j, k - 1]) &&
      i[j][k] < i[j][k - 1]
    )
      stack.concat(recurseBasin(i, j, k - 1, stack))
  if (k !== i[0].length - 1)
    if (
      i[j][k + 1] !== 9 &&
      arrNotCont(stack, [j, k + 1]) &&
      i[j][k] < i[j][k + 1]
    )
      stack.concat(recurseBasin(i, j, k + 1, stack))
  return stack
}

export function part1(i: Array<Array<number>>) {
  let result = 0
  for (let j = 0; j < i.length; j++) {
    for (let k = 0; k < i[0].length; k++) {
      if (j !== 0) if (i[j][k] >= i[j - 1][k]) continue
      if (j !== i.length - 1) if (i[j][k] >= i[j + 1][k]) continue
      if (k !== 0) if (i[j][k] >= i[j][k - 1]) continue
      if (k !== i[0].length - 1) if (i[j][k] >= i[j][k + 1]) continue
      result += 1 + i[j][k]
    }
  }
  return result
}

export function part2(i: Array<Array<number>>) {
  const basins = []
  for (let j = 0; j < i.length; j++) {
    for (let k = 0; k < i[0].length; k++) {
      if (j !== 0) if (i[j][k] >= i[j - 1][k]) continue
      if (j !== i.length - 1) if (i[j][k] >= i[j + 1][k]) continue
      if (k !== 0) if (i[j][k] >= i[j][k - 1]) continue
      if (k !== i[0].length - 1) if (i[j][k] >= i[j][k + 1]) continue
      basins.push(recurseBasin(i, j, k, []).length)
    }
  }
  basins.sort((a, b) => b - a)
  return basins[0] * basins[1] * basins[2]
}

if (import.meta.main) {
  const input = parseInput("input.txt")
  console.log("Part 1: " + part1(input))
  console.log("Part 2: " + part2(input))
}
