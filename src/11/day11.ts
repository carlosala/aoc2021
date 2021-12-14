import { inputPath } from "../utils.ts";

export function parseInput(file: string) {
  return Deno.readTextFileSync(inputPath(import.meta.url, file))
    .trim()
    .split("\n")
    .map((x) => x.split("").map((y) => parseInt(y, 10)));
}

function arrNotCont(arr: number[][], el: number[]) {
  for (const l of arr) if (l[0] === el[0] && l[1] === el[1]) return false;
  return true;
}

function recurseFlash(
  i: number[][],
  j: number,
  k: number,
  acc: number[][],
  r: number
) {
  i[j][k] = 0;
  acc[acc.length] = [j, k];
  ++r;
  if (j !== 0) {
    if (i[j - 1][k] === 9) r = recurseFlash(i, j - 1, k, acc, r);
    else if (arrNotCont(acc, [j - 1, k])) ++i[j - 1][k];
    if (k !== i[0].length - 1) {
      if (i[j - 1][k + 1] === 9) r = recurseFlash(i, j - 1, k + 1, acc, r);
      else if (arrNotCont(acc, [j - 1, k + 1])) ++i[j - 1][k + 1];
    }
  }
  if (j !== i.length - 1) {
    if (i[j + 1][k] === 9) r = recurseFlash(i, j + 1, k, acc, r);
    else if (arrNotCont(acc, [j + 1, k])) ++i[j + 1][k];
    if (k !== 0) {
      if (i[j + 1][k - 1] === 9) r = recurseFlash(i, j + 1, k - 1, acc, r);
      else if (arrNotCont(acc, [j + 1, k - 1])) ++i[j + 1][k - 1];
    }
  }
  if (k !== 0) {
    if (i[j][k - 1] === 9) r = recurseFlash(i, j, k - 1, acc, r);
    else if (arrNotCont(acc, [j, k - 1])) ++i[j][k - 1];
    if (j !== 0) {
      if (i[j - 1][k - 1] === 9) r = recurseFlash(i, j - 1, k - 1, acc, r);
      else if (arrNotCont(acc, [j - 1, k - 1])) ++i[j - 1][k - 1];
    }
  }
  if (k !== i[0].length - 1) {
    if (i[j][k + 1] === 9) r = recurseFlash(i, j, k + 1, acc, r);
    else if (arrNotCont(acc, [j, k + 1])) ++i[j][k + 1];
    if (j !== i.length - 1) {
      if (i[j + 1][k + 1] === 9) r = recurseFlash(i, j + 1, k + 1, acc, r);
      else if (arrNotCont(acc, [j + 1, k + 1])) ++i[j + 1][k + 1];
    }
  }
  return r;
}

export function part1(i: number[][]) {
  const iCopy = i.map((x) => x.slice());
  let result = 0;
  for (let s = 0; s < 100; s++) {
    const acc: number[][] = [];
    for (let j = 0; j < iCopy.length; j++) {
      for (let k = 0; k < iCopy[0].length; k++) {
        if (iCopy[j][k] === 9) result += recurseFlash(iCopy, j, k, acc, 0);
        else if (arrNotCont(acc, [j, k])) ++iCopy[j][k];
      }
    }
  }
  return result;
}

export function part2(i: number[][]) {
  const iCopy = i.map((x) => x.slice());
  let step = 0;
  const acc: number[][] = [];
  while (acc.length !== 100) {
    acc.length = 0;
    for (let j = 0; j < iCopy.length; j++) {
      for (let k = 0; k < iCopy[0].length; k++) {
        if (iCopy[j][k] === 9) recurseFlash(iCopy, j, k, acc, 0);
        else if (arrNotCont(acc, [j, k])) ++iCopy[j][k];
      }
    }
    ++step;
  }
  return step;
}

if (import.meta.main) {
  const input = parseInput("input.txt");
  console.log("Part 1: " + part1(input));
  console.log("Part 2: " + part2(input));
}
