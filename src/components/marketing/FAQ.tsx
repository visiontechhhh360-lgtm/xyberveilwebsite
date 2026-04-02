"use client";

import { useState } from "react";
import SectionHeader from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

const items = [
  {
    q: "What is a VPN?",
    a: "A VPN (Virtual Private Network) creates an encrypted connection between your device and a server, helping protect your online privacy protection. With a secure VPN, your private browsing traffic is shielded, enabling anonymous browsing and private internet access.",
  },
  {
    q: "Is Xyber Veil safe?",
    a: "Xyber Veil is designed as a secure VPN with military-grade encryption and privacy-first architecture. It focuses on anonymous internet access and safer browsing, built to reduce exposure on public Wi-Fi and everyday networks.",
  },
  {
    q: "Does it keep logs?",
    a: "We market a no-log policy. This site demonstrates the policy and the UX around privacy, with backend endpoints designed for secure VPN form handling and protected sessions. For production deployments, you should also align implementation with your formal privacy policy and audits.",
  },
  {
    q: "Can I use it for streaming?",
    a: "For streaming, you want a fast VPN with stable global server routing. Xyber Veil is designed to deliver high-speed performance and smooth connections so you can browse and stream with private browsing protection.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <Reveal as="section" className="pt-16 sm:pt-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions, answered"
          subtitle="Straight answers about secure VPN protection, privacy, logs, and streaming."
        />

        <div className="mt-10 rounded-[1.8rem] glass-strong ring-1 ring-white/10">
          {items.map((it, idx) => {
            const open = idx === openIdx;
            return (
              <div key={it.q} className="border-b border-white/10 last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/5"
                  onClick={() => setOpenIdx(open ? -1 : idx)}
                  aria-expanded={open}
                >
                  <span className="text-sm font-semibold sm:text-base">
                    {it.q}
                  </span>
                  <span
                    className={[
                      "inline-flex h-9 w-9 items-center justify-center rounded-xl ring-1 ring-white/10 transition",
                      open ? "bg-white/5 glow-ring" : "bg-white/0",
                    ].join(" ")}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M12 5V19"
                        stroke="rgba(255,255,255,0.85)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{
                          transformOrigin: "12px 12px",
                          transform: open ? "rotate(90deg)" : "rotate(0deg)",
                          transition: "transform 180ms ease",
                        }}
                      />
                      <path
                        d="M5 12H19"
                        stroke="rgba(45,212,191,0.9)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{
                          opacity: open ? 0 : 1,
                          transition: "opacity 180ms ease",
                        }}
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={[
                    "overflow-hidden px-6 transition-all duration-300",
                    open ? "max-h-[260px] pb-5 opacity-100" : "max-h-0 pb-0 opacity-0",
                  ].join(" ")}
                >
                  <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                    {it.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

