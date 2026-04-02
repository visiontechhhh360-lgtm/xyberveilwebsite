import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { getPlanById } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Plan Details - Xyber Veil VPN",
  description:
    "Review your selected Xyber Veil VPN plan and enter account details before checkout.",
};

type Props = {
  params: Promise<{ plan: string }>;
};

export default async function PlanDetailsPage({ params }: Props) {
  const { plan } = await params;
  const selected = getPlanById(plan);
  if (!selected) notFound();

  return (
    <Reveal as="main" className="pb-12 pt-10 sm:pt-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          <section className="lg:col-span-2 rounded-[1.8rem] glass-strong p-6 ring-1 ring-white/10">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Step 1 of 3
            </p>
            <h1 className="mt-3 text-3xl font-semibold">
              <span className="text-gradient">{selected.name}</span> details
            </h1>
            <p className="mt-3 text-sm text-white/70">{selected.description}</p>

            <form action="/checkout" className="mt-6 space-y-4">
              <input type="hidden" name="plan" value={selected.id} />
              <label className="block">
                <span className="text-sm font-semibold text-white/85">Full name</span>
                <input
                  name="name"
                  required
                  className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10 outline-none transition focus:ring-cyan-300/30"
                  placeholder="John Doe"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-white/85">Email address</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10 outline-none transition focus:ring-cyan-300/30"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-white/85">Country</span>
                <input
                  name="country"
                  required
                  className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10 outline-none transition focus:ring-cyan-300/30"
                  placeholder="United States"
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300/20 via-sky-400/20 to-teal-300/20 px-6 py-3 text-sm font-semibold ring-1 ring-white/10 transition hover:scale-[1.02]"
              >
                Continue to Checkout
              </button>
            </form>
          </section>

          <aside className="rounded-[1.8rem] glass p-6 ring-1 ring-white/10">
            <p className="text-sm font-semibold">Plan summary</p>
            <p className="mt-2 text-lg font-semibold">{selected.name}</p>
            <p className="mt-1 text-sm text-white/70">
              ${selected.price.toFixed(2)} {selected.period}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {selected.features.map((f) => (
                <li key={f}>- {f}</li>
              ))}
            </ul>
            <Link href="/pricing" className="mt-5 inline-block text-sm text-cyan-200 hover:underline">
              Change plan
            </Link>
          </aside>
        </div>
      </div>
    </Reveal>
  );
}

