import { inputPath } from "../utils.ts";

interface Packet {
  header: { version: number; id: number };
}

interface NumPacket extends Packet {
  number: number;
}

interface OpPacket extends Packet {
  packets: (OpPacket | NumPacket)[];
}

export function parseInput(file: string) {
  let input = "";
  Deno.readTextFileSync(inputPath(import.meta.url, file))
    .trim()
    .split("")
    .forEach((x) => {
      const number = parseInt(x, 16).toString(2);
      for (let j = 0; j < 4 - number.length; j++) input += "0";
      input += number;
    });
  return input;
}

function packetSplit(bits: string) {}

function parsePacket(bits: string) {
  if (parseInt(bits.slice(3, 6), 2) === 4) {
    const packet: NumPacket = {
      header: {
        version: parseInt(bits.slice(0, 3), 2),
        id: 4,
      },
      number: 0,
    };
    let binary = "";
    let pos = 0;
    while (pos === 0 || bits[6 + (pos - 1) * 5] !== "0") {
      binary += bits.slice(7 + pos * 5, 7 + pos * 5 + 4);
      ++pos;
    }
    packet.number = parseInt(binary, 2);
    return packet;
  }
  const packet: OpPacket = {
    header: {
      version: parseInt(bits.slice(0, 3), 2),
      id: parseInt(bits.slice(3, 6), 2),
    },
    packets: [],
  };
  if (bits.slice(6, 7) === "0") {
    const subPacketsLength = parseInt(bits.slice(7, 22));
  }
}

export function part1(i: string) {
  return parsePacket(i);
}

if (import.meta.main) {
  const input = parseInput("input.test1.txt");
  console.log("Part 1: ", part1(input));
}
