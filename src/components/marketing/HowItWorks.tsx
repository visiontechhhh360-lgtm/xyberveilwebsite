import SectionHeader from "@/components/common/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import StaggerGrid from "@/components/motion/StaggerGrid";

const steps = [
  {
    n: "01",
    title: "Download",
    desc: "Get the Xyber Veil app for your device. It’s built for fast, private internet access.",
  },
  {
    n: "02",
    title: "Connect",
    desc: "Hit one-click connect to establish a secure VPN tunnel with military-grade encryption.",
  },
  {
    n: "03",
    title: "Browse securely",
    desc: "Enjoy anonymous internet access, private browsing, and online privacy protection—every session.",
  },
];

export default function HowItWorks() {
  return (
    <Reveal as="section" className="pt-16 sm:pt-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How it works"
          title="From install to protected"
          subtitle="A straightforward flow designed for best VPN speed and privacy."
        />

        <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s, idx) => (
            <RevealItem
              key={s.n}
              className="group relative rounded-[1.7rem] glass-strong p-6 soft-shadow transition hover:-translate-y-1 hover:ring-1 hover:ring-cyan-300/25"
            >
              <div className="absolute right-5 top-5 rounded-2xl bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 ring-1 ring-white/10">
                {s.n}
              </div>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{s.desc}</p>
              {idx !== steps.length - 1 ? (
                <div className="pointer-events-none absolute -bottom-6 left-1/2 hidden h-12 w-12 -translate-x-1/2 rotate-45 bg-gradient-to-r from-cyan-300/10 via-sky-400/10 to-teal-300/10 opacity-0 transition group-hover:block group-hover:opacity-100 sm:block" />
              ) : null}
            </RevealItem>
          ))}
        </StaggerGrid>
      </div>
    </Reveal>
  );
}
