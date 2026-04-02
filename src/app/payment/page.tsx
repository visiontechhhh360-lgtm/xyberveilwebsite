import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import PaymentForm from "@/components/purchase/PaymentForm";
import { getPlanById } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Payment - Xyber Veil VPN",
  description: "Enter payment details to complete your Xyber Veil VPN purchase.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function pick(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : (v ?? "");
}

export default async function PaymentPage({ searchParams }: Props) {
  const q = await searchParams;
  const planId = pick(q.plan);
  const selected = getPlanById(planId);
  const name = pick(q.name);
  const email = pick(q.email);
  const country = pick(q.country);

  return (
    <Reveal as="main" className="pb-12 pt-10 sm:pt-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          <section className="lg:col-span-2 rounded-[1.8rem] glass-strong p-6 ring-1 ring-white/10">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Step 3 of 3
            </p>
            <h1 className="mt-3 text-3xl font-semibold">Payment details</h1>
            <p className="mt-2 text-sm text-white/70">
              Your transaction is protected by encrypted checkout flow (demo UI).
            </p>
            <div className="mt-6">
              <PaymentForm
                plan={planId}
                name={name}
                email={email}
                country={country}
              />
            </div>
          </section>
          <aside className="rounded-[1.8rem] glass p-6 ring-1 ring-white/10">
            <p className="text-sm font-semibold">Billing summary</p>
            <p className="mt-2 text-lg font-semibold">{selected?.name ?? "Selected plan"}</p>
            <p className="text-sm text-white/70">
              {selected ? `$${selected.price.toFixed(2)} ${selected.period}` : "N/A"}
            </p>
            <p className="mt-4 text-xs text-white/60">
              This payment form is a frontend demo flow. Connect Stripe, Razorpay, or PayPal for real transactions.
            </p>
          </aside>
        </div>
      </div>
    </Reveal>
  );
}

