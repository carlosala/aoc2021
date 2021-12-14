import { inputPath } from "../utils.ts";

interface Input {
  init: string;
  rules: Record<string, string>;
}

export function parseInput(file: string) {
  const arr = Deno.readTextFileSync(inputPath(import.meta.url, file))
    .trim()
    .split("\n\n");
  const returnObject: Input = {
    init: arr[0],
    rules: {},
  };
  arr[1].split("\n").forEach((x) => {
    const [first, second] = x.split(" -> ");
    returnObject.rules[first] = second;
  });
  return returnObject;
}

export function part1(i: Input) {
  let dict: Record<string, number> = {};
  for (let j = 0; j < i.init.length - 1; j++) {
    dict[i.init[j] + i.init[j + 1]] ??= 0;
    ++dict[i.init[j] + i.init[j + 1]];
  }
  for (let j = 0; j < 10; j++) {
    const newDict: Record<string, number> = {};
    for (const word of Object.keys(dict)) {
      const newLetter = i.rules[word];
      newDict[word[0] + newLetter] ??= 0;
      newDict[newLetter + word[1]] ??= 0;
      newDict[word[0] + newLetter] += dict[word];
      newDict[newLetter + word[1]] += dict[word];
    }
    dict = newDict;
  }
  const counter: Record<string, number> = {};
  for (const word of Object.keys(dict)) {
    counter[word[1]] ??= 0;
    counter[word[1]] += dict[word];
  }
  counter[i.init[0]] ??= 0;
  ++counter[i.init[0]];
  let max = 0;
  let min = 0;
  for (const char of Object.keys(counter)) {
    const num = counter[char];
    max ||= num;
    min ||= num;
    if (num > max) max = num;
    if (num < min) min = num;
  }
  return max - min;
}

export function part2(i: Input) {
  let dict: Record<string, number> = {};
  for (let j = 0; j < i.init.length - 1; j++) {
    dict[i.init[j] + i.init[j + 1]] ??= 0;
    ++dict[i.init[j] + i.init[j + 1]];
  }
  for (let j = 0; j < 40; j++) {
    const newDict: Record<string, number> = {};
    for (const word of Object.keys(dict)) {
      const newLetter = i.rules[word];
      newDict[word[0] + newLetter] ??= 0;
      newDict[newLetter + word[1]] ??= 0;
      newDict[word[0] + newLetter] += dict[word];
      newDict[newLetter + word[1]] += dict[word];
    }
    dict = newDict;
  }
  const counter: Record<string, number> = {};
  for (const word of Object.keys(dict)) {
    counter[word[1]] ??= 0;
    counter[word[1]] += dict[word];
  }
  counter[i.init[0]] ??= 0;
  ++counter[i.init[0]];
  let max = 0;
  let min = 0;
  for (const char of Object.keys(counter)) {
    const num = counter[char];
    max ||= num;
    min ||= num;
    if (num > max) max = num;
    if (num < min) min = num;
  }
  return max - min;
}

if (import.meta.main) {
  const input = parseInput("input.txt");
  console.log("Part 1: ", part1(input));
  console.log("Part 2: ", part2(input));
}
