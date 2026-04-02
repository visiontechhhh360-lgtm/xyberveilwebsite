import fs from "node:fs/promises";
import path from "node:path";

function getDataDir() {
  // Next.js runs with the app root as cwd; keep data at project root /data.
  return path.join(process.cwd(), "data");
}

function getFilePath(fileName: string) {
  return path.join(getDataDir(), fileName);
}

async function ensureDataDir() {
  await fs.mkdir(getDataDir(), { recursive: true });
}

async function atomicWrite(filePath: string, contents: string) {
  const dir = path.dirname(filePath);
  const tmpPath = path.join(dir, `.${path.basename(filePath)}.${Date.now()}.tmp`);
  await fs.writeFile(tmpPath, contents, "utf8");
  await fs.rename(tmpPath, filePath);
}

export async function readJsonFile<T>(fileName: string, fallback: T): Promise<T> {
  const filePath = getFilePath(fileName);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJsonFile<T>(fileName: string, value: T): Promise<void> {
  await ensureDataDir();
  const filePath = getFilePath(fileName);
  const contents = JSON.stringify(value, null, 2);
  await atomicWrite(filePath, contents);
}

export async function appendToJsonArrayFile<T>(
  fileName: string,
  getItem: () => T,
  options?: { maxLength?: number }
): Promise<{ written: boolean }> {
  const maxLength = options?.maxLength;
  await ensureDataDir();
  const filePath = getFilePath(fileName);

  const current = await readJsonFile<T[]>(fileName, []);
  const next = [...current, getItem()];
  const trimmed = typeof maxLength === "number" ? next.slice(-maxLength) : next;

  await atomicWrite(filePath, JSON.stringify(trimmed, null, 2));
  return { written: true };
}

export { getFilePath };

