import Image from "next/image";
import SectionHeader from "@/components/common/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import StaggerGrid from "@/components/motion/StaggerGrid";
import { imageCdn } from "@/config/site";

const testimonials = [
  {
    name: "Maya R.",
    role: "Streamer",
    quote:
      "Xyber Veil feels fast. Private browsing is smooth and the one-click connect is exactly what I needed.",
    rating: 5,
  },
  {
    name: "Jordan K.",
    role: "Remote worker",
    quote:
      "Strong encryption and a clean experience. I use it daily for anonymous browsing and online privacy protection.",
    rating: 5,
  },
  {
    name: "Aisha S.",
    role: "Privacy-minded",
    quote:
      "Feels trustworthy. The UI makes the secure VPN connection effortless, and I love the no-log policy messaging.",
    rating: 4,
  },
  {
    name: "Carlos P.",
    role: "Frequent traveler",
    quote:
      "Consistent performance across servers. Fast VPN speeds help me stay connected anywhere without sacrificing privacy.",
    rating: 5,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < rating;
        return (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={filled ? "rgba(45,212,191,0.95)" : "rgba(255,255,255,0.15)"}
            aria-hidden
          >
            <path d="M12 2L15 9L22 9L16.5 13.6L18.8 20.8L12 16.6L5.2 20.8L7.5 13.6L2 9H9L12 2Z" />
          </svg>
        );
      })}
    </div>
  );
}

export default function Testimonials() {
  return (
    <Reveal as="section" className="pt-16 sm:pt-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Loved by everyday users"
          title="Privacy that delivers"
          subtitle="Real feedback focused on secure VPN speed, anonymous browsing, and online privacy protection."
        />

        <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => {
            const face = imageCdn.faces[i % imageCdn.faces.length]!;
            return (
              <RevealItem
                key={t.name}
                className="glass-strong rounded-[1.7rem] p-6 transition hover:-translate-y-1 hover:ring-1 hover:ring-cyan-300/25"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15">
                    <Image
                      src={face.src}
                      alt={`${t.name} — ${face.alt}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <Stars rating={t.rating} />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/78">
                  {"\""}
                  {t.quote}
                  {"\""}
                </p>
                <div className="mt-5">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-white/60">{t.role}</p>
                </div>
              </RevealItem>
            );
          })}
        </StaggerGrid>
      </div>
    </Reveal>
  );
}
