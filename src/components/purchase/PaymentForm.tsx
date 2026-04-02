"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  plan: string;
  name: string;
  email: string;
  country: string;
};

export default function PaymentForm({ plan, name, email, country }: Props) {
  const router = useRouter();
  const [cardName, setCardName] = useState(name);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (cardNumber.replace(/\s/g, "").length < 14) return setError("Card number looks invalid.");
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return setError("Use expiry in MM/YY format.");
    if (cvv.length < 3) return setError("CVV must be at least 3 digits.");
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));
    router.push(
      `/payment/success?plan=${encodeURIComponent(plan)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&country=${encodeURIComponent(country)}`
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-semibold text-white/85">Name on card</span>
        <input
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
          className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10 outline-none transition focus:ring-cyan-300/30"
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-white/85">Card number</span>
        <input
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
          placeholder="4242 4242 4242 4242"
          className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10 outline-none transition focus:ring-cyan-300/30"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-white/85">Expiry</span>
          <input
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
            placeholder="MM/YY"
            className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10 outline-none transition focus:ring-cyan-300/30"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-white/85">CVV</span>
          <input
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
            placeholder="123"
            className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10 outline-none transition focus:ring-cyan-300/30"
          />
        </label>
      </div>
      {error ? <p className="text-sm font-semibold text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={processing}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300/20 via-sky-400/20 to-teal-300/20 px-6 py-3 text-sm font-semibold ring-1 ring-white/10 transition hover:scale-[1.02] disabled:opacity-60"
      >
        {processing ? "Processing payment..." : "Pay now"}
      </button>
    </form>
  );
}

