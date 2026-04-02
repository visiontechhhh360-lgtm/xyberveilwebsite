"use client";

import { RevealItem } from "@/components/motion/Reveal";
import StaggerGrid from "@/components/motion/StaggerGrid";
import Button from "@/components/ui/Button";

const plans = [
  {
    key: "trial",
    name: "Free Trial",
    price: "$0",
    period: "7 days",
    blurb: "Test the fastest VPN experience with secure VPN protection.",
    cta: { label: "Start Trial", href: "/plans/trial/details" },
    features: [
      "Military-grade encryption",
      "Anonymous internet access",
      "Global server recommendations",
      "Basic privacy dashboard",
    ],
    highlight: false,
  },
  {
    key: "monthly",
    name: "Monthly Plan",
    price: "$9.99",
    period: "per month",
    blurb: "Private browsing with flexible billing and great speed.",
    cta: { label: "Choose Monthly", href: "/plans/monthly/details" },
    features: [
      "Secure VPN tunnel on demand",
      "High-speed global servers",
      "One-click connect",
      "Cross-platform support",
    ],
    highlight: false,
  },
  {
    key: "yearly",
    name: "Yearly Plan",
    price: "$79.99",
    period: "per year",
    blurb: "Best value for fast VPN speed and long-term privacy.",
    cta: { label: "Get Yearly", href: "/plans/yearly/details" },
    features: [
      "Everything in Monthly",
      "Priority connection routing",
      "Streaming-optimized routes",
      "Extended privacy support",
    ],
    highlight: true,
  },
];

export default function PricingPlans() {
  return (
    <StaggerGrid className="mt-10 grid gap-4 lg:grid-cols-3">
      {plans.map((p) => (
        <RevealItem
          key={p.key}
          className={[
            "relative rounded-[1.8rem] glass-strong p-6 ring-1 transition card-hover",
            p.highlight
              ? "glow-ring ring-cyan-300/35 pulse-glow"
              : "hover:-translate-y-1 hover:ring-cyan-300/25",
          ].join(" ")}
        >
          {p.highlight ? (
            <div className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-cyan-300/30 via-sky-400/25 to-teal-300/25 px-4 py-2 text-xs font-semibold ring-1 ring-white/10">
              Best value
            </div>
          ) : null}

          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-white/70">{p.blurb}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold tracking-tight">{p.price}</p>
              <p className="text-xs text-white/60">{p.period}</p>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="rgba(45,212,191,0.95)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <Button href={p.cta.href} variant={p.highlight ? "primary" : "ghost"}>
              {p.cta.label}
            </Button>
          </div>
        </RevealItem>
      ))}
    </StaggerGrid>
  );
}
