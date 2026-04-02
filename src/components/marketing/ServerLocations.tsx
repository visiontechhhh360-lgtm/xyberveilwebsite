import Image from "next/image";
import SectionHeader from "@/components/common/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import StaggerGrid from "@/components/motion/StaggerGrid";
import { imageCdn } from "@/config/site";

const locations = [
  { code: "United States", abbr: "US", color: "from-cyan-300/20 to-sky-400/20" },
  { code: "Germany", abbr: "DE", color: "from-sky-400/20 to-teal-300/20" },
  { code: "Singapore", abbr: "SG", color: "from-teal-300/20 to-cyan-300/20" },
  { code: "Brazil", abbr: "BR", color: "from-cyan-300/15 via-sky-400/15 to-teal-300/15" },
];

export default function ServerLocations() {
  return (
    <Reveal as="section" className="pt-16 sm:pt-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Server locations"
          title="Global coverage for the fastest VPN"
          subtitle="Sample regions designed for low-latency routing and smooth browsing."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="relative min-h-[240px] overflow-hidden rounded-[1.8rem] ring-1 ring-white/10 sm:min-h-[300px]">
            <Image
              src={imageCdn.worldMap.src}
              alt={imageCdn.worldMap.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/90 via-[#070b14]/25 to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 text-sm font-medium text-white/85">
              Worldwide edge nodes—pick the route that fits your session.
            </p>
          </div>

          <StaggerGrid className="grid gap-4 sm:grid-cols-2">
            {locations.map((l) => (
              <RevealItem
                key={l.abbr}
                className="glass-strong rounded-[1.6rem] p-5 transition hover:-translate-y-1 hover:ring-1 hover:ring-cyan-300/25"
              >
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={[
                      "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-white/10",
                      l.color,
                    ].join(" ")}
                  >
                    <span className="text-sm font-extrabold tracking-widest text-white/90">
                      {l.abbr}
                    </span>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-2 ring-1 ring-white/10">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M7 7H17V17H7V7Z"
                        stroke="rgba(34,211,238,0.9)"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M5 10H19"
                        stroke="rgba(45,212,191,0.95)"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        opacity="0.9"
                      />
                      <path
                        d="M5 14H19"
                        stroke="rgba(255,255,255,0.75)"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        opacity="0.85"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="mt-4 text-base font-semibold">{l.code}</h3>
                <p className="mt-2 text-sm text-white/70">Fast secure VPN routes</p>
              </RevealItem>
            ))}
          </StaggerGrid>
        </div>
      </div>
    </Reveal>
  );
}
