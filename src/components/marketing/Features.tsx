import Image from "next/image";
import SectionHeader from "@/components/common/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import StaggerGrid from "@/components/motion/StaggerGrid";
import Container from "@/components/ui/Container";
import { imageCdn } from "@/config/site";

const features = [
  {
    title: "Military-grade encryption",
    desc: "End-to-end encryption that helps keep your traffic unreadable to prying eyes.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2L20 6V12C20 17 16.5 20 12 22C7.5 20 4 17 4 12V6L12 2Z"
          stroke="rgba(34,211,238,0.9)"
          strokeWidth="1.6"
        />
        <path
          d="M9.5 12.2L11.2 13.9L15.2 9.8"
          stroke="rgba(45,212,191,0.95)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "No-log policy",
    desc: "Designed to limit stored data, so your private browsing stays private.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 7H20"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M7 7V5C7 3.9 7.9 3 9 3H15C16.1 3 17 3.9 17 5V7"
          stroke="rgba(34,211,238,0.9)"
          strokeWidth="1.6"
        />
        <path
          d="M6.5 7.2C6.2 7.9 6 8.7 6 9.6V18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V9.6C18 8.7 17.8 7.9 17.5 7.2"
          stroke="rgba(45,212,191,0.95)"
          strokeWidth="1.6"
        />
        <path
          d="M9 12.2H15"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "High-speed global servers",
    desc: "Fast connections across regions for smooth streaming and low-latency browsing.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3V12L7 17"
          stroke="rgba(34,211,238,0.9)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 12C20 16.4 16.4 20 12 20C7.6 20 4 16.4 4 12"
          stroke="rgba(45,212,191,0.95)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M20 6C18.2 4.2 15.9 3.2 13.2 3.1"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "One-click connect",
    desc: "Get protected in seconds with a clean, guided connection flow.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 12H14"
          stroke="rgba(34,211,238,0.9)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M10 8L14 12L10 16"
          stroke="rgba(45,212,191,0.95)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 5C19.7 6.2 21 8.2 21 10.5C21 12.8 19.7 14.8 18 16"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Cross-platform support",
    desc: "Secure VPN apps built for mobile and desktop workflows.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M7 7H17"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M9 4H15C16.1 4 17 4.9 17 6V18C17 19.1 16.1 20 15 20H9C7.9 20 7 19.1 7 18V6C7 4.9 7.9 4 9 4Z"
          stroke="rgba(34,211,238,0.9)"
          strokeWidth="1.6"
        />
        <path
          d="M10 16H14"
          stroke="rgba(45,212,191,0.95)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <Reveal as="section" className="pt-16 sm:pt-20">
      <Container>
        <SectionHeader
          eyebrow="Designed for real privacy"
          title="Security that feels effortless"
          subtitle="Everything you need from a secure VPN: private internet access, anonymous browsing, and fast VPN performance."
        />

        <div className="relative mt-10 overflow-hidden rounded-[1.8rem] ring-1 ring-white/10">
          <div className="relative aspect-[21/9] min-h-[200px] w-full sm:min-h-[240px]">
            <Image
              src={imageCdn.featureSecurity.src}
              alt={imageCdn.featureSecurity.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1152px"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070b14]/95 via-[#070b14]/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 py-8 sm:px-10">
              <p className="max-w-md text-xs font-semibold uppercase tracking-widest text-teal-200/90">
                Encryption-first design
              </p>
              <p className="mt-3 max-w-lg text-lg font-semibold leading-snug sm:text-xl">
                Your traffic deserves audit-grade protection—without slowing you down.
              </p>
            </div>
          </div>
        </div>

        <StaggerGrid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <RevealItem
              key={f.title}
              className="group rounded-[1.6rem] glass-strong p-5 transition hover:-translate-y-1 hover:ring-1 hover:ring-cyan-300/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  {f.icon}
                </div>
              </div>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {f.desc}
              </p>
            </RevealItem>
          ))}
        </StaggerGrid>
      </Container>
    </Reveal>
  );
}

