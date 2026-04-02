"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { imageCdn } from "@/config/site";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const t = { duration: reduce ? 0 : 0.45, ease };

  return (
    <section className="relative overflow-hidden pt-14 sm:pt-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-6">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...t, delay: reduce ? 0 : 0 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 ring-1 ring-white/10"
            >
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-teal-300 shadow-[0_0_16px_rgba(45,212,191,0.6)]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Anonymous browsing and online privacy protection
              </p>
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...t, delay: reduce ? 0 : 0.08 }}
              className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.06]"
            >
              <span className="text-gradient">Ultimate Privacy</span>
              <span className="text-white"> with Xyber Veil VPN</span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...t, delay: reduce ? 0 : 0.16 }}
              className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
            >
              The secure VPN for private browsing, anonymous internet, and fast
              VPN performance. Military-grade encryption and the fastest VPN
              experience for streaming and daily use.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...t, delay: reduce ? 0 : 0.24 }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="/plans/yearly/details">Get Started</Button>
              <Button href="/pricing" variant="ghost">
                View Pricing
              </Button>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...t, delay: reduce ? 0 : 0.32 }}
              className="grid gap-3 sm:grid-cols-3"
            >
              {[
                { k: "Encryption", v: "Military-grade" },
                { k: "Network", v: "Global servers" },
                { k: "Privacy", v: "No-log policy" },
              ].map((stat) => (
                <div
                  key={stat.k}
                  className="glass rounded-2xl p-4 ring-1 ring-white/10 transition hover:ring-teal-300/30"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    {stat.k}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{stat.v}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reduce ? 0 : 0.65, ease }}
          >
            <div className="glass-strong soft-shadow relative overflow-hidden rounded-[2rem] p-1 ring-1 ring-teal-300/20 float-card">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem]">
                <Image
                  src={imageCdn.hero.src}
                  alt={imageCdn.hero.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/85 via-[#020617]/25 to-transparent" />
                <div aria-hidden className="scan-sweep" />
              </div>
              <div className="relative space-y-4 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                      Veil Tunnel
                    </p>
                    <p className="mt-1 text-xl font-semibold">
                      Status:{" "}
                      <span className="text-gradient">Protected</span>
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/5 px-4 py-2 text-right ring-1 ring-white/10">
                    <p className="text-xs text-white/65">Latency</p>
                    <p className="text-lg font-semibold tabular-nums">12 ms</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["US", "DE", "SG", "BR"].map((c) => (
                    <span
                      key={c}
                      className="rounded-xl bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/10 backdrop-blur-sm transition hover:scale-105 hover:ring-teal-300/35"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rounded-full bg-teal-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 -right-6 h-32 w-32 rounded-full bg-cyan-400/15 blur-3xl" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
