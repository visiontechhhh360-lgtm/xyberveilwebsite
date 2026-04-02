import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { getPlanById } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Checkout - Xyber Veil VPN",
  description:
    "Confirm your VPN plan, account details, and billing summary before payment.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function pick(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : (v ?? "");
}

export default async function CheckoutPage({ searchParams }: Props) {
  const q = await searchParams;
  const planId = pick(q.plan);
  const name = pick(q.name);
  const email = pick(q.email);
  const country = pick(q.country);
  const selected = getPlanById(planId);

  if (!selected) {
    return (
      <main className="pb-12 pt-10 sm:pt-14">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[1.8rem] glass-strong p-8 ring-1 ring-white/10">
            <h1 className="text-2xl font-semibold">Missing plan details</h1>
            <p className="mt-3 text-sm text-white/70">
              Please choose a plan first.
            </p>
            <Link href="/pricing" className="mt-4 inline-block text-cyan-200 hover:underline">
              Go to pricing
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <Reveal as="main" className="pb-12 pt-10 sm:pt-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          <section className="lg:col-span-2 rounded-[1.8rem] glass-strong p-6 ring-1 ring-white/10">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Step 2 of 3
            </p>
            <h1 className="mt-3 text-3xl font-semibold">Checkout</h1>
            <p className="mt-2 text-sm text-white/70">
              Review account and order details before entering payment details.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-xs uppercase tracking-widest text-white/60">Full name</p>
                <p className="mt-2 text-sm font-semibold">{name || "-"}</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-xs uppercase tracking-widest text-white/60">Email</p>
                <p className="mt-2 text-sm font-semibold">{email || "-"}</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-xs uppercase tracking-widest text-white/60">Country</p>
                <p className="mt-2 text-sm font-semibold">{country || "-"}</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-xs uppercase tracking-widest text-white/60">Plan</p>
                <p className="mt-2 text-sm font-semibold">{selected.name}</p>
              </div>
            </div>

            <form action="/payment" className="mt-6">
              <input type="hidden" name="plan" value={selected.id} />
              <input type="hidden" name="name" value={name} />
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="country" value={country} />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300/20 via-sky-400/20 to-teal-300/20 px-6 py-3 text-sm font-semibold ring-1 ring-white/10 transition hover:scale-[1.02]"
              >
                Continue to Payment
              </button>
            </form>
          </section>

          <aside className="rounded-[1.8rem] glass p-6 ring-1 ring-white/10">
            <p className="text-sm font-semibold">Order summary</p>
            <p className="mt-2 text-lg font-semibold">{selected.name}</p>
            <p className="text-sm text-white/70">
              ${selected.price.toFixed(2)} {selected.period}
            </p>
            <p className="mt-4 text-xs text-white/60">
              Taxes and local charges may apply at payment.
            </p>
          </aside>
        </div>
      </div>
    </Reveal>
  );
}

