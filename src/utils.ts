import { dirname } from "https://deno.land/std/path/mod.ts"

export function inputPath(importMetaUrl: string, filename: string) {
  return `${dirname(new URL(importMetaUrl).pathname)}/${filename}`
}
