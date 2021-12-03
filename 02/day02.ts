import input from "./input.ts"

function part1(i: Array<string>) {
  let xPos = 0
  let depth = 0
  i.forEach((act) => {
    const splAct = act.split(" ")
    const num = Number(splAct[1])
    if (splAct[0] === "up") {
      depth -= num
      return
    }
    if (splAct[0] === "down") {
      depth += num
      return
    }
    xPos += num
  })
  return xPos * depth
}

function part2(i: Array<string>) {
  let xPos = 0
  let depth = 0
  let aim = 0
  i.forEach((act) => {
    const splAct = act.split(" ")
    const num = Number(splAct[1])
    if (splAct[0] === "up") {
      aim -= num
      return
    }
    if (splAct[0] === "down") {
      aim += num
      return
    }
    xPos += num
    depth += aim * num
  })
  return xPos * depth
}

const inputArray = Deno.readTextFileSync("input.txt").split("\n")
console.log("Part 1: " + part1(inputArray))
console.log("Part 2: " + part2(inputArray))
