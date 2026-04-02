"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const remaining = useMemo(() => 1000 - form.message.length, [form.message.length]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (form.name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.message.trim().length < 10) {
      setError("Please write a message (at least 10 characters).");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!res.ok) {
        setError(data?.error ?? "Failed to send message. Try again.");
        return;
      }

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Network error. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[1.8rem] glass-strong p-6 ring-1 ring-white/10 sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-white/85">Name</span>
          <input
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 transition focus:ring-cyan-300/30"
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-white/85">Email</span>
          <input
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 transition focus:ring-cyan-300/30"
            placeholder="you@domain.com"
            autoComplete="email"
            required
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="flex items-center justify-between gap-3 text-sm font-semibold text-white/85">
          Message
          <span className="text-xs font-semibold text-white/55">
            {remaining} left
          </span>
        </span>
        <textarea
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value.slice(0, 1000) }))}
          className="mt-2 min-h-[140px] w-full resize-none rounded-2xl bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 transition focus:ring-cyan-300/30"
          placeholder="Tell us what you need: secure VPN setup, private browsing questions, or server routing for fast VPN speed."
          required
        />
      </label>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {error ? (
            <p className="text-sm font-semibold text-red-300">{error}</p>
          ) : null}
          {success ? (
            <p className="text-sm font-semibold text-emerald-300">
              Message received. We will get back to you shortly.
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300/20 via-sky-400/20 to-teal-300/20 px-5 py-3 text-sm font-semibold ring-1 ring-white/10 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
              Sending...
            </>
          ) : (
            "Send message"
          )}
        </button>
      </div>
    </form>
  );
}

