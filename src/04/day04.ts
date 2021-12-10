import { inputPath } from "../utils.ts"

interface Input {
  numbers: string[]
  boards: string[][][]
}

export function parseInput(file: string) {
  const inputArray = Deno.readTextFileSync(inputPath(import.meta.url, file))
    .trim()
    .split("\n\n")
  const inputObject: Input = {
    numbers: [...inputArray[0].trim().split(",")],
    boards: [],
  }
  inputArray.shift()
  const boards = inputArray.map((b) => {
    return b
      .trim()
      .replace(/ +/g, " ")
      .split("\n")
      .map((x) => x.trim().split(" "))
  })
  inputObject.boards = [...boards]
  return inputObject
}

export function part1(i: Input) {
  const stack = []
  let winnerBoard = -1
  for (let j = 0; j < i.numbers.length; j++) {
    stack.push(i.numbers[j])
    for (let b = 0; b < i.boards.length; b++) {
      for (let a = 0; a < 5; a++) {
        let rowWinner = true
        let columnWinner = true
        for (let c = 0; c < 5; c++) {
          if (!stack.includes(i.boards[b][a][c])) rowWinner = false
          if (!stack.includes(i.boards[b][c][a])) columnWinner = false
          if (!rowWinner && !columnWinner) break
        }
        if (rowWinner || columnWinner) {
          winnerBoard = b
          break
        }
      }
      if (winnerBoard >= 0) break
    }
    if (winnerBoard >= 0) break
  }
  let unmarkedSum = 0
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const num = i.boards[winnerBoard][r][c]
      if (!stack.includes(num)) unmarkedSum += parseInt(num, 10)
    }
  }
  return unmarkedSum * parseInt(stack[stack.length - 1], 10)
}

export function part2(i: Input) {
  const stack = []
  const winnerBoards = []
  for (let j = 0; j < i.numbers.length; j++) {
    stack.push(i.numbers[j])
    for (let b = 0; b < i.boards.length; b++) {
      for (let a = 0; a < 5; a++) {
        let rowWinner = true
        let columnWinner = true
        for (let c = 0; c < 5; c++) {
          if (!stack.includes(i.boards[b][a][c])) rowWinner = false
          if (!stack.includes(i.boards[b][c][a])) columnWinner = false
          if (!rowWinner && !columnWinner) break
        }
        if (rowWinner || columnWinner) {
          winnerBoards.push(b)
          break
        }
      }
    }
    if (winnerBoards.length === 0) continue
    if (winnerBoards.length !== i.boards.length) {
      winnerBoards.sort((a, b) => {
        if (a < b) return 1
        return -1
      })
      for (const boardNum of winnerBoards) {
        i.boards.splice(boardNum, 1)
      }
      winnerBoards.length = 0
    } else break
  }
  let unmarkedSum = 0
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const num = i.boards[0][r][c]
      if (!stack.includes(num)) unmarkedSum += parseInt(num, 10)
    }
  }
  return unmarkedSum * parseInt(stack[stack.length - 1], 10)
}

if (import.meta.main) {
  const input = parseInput("input.txt")
  console.log("Part 1: " + part1(input))
  console.log("Part 2: " + part2(input))
}
