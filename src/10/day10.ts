import { inputPath } from "../utils.ts"

export function parseInput(file: string) {
  return Deno.readTextFileSync(inputPath(import.meta.url, file))
    .trim()
    .split("\n")
    .map((x) => x.split(""))
}

const dict: Record<string, { close: string; value1: number; value2: number }> =
  {
    "(": { close: ")", value1: 3, value2: 1 },
    "[": { close: "]", value1: 57, value2: 2 },
    "{": { close: "}", value1: 1197, value2: 3 },
    "<": { close: ">", value1: 25137, value2: 4 },
  }

function getOpening(c: string) {
  if (c === ")") return "("
  if (c === "]") return "["
  if (c === "}") return "{"
  return "<"
}

export function part1(i: Array<Array<string>>) {
  let result = 0
  for (const line of i) {
    const stack: Array<string> = []
    for (const c of line) {
      if (dict[c]) {
        stack.push(c)
        continue
      }
      const close = dict[stack[stack.length - 1]].close
      if (c !== close) {
        result += dict[getOpening(c)].value1
        break
      }
      stack.pop()
    }
  }
  return result
}

export function part2(i: Array<Array<string>>) {
  const results = []
  for (const line of i) {
    let breaking = false
    const stack: Array<string> = []
    for (const c of line) {
      if (dict[c]) {
        stack.push(c)
        continue
      }
      const close = dict[stack[stack.length - 1]].close
      if (c !== close) {
        breaking = true
        break
      }
      stack.pop()
    }
    if (breaking) continue
    let score = 0
    stack.reverse().forEach((c) => (score = 5 * score + dict[c].value2))
    results.push(score)
  }
  const result = results.sort((a, b) => a - b)[Math.floor(results.length / 2)]
  return result
}

if (import.meta.main) {
  const input = parseInput("input.txt")
  console.log("Part 1: ", part1(input))
  console.log("Part 2: ", part2(input))
}
