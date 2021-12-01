import input from "./input.ts"

function part1(i: Array<number>) {
  let increments = 0
  for (let j = 0; j < i.length - 1; j++) {
    if (i[j + 1] > i[j]) increments++
  }
  return increments
}

function part2(i: Array<number>) {
  let increments = 0
  for (let j = 0; j < i.length - 3; j++) {
    const first = i[j] + i[j + 1] + i[j + 2]
    const second = i[j + 1] + i[j + 2] + i[j + 3]
    if (first < second) increments++
  }
  return increments
}

const inputArray = input.split("\n").map((x: string) => Number(x))
console.log("Part 1: " + part1(inputArray))
console.log("Part 2: " + part2(inputArray))
