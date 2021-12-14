import { inputPath } from "../utils.ts";

export function parseInput(file: string) {
  return Deno.readTextFileSync(inputPath(import.meta.url, file))
    .trim()
    .split("\n")
    .map((x) => x.split("-"));
}

function recurseRoute(
  conns: Record<string, string[]>,
  acc: string[],
  conn: string,
  part: 1 | 2,
  twoDone = false
) {
  let result = 0;
  const accCopy = [...acc];
  accCopy[acc.length] = conn;
  for (const p of conns[conn]) {
    if (p === "end") {
      ++result;
      continue;
    }
    if (p === p.toUpperCase() || !accCopy.includes(p))
      result += recurseRoute(conns, accCopy, p, part, twoDone);
    if (
      part === 2 &&
      p === p.toLowerCase() &&
      accCopy.includes(p) &&
      !twoDone
    ) {
      result += recurseRoute(conns, accCopy, p, part, true);
    }
  }
  return result;
}

export function part1(i: string[][]) {
  let result = 0;
  const conns: Record<string, string[]> = {};
  for (const line of i) {
    if (line[1] !== "start" && line[0] !== "end") {
      conns[line[0]] ??= [];
      conns[line[0]].push(line[1]);
    }
    if (line[0] !== "start" && line[1] !== "end") {
      conns[line[1]] ??= [];
      conns[line[1]].push(line[0]);
    }
  }
  for (const conn of conns["start"]) {
    result += recurseRoute(conns, [], conn, 1);
  }
  return result;
}

export function part2(i: string[][]) {
  let result = 0;
  const conns: Record<string, string[]> = {};
  for (const line of i) {
    if (line[1] !== "start" && line[0] !== "end") {
      conns[line[0]] ??= [];
      conns[line[0]].push(line[1]);
    }
    if (line[0] !== "start" && line[1] !== "end") {
      conns[line[1]] ??= [];
      conns[line[1]].push(line[0]);
    }
  }
  for (const conn of conns["start"]) {
    result += recurseRoute(conns, [], conn, 2);
  }
  return result;
}

if (import.meta.main) {
  const input = parseInput("input.txt");
  console.log("Part 1: ", part1(input));
  console.log("Part 2: ", part2(input));
}
