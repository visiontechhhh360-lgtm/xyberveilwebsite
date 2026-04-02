import SectionHeader from "@/components/common/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import StaggerGrid from "@/components/motion/StaggerGrid";

const badges = [
  {
    title: "Secure",
    desc: "Encrypted connections by design.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2L20 6V12C20 17 16.5 20 12 22C7.5 20 4 17 4 12V6L12 2Z"
          stroke="rgba(34,211,238,0.9)"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "Encrypted",
    desc: "Built for private internet access.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M7 7H17V17H7V7Z"
          stroke="rgba(45,212,191,0.95)"
          strokeWidth="1.6"
        />
        <path
          d="M9 10H15"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M9 13H13"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Privacy guaranteed",
    desc: "No-log policy messaging you can trust.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3L21 8V16C21 19 18.7 21 12 22C5.3 21 3 19 3 16V8L12 3Z"
          stroke="rgba(34,211,238,0.9)"
          strokeWidth="1.6"
        />
        <path
          d="M8.5 12.2L11 14.7L16 9.7"
          stroke="rgba(45,212,191,0.95)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function TrustBadges() {
  return (
    <Reveal as="section" className="pt-10 sm:pt-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Trust & assurance"
          title="Security you can feel"
          subtitle="Secure VPN protection, strong encryption, and privacy-first policies."
        />

        <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-3">
          {badges.map((b) => (
            <RevealItem
              key={b.title}
              className="glass-strong rounded-[1.6rem] p-6 ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-cyan-300/25"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                {b.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{b.desc}</p>
            </RevealItem>
          ))}
        </StaggerGrid>
      </div>
    </Reveal>
  );
}
