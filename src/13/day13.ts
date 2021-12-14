import { inputPath } from "../utils.ts";

interface Inst {
  dir: 0 | 1;
  num: number;
}

interface Input {
  dots: number[][];
  inst: Inst[];
}

export function parseInput(file: string): Input {
  const divided = Deno.readTextFileSync(inputPath(import.meta.url, file))
    .trim()
    .split("\n\n");
  const dots = divided[0]
    .split("\n")
    .map((x) => x.split(",").map((y) => parseInt(y, 10)));
  const inst: Inst[] = [];
  divided[1].split("\n").forEach((x) => {
    const split = x.split(" ")[2].split("=");
    inst.push({ dir: split[0] === "x" ? 0 : 1, num: parseInt(split[1], 10) });
  });
  return { dots, inst };
}

function arrCont(arr: number[][], el: number[]) {
  for (const line of arr)
    if (line[0] === el[0] && line[1] === el[1]) return true;
  return false;
}

function foldPaper(dots: number[][], dir: 0 | 1, num: number) {
  const acc: number[][] = [];
  for (const dot of dots) {
    if (dot[dir] === num) continue;
    const newDot = [...dot];
    newDot[dir] = dot[dir] < num ? dot[dir] : 2 * num - dot[dir];
    if (arrCont(acc, newDot)) continue;
    acc.push(newDot);
  }
  return acc;
}

export function part1(i: Input) {
  return foldPaper(i.dots, i.inst[0].dir, i.inst[0].num).length;
}

export function part2(i: Input) {
  let dots = i.dots.map((x) => x.slice());
  for (const { dir, num } of i.inst) {
    dots = foldPaper(dots, dir, num);
  }
  dots.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });
  let toPrint = "\n";
  for (let y = dots[0][1]; y <= dots[dots.length - 1][1]; y++) {
    let line = "";
    for (let x = dots[0][0]; x <= dots[dots.length - 1][0]; x++) {
      let char = "  ";
      dots.forEach((d) => {
        if (d[0] === x && d[1] === y) char = "# ";
      });
      line += char;
    }
    toPrint += `${line}\n`;
  }
  console.log(toPrint);
}

if (import.meta.main) {
  const input = parseInput("input.txt");
  console.log("Part 1: ", part1(input));
  console.log("Part 2: ", part2(input));
}
