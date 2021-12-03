function partOne(i: Array<string>) {
  const inputLength = i.length
  const numberLength = i[0].length
  let gamma = 0
  for (let j = 0; j < numberLength; j++) {
    let ones = 0
    i.forEach((line) => {
      if (line[j] === "1") ++ones
    })
    if (ones > inputLength / 2) gamma += Math.pow(2, numberLength - 1 - j)
  }
  const epsilon = Math.pow(2, numberLength) - 1 - gamma
  return gamma * epsilon
}

function partTwo(i: Array<string>) {
  let most = [...i]
  let less = [...i]
  let counter = 0
  while (most.length > 1 || less.length > 1) {
    if (most.length > 1) {
      const ones: Array<string> = []
      const zeros: Array<string> = []
      most.forEach((el) => {
        if (el[counter] === "1") ones.push(el)
        else zeros.push(el)
      })
      if (ones.length >= zeros.length) most = [...ones]
      else most = [...zeros]
    }
    if (less.length > 1) {
      const ones: Array<string> = []
      const zeros: Array<string> = []
      less.forEach((el) => {
        if (el[counter] === "1") ones.push(el)
        else zeros.push(el)
      })
      if (ones.length >= zeros.length) less = [...zeros]
      else less = [...ones]
    }
    ++counter
  }
  return parseInt(most[0], 2) * parseInt(less[0], 2)
}

const inputArray = Deno.readTextFileSync("input.txt").split("\n")
console.log(partOne(inputArray))
console.log(partTwo(inputArray))
