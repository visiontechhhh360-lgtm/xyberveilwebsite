import { motion } from "framer-motion";
import { Eye, Globe, Lock, Users, Award } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const values = [
  { icon: Eye, title: "Radical Transparency", desc: "Open-source clients, public audits, and a privacy policy written in plain English." },
  { icon: Lock, title: "Security Obsession", desc: "Our engineering team includes former intelligence analysts and cryptography PhDs." },
  { icon: Globe, title: "Borderless Access", desc: "Information should flow freely. We build tools that make censorship irrelevant." },
  { icon: Users, title: "User Sovereignty", desc: "You own your data. We can't read it, sell it, or hand it over — by design." },
];

const About = () => (
  <Layout>
    <section className="py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <AnimatedSection className="text-center mb-20">
          <span className="font-display text-[10px] tracking-[0.4em] text-primary/60 uppercase block mb-4">OUR STORY</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Privacy is a
            <br />
            <span className="text-primary glow-text">Human Right</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Xyber Veil exists because we believe no government, corporation, or hacker 
            should have unchecked access to your digital life.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="glass rounded-2xl p-10 md:p-14 mb-20 relative overflow-hidden group hover:border-primary/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-60 h-60 bg-primary/[0.03] rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-bold tracking-wider">The Origin</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors duration-300">
                <p>
                  A group of Swiss cryptographers and privacy lawyers set out to solve a stubborn problem:
                  VPNs that felt slow, left privacy gaps, or quietly monetized user data.
                </p>
                <p>
                  They sketched the blueprint for Xyber Veil on a napkin — a VPN built on zero-knowledge
                  architecture, where even the company itself cannot see user traffic. No logs by design,
                  not just by policy.
                </p>
                <p>
                  That blueprint now protects a growing global community across dozens of countries.
                  The mission stays the same: make surveillance irrelevant.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="glass rounded-2xl p-7 h-full group hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(174,72%,46%,0.15)] transition-all duration-300">
                    <v.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-sm font-semibold tracking-wider mb-2 group-hover:text-primary transition-colors">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors duration-300">{v.desc}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
