import { inputPath } from "../utils.ts";

interface QueueEl {
  pos: number[];
  dist: number;
}

export function parseInput(file: string) {
  return Deno.readTextFileSync(inputPath(import.meta.url, file))
    .trim()
    .split("\n")
    .map((x) => x.split("").map((y) => parseInt(y, 10)));
}

function iterateDijkstra(
  i: number[][],
  dist: number[][],
  done: boolean[][],
  queue: QueueEl[]
) {
  const {
    dist: currDist,
    pos: [j, k],
  } = queue[0];
  queue.shift();
  const l = i.length - 1;
  done[j][k] = true;
  if (j !== 0 && !done[j - 1][k] && dist[j - 1][k] > currDist + i[j - 1][k]) {
    dist[j - 1][k] = currDist + i[j - 1][k];
    queue.push({ dist: dist[j - 1][k], pos: [j - 1, k] });
  }
  if (j !== l && !done[j + 1][k] && dist[j + 1][k] > currDist + i[j + 1][k]) {
    dist[j + 1][k] = currDist + i[j + 1][k];
    queue.push({ dist: dist[j + 1][k], pos: [j + 1, k] });
  }
  if (k !== 0 && !done[j][k - 1] && dist[j][k - 1] > currDist + i[j][k - 1]) {
    dist[j][k - 1] = currDist + i[j][k - 1];
    queue.push({ dist: dist[j][k - 1], pos: [j, k - 1] });
  }
  if (k !== l && !done[j][k + 1] && dist[j][k + 1] > currDist + i[j][k + 1]) {
    dist[j][k + 1] = currDist + i[j][k + 1];
    queue.push({ dist: dist[j][k + 1], pos: [j, k + 1] });
  }
  queue.sort((a, b) => a.dist - b.dist);
  return queue;
}

export function part1(i: number[][]) {
  const l = i.length;
  const dist = Array(l)
    .fill(0)
    .map(() =>
      Array(l)
        .fill(0)
        .map(() => Infinity)
    );
  const done = Array(l)
    .fill(0)
    .map(() =>
      Array(l)
        .fill(0)
        .map(() => false)
    );
  dist[0][0] = 0;
  let queue: QueueEl[] = [{ pos: [0, 0], dist: 0 }];
  while (queue.length !== 0) {
    queue = iterateDijkstra(i, dist, done, queue);
  }
  return dist[l - 1][l - 1];
}

export function part2(i: number[][]) {
  const l = i.length;
  const iExtended: number[][] = Array(l * 5)
    .fill(0)
    .map(() => []);
  for (let j = 0; j < l; j++)
    for (let k = 0; k < l; k++)
      for (let m = 0; m < 5; m++)
        for (let n = 0; n < 5; n++)
          iExtended[j + m * l][k + n * l] =
            i[j][k] + m + n > 9
              ? ((i[j][k] + m + n) % 10) + 1
              : i[j][k] + m + n;

  const lExtended = iExtended.length;
  const dist = Array(lExtended)
    .fill(0)
    .map(() =>
      Array(lExtended)
        .fill(0)
        .map(() => Infinity)
    );
  const done = Array(lExtended)
    .fill(0)
    .map(() =>
      Array(lExtended)
        .fill(0)
        .map(() => false)
    );
  dist[0][0] = 0;
  let queue: QueueEl[] = [{ pos: [0, 0], dist: 0 }];
  while (queue.length !== 0) {
    queue = iterateDijkstra(iExtended, dist, done, queue);
  }
  return dist[l - 1][l - 1];
}

if (import.meta.main) {
  const input = parseInput("input.txt");
  console.log("Part 1: ", part1(input));
  console.log("Part 2: ", part2(input));
}
