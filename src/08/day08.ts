import { inputPath } from "../utils.ts"

export function parseInput(file: string) {
  const input = Deno.readTextFileSync(inputPath(import.meta.url, file))
  return input
    .trim()
    .split("\n")
    .map((x) => x.split(" | ").map((y) => y.split(" ")))
}

function sort(i: string) {
  return i.split("").sort().join("")
}

export function part1(i: Array<Array<Array<string>>>) {
  let result = 0
  for (const line of i) {
    for (const word of line[1]) {
      const l = word.length
      if (l === 2 || l === 3 || l === 4 || l === 7) ++result
    }
  }
  return result
}

export function part2(i: Array<Array<Array<string>>>) {
  let result = 0
  for (const line of i) {
    const dict: Array<string> = Array(10).fill(undefined)
    const five = line[0].filter((w) => w.length === 5)
    const six = line[0].filter((w) => w.length === 6)
    const special = line[0].filter((w) => w.length !== 5 && w.length !== 6)
    for (const word of special) {
      const l = word.length
      if (l === 2) dict[1] = sort(word)
      if (l === 4) dict[4] = sort(word)
      if (l === 3) dict[7] = sort(word)
      if (l === 7) dict[8] = sort(word)
    }
    for (const word of five) {
      if (word.includes(dict[1][0]) && word.includes(dict[1][1])) {
        dict[3] = sort(word)
        continue
      }
      const diff = []
      Array.from(word).forEach((x) => {
        if (!dict[4].includes(x)) diff.push(x)
      })
      if (diff.length === 2) dict[5] = sort(word)
      else dict[2] = sort(word)
    }
    for (const word of six) {
      if (!word.includes(dict[1][0]) || !word.includes(dict[1][1])) {
        dict[6] = sort(word)
        continue
      }
      const diff = []
      Array.from(word).forEach((x) => {
        if (!dict[4].includes(x)) diff.push(x)
      })
      if (diff.length === 2) dict[9] = sort(word)
      else dict[0] = sort(word)
    }
    for (let j = 0; j < line[1].length; j++) {
      result += dict.indexOf(sort(line[1][j])) * Math.pow(10, 3 - j)
    }
  }
  return result
}

if (import.meta.main) {
  const input = parseInput("input.txt")
  console.log("Part 1: ", part1(input))
  console.log("Part 2: ", part2(input))
}
