import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { getPlanById } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Payment Success - Xyber Veil VPN",
  description: "Your Xyber Veil plan is activated successfully.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function pick(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : (v ?? "");
}

export default async function PaymentSuccessPage({ searchParams }: Props) {
  const q = await searchParams;
  const plan = getPlanById(pick(q.plan));
  const name = pick(q.name);
  const email = pick(q.email);

  return (
    <Reveal as="main" className="pb-12 pt-10 sm:pt-14">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] glass-strong p-8 ring-1 ring-white/10 soft-shadow">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/20 ring-1 ring-emerald-300/40">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M20 6L9 17L4 12" stroke="rgba(52,211,153,0.95)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="mt-5 text-3xl font-semibold">Payment successful</h1>
          <p className="mt-3 text-sm text-white/75">
            Thank you {name || "there"}. Your {plan?.name ?? "selected"} plan is now confirmed for {email || "your email"}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className="rounded-2xl bg-gradient-to-r from-cyan-300/20 via-sky-400/20 to-teal-300/20 px-5 py-3 text-sm font-semibold ring-1 ring-white/10 transition hover:scale-[1.02]">
              Go to Home
            </Link>
            <Link href="/contact" className="rounded-2xl glass px-5 py-3 text-sm font-semibold ring-1 ring-white/10 transition hover:scale-[1.02]">
              Contact Support
            </Link>
          </div>
        </section>
      </div>
    </Reveal>
  );
}

