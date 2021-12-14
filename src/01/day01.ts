import { inputPath } from "../utils.ts";

export function parseInput(file: string) {
  return Deno.readTextFileSync(inputPath(import.meta.url, file))
    .trim()
    .split("\n")
    .map((x: string) => parseInt(x, 10));
}

export function part1(i: number[]) {
  let increments = 0;
  for (let j = 0; j < i.length - 1; j++) {
    if (i[j + 1] > i[j]) increments++;
  }
  return increments;
}

export function part2(i: number[]) {
  let increments = 0;
  for (let j = 0; j < i.length - 3; j++) {
    const first = i[j] + i[j + 1] + i[j + 2];
    const second = i[j + 1] + i[j + 2] + i[j + 3];
    if (first < second) increments++;
  }
  return increments;
}

if (import.meta.main) {
  const input = parseInput("input.txt");
  console.log("Part 1: " + part1(input));
  console.log("Part 2: " + part2(input));
}
