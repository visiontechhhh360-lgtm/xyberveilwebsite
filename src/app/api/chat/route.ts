import { NextResponse } from "next/server";
import { z } from "zod";
import { answerXyberVeilQuestion } from "@/lib/chat-knowledge";
import { isRateLimited } from "@/lib/rate-limit";

const schema = z.object({
  message: z.string().min(1).max(500),
});

function getClientIp(headers: Headers) {
  const xff = headers.get("x-forwarded-for");
  if (!xff) return "unknown";
  return xff.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: Request) {
  const ip = getClientIp(req.headers);
  if (isRateLimited(`chat:${ip}`, 30, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many chat requests. Please wait a bit." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message." }, { status: 400 });
  }

  const reply = answerXyberVeilQuestion(parsed.data.message);
  return NextResponse.json({ reply });
}

