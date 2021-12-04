import { inputPath } from "../utils.ts"

interface Input {
  numbers: Array<string>
  boards: Array<Array<Array<string>>>
}

export function parseInput(file: string) {
  const inputArray = Deno.readTextFileSync(inputPath(import.meta.url, file))
    .trim()
    .split("\n\n")
  const inputObject: Input = {
    numbers: [...inputArray[0].trim().split(",")],
    boards: [[[]]],
  }
  inputArray.shift()
  const boards = inputArray.map((b) => {
    return b
      .trim()
      .replace(/[ ]{2,}/g, " ")
      .split("\n")
      .map((x) => x.trim().split(" "))
  })
  inputObject.boards = [...boards]
  return inputObject
}

export function part1(i: Input) {
  const stack: Array<string> = []
  let winnerBoard = -1
  for (let j = 0; j < i.numbers.length; j++) {
    stack.push(i.numbers[j])
    for (let b = 0; b < i.boards.length; b++) {
      for (let r = 0; r < 5; r++) {
        let columnWinner = false
        for (let c = 0; c < 5; c++) {
          if (stack.includes(i.boards[b][r][c])) columnWinner = true
          else {
            columnWinner = false
            break
          }
        }
        if (columnWinner) {
          winnerBoard = b
          break
        }
      }
      if (winnerBoard !== -1) break
      for (let c = 0; c < 5; c++) {
        let rowWinner = false
        for (let r = 0; r < 5; r++) {
          if (stack.includes(i.boards[b][r][c])) rowWinner = true
          else {
            rowWinner = false
            break
          }
        }
        if (rowWinner) {
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
      if (!stack.includes(num)) unmarkedSum += Number(num)
    }
  }
  return unmarkedSum * Number(stack[stack.length - 1])
}

export function part2(i: Input) {
  const stack: Array<string> = []
  let winnerBoards: Array<number> = []
  for (let j = 0; j < i.numbers.length; j++) {
    stack.push(i.numbers[j])
    for (let b = 0; b < i.boards.length; b++) {
      for (let r = 0; r < 5; r++) {
        let columnWinner = false
        for (let c = 0; c < 5; c++) {
          if (stack.includes(i.boards[b][r][c])) columnWinner = true
          else {
            columnWinner = false
            break
          }
        }
        if (columnWinner) {
          winnerBoards.push(b)
          break
        }
      }
      if (winnerBoards.length !== 0) continue
      for (let c = 0; c < 5; c++) {
        let rowWinner = false
        for (let r = 0; r < 5; r++) {
          if (stack.includes(i.boards[b][r][c])) rowWinner = true
          else {
            rowWinner = false
            break
          }
        }
        if (rowWinner) {
          winnerBoards.push(b)
          break
        }
      }
    }
    if (winnerBoards.length === 0) continue
    if (winnerBoards.length >= 1 && winnerBoards.length !== i.boards.length) {
      winnerBoards.sort((a, b) => {
        if (a < b) return 1
        return -1
      })
      for (const boardNum of winnerBoards) {
        i.boards.splice(boardNum, 1)
      }
      winnerBoards = []
    } else break
  }
  let unmarkedSum = 0
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const num = i.boards[0][r][c]
      if (!stack.includes(num)) unmarkedSum += Number(num)
    }
  }
  return unmarkedSum * Number(stack[stack.length - 1])
}

if (import.meta.main) {
  const input = parseInput("input.txt")
  console.log("Part 1: " + part1(input))
  console.log("Part 2: " + part2(input))
}
