import { inputPath } from "../utils.ts";

export function parseInput(file: string) {
  return Deno.readTextFileSync(inputPath(import.meta.url, file))
    .trim()
    .split(",")
    .map((el) => parseInt(el, 10));
}

export function part1(i: number[]) {
  const counters = Array(9).fill(0);
  i.forEach((x) => ++counters[x]);
  for (let j = 0; j < 80; j++) {
    const borns = counters.shift();
    counters[6] += borns;
    counters[8] = borns;
  }
  let result = 0;
  counters.forEach((x) => (result += x));
  return result;
}

export function part2(i: number[]) {
  const counters = Array(9).fill(0);
  i.forEach((x) => ++counters[x]);
  for (let j = 0; j < 256; j++) {
    const borns = counters.shift();
    counters[6] += borns;
    counters[8] = borns;
  }
  let result = 0;
  counters.forEach((x) => (result += x));
  return result;
}

if (import.meta.main) {
  const input = parseInput("input.txt");
  console.log("Part 1: " + part1(input));
  console.log("Part 2: " + part2(input));
}
