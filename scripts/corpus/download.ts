// Downloads for the corpus build. They are cached, never executed, and only ever parsed.
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const sha256 = (data: Uint8Array) => new Bun.CryptoHasher("sha256").update(data).digest("hex");

/**
 * The local path of `url`, downloading it to `path` first if needed. With `pin`, the file must have
 * that sha256, whether cached or fresh: an upstream change fails the build instead of slipping in.
 */
export async function download(url: string, path: string, pin?: string): Promise<string> {
  if (existsSync(path)) {
    if (pin && sha256(readFileSync(path)) !== pin)
      throw new Error(`${path}: sha256 differs from the pin ${pin}; delete it to download again`);
    return path;
  }
  console.log(`downloading ${url}`);
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  const data = new Uint8Array(await r.arrayBuffer());
  const got = sha256(data);
  if (pin && got !== pin) throw new Error(`${url}: sha256 ${got} differs from the pin ${pin}`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(`${path}.part`, data);
  renameSync(`${path}.part`, path);
  return path;
}
