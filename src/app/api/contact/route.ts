import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { z } from "zod";
import { appendToJsonArrayFile } from "@/lib/json-db";
import { isRateLimited } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email().max(254),
  message: z.string().min(10).max(1000),
});

function getClientIp(headers: Headers) {
  const xff = headers.get("x-forwarded-for");
  if (!xff) return "unknown";
  // In proxies, x-forwarded-for can be a comma-separated list; take the first.
  return xff.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: Request) {
  const ip = getClientIp(req.headers);
  if (isRateLimited(`contact:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait and try again." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid contact form input." },
      { status: 400 }
    );
  }

  const submission = {
    id: crypto.randomUUID(),
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
    message: parsed.data.message,
    createdAt: new Date().toISOString(),
  };

  await appendToJsonArrayFile(
    "contact-submissions.json",
    () => submission,
    { maxLength: 2000 }
  );

  return NextResponse.json({ ok: true });
}

