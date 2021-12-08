import { inputPath } from "./utils.ts"
import "https://deno.land/x/dotenv/load.ts"

async function downloadInput(day: string) {
  if (Deno.args.length !== 1) {
    console.error("You must pass the day as an argument!")
    return 1
  }
  const url = `https://adventofcode.com/2021/day/${day}/input`
  const headers = new Headers({
    Cookie: `session=${Deno.env.get("AUTH_COOKIE")}`,
  })
  const data = await fetch(url, { headers }).then((r) => r.text())
  const path =
    Number(day) < 9
      ? inputPath(import.meta.url, `0${day}`)
      : inputPath(import.meta.url, `${day}`)
  Deno.mkdirSync(path)
  Deno.writeTextFile(`${path}/input.txt`, data)
}

if (Deno.args.length !== 1)
  console.error("You must pass the day as the only argument!")
else downloadInput(Deno.args[0])
