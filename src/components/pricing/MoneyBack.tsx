import SectionHeader from "@/components/common/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import StaggerGrid from "@/components/motion/StaggerGrid";
import Button from "@/components/ui/Button";

export default function MoneyBack() {
  return (
    <Reveal as="section" className="pt-16 sm:pt-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Risk-free"
          title="30-day money-back guarantee"
          subtitle="Try Xyber Veil with confidence. If it does not meet your expectations, request a refund within 30 days."
        />

        <StaggerGrid className="mt-10 grid gap-4 lg:grid-cols-3">
          <RevealItem className="lg:col-span-2 rounded-[1.8rem] glass-strong p-6 ring-1 ring-white/10">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 1V23"
                    stroke="rgba(45,212,191,0.95)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M17 5L7 19"
                    stroke="rgba(34,211,238,0.9)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-white/75">
                  Transparent UX is part of privacy protection. This guarantee section is
                  built for conversion and clarity.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { k: "No hidden steps", v: "Request within 30 days" },
                    { k: "Fast resolution", v: "Clear refund workflow UI" },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                        {row.k}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white/85">{row.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealItem>

          <RevealItem className="rounded-[1.8rem] glass-strong p-6 ring-1 ring-white/10">
            <p className="text-sm font-semibold text-white/85">Ready to start?</p>
            <p className="mt-2 text-sm text-white/70">
              Get private browsing and anonymous internet access immediately.
            </p>
            <div className="mt-5">
              <Button href="/plans/yearly/details">Get Started</Button>
            </div>
          </RevealItem>
        </StaggerGrid>
      </div>
    </Reveal>
  );
}
