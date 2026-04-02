"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Msg = { id: string; from: "user" | "agent"; text: string };

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function LiveChatWidget() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m1",
      from: "agent",
      text: "Hi! I'm your Xyber Veil support assistant. Ask about secure VPN setup or private browsing.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const placeholder = useMemo(
    () => "Type a message about secure VPN, private browsing, or fast VPN speed...",
    []
  );

  const send = async () => {
    const text = draft.trim();
    if (!text || sending) return;
    setDraft("");
    const userMsg: Msg = { id: uid(), from: "user", text };
    setMessages((m) => [...m, userMsg]);

    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = (await res.json().catch(() => null)) as
        | { reply?: string; error?: string }
        | null;

      const agentMsg: Msg = {
        id: uid(),
        from: "agent",
        text:
          data?.reply ??
          data?.error ??
          "I could not process that right now. Please ask again in a moment.",
      };
      setMessages((m) => [...m, agentMsg]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          from: "agent",
          text: "Connection issue. Please try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  return (
    <div className="rounded-[1.8rem] glass-strong p-6 ring-1 ring-white/10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white/85">Live chat</p>
          <p className="mt-1 text-xs text-white/60">Trained for Xyber Veil Q&A</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs font-semibold ring-1 ring-white/10">
          <span className="h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_16px_rgba(45,212,191,0.6)]" />
          Online
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-5 flex h-[220px] flex-col gap-3 overflow-auto rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={[
              "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ring-1",
              m.from === "user"
                ? "ml-auto bg-gradient-to-r from-cyan-300/15 via-sky-400/15 to-teal-300/15 ring-cyan-300/20"
                : "bg-white/5 ring-white/10",
            ].join(" ")}
          >
            <span className="font-semibold">
              {m.from === "user" ? "You" : "Support"}
            </span>
            <span className="block mt-1 text-white/75">{m.text}</span>
          </div>
        ))}
        {sending ? (
          <div className="ml-auto flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-transparent" />
            <span className="text-sm font-semibold text-white/70">
              Thinking
              <span className="ml-2 inline-flex items-center gap-1 align-middle">
                <span className="typing-dot" style={{ animationDelay: "0ms" }}>
                  .
                </span>
                <span className="typing-dot" style={{ animationDelay: "120ms" }}>
                  .
                </span>
                <span className="typing-dot" style={{ animationDelay: "240ms" }}>
                  .
                </span>
              </span>
            </span>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          className="w-full rounded-2xl bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 transition focus:ring-cyan-300/30"
          placeholder={placeholder}
          aria-label="Live chat message"
        />
        <button
          type="button"
          onClick={send}
          disabled={!draft.trim() || sending}
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300/20 via-sky-400/20 to-teal-300/20 px-4 py-3 text-sm font-semibold ring-1 ring-white/10 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Send
        </button>
      </div>
    </div>
  );
}

