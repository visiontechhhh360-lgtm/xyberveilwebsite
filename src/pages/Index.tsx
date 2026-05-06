import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, Eye, Lock, Star, ArrowRight, CheckCircle, Ban, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import pillarEncryption from "@/assets/pillar-encryption.jpg";
import pillarNologs from "@/assets/pillar-nologs.jpg";
import pillarServers from "@/assets/pillar-servers.jpg";
import pillarSpeed from "@/assets/pillar-speed.jpg";
import pillarDns from "@/assets/pillar-dns.jpg";
import pillarUptime from "@/assets/pillar-uptime.jpg";

const highlights = [
  { icon: Lock, title: "Private Tunneling", desc: "Your connection is shielded on untrusted networks so your activity stays yours.", img: pillarEncryption },
  { icon: Eye, title: "Audited No-Logs Policy", desc: "Independently verified — we can't see what you do online.", img: pillarNologs },
  { icon: Globe, title: "30+ Server Locations", desc: "Bare-metal coverage across 25+ countries and every major continent.", img: pillarServers },
  { icon: Zap, title: "WireGuard® Protocol", desc: "Next-gen tunneling for speeds up to 10 Gbps.", img: pillarSpeed },
  { icon: Ban, title: "Anti-Tracker Tools", desc: "Cut down cross-site trackers and fingerprinting noise while you browse.", img: pillarDns },
  { icon: Gauge, title: "99.99% Uptime", desc: "Redundant infrastructure that never sleeps.", img: pillarUptime },
];

const testimonials = [
  { name: "Alex R.", role: "Security Researcher", text: "I've stress-tested dozens of VPNs. Xyber Veil held up under hardening checks and kept my traffic where it belonged.", rating: 5 },
  { name: "Sarah M.", role: "Digital Nomad", text: "Connecting from Bali, Tokyo, Lisbon — always fast, always stable. This is what a VPN should feel like.", rating: 5 },
  { name: "James K.", role: "Software Engineer", text: "The WireGuard implementation is flawless. Sub-10ms overhead even on transcontinental routes. Impressive.", rating: 5 },
];

const stats = [
  { value: "2M+", label: "Protected Users" },
  { value: "25+", label: "Countries" },
  { value: "30+", label: "Server Locations" },
  { value: "0", label: "Logs Stored" },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >



          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.95]">
            Your Internet.
            <br />
            <span className="text-primary glow-text">Invisible.</span>
            <br />
            <span className="text-primary/70">Untraceable.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
            Private tunneling meets bleeding-edge speed.
            Reclaim your digital privacy in one click.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="font-display text-sm tracking-wider px-10 h-13 glow-box group">
                Get Protected Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="font-display text-sm tracking-wider px-10 h-13 border-primary/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                Explore Features
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Ambient orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />
    </section>

    {/* Stats bar */}
    <section className="border-y border-border/20 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/20">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.08}>
              <div className="py-10 text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">{s.value}</p>
                <p className="text-xs text-muted-foreground tracking-wider uppercase">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Core Highlights */}
    <section className="py-28">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="font-display text-[10px] tracking-[0.4em] text-primary/60 uppercase block mb-4">WHY XYBER VEIL</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
            Security Without
            <br />
            <span className="text-primary">Compromise</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Six pillars of protection engineered from the ground up.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="glass rounded-2xl overflow-hidden h-full group hover:border-primary/30 transition-all duration-300 cursor-default relative"
              >
                <div className="h-36 overflow-hidden">
                  <img src={f.img} alt={f.title} loading="lazy" width={512} height={512} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 h-36 bg-gradient-to-b from-transparent to-card/90" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10 p-7 pt-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(174,72%,46%,0.15)] transition-all duration-300 -mt-10">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-sm font-semibold tracking-wider mb-2 text-foreground group-hover:text-primary transition-colors duration-300">{f.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">{f.desc}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Trust Badges */}
    <section className="py-12 border-y border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {["No-Logs Certified", "Anti-Tracker Tools", "30-Day Money Back", "24/7 Live Support", "25+ Countries", "30+ Locations"].map((b) => (
            <div key={b} className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-28">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="font-display text-[10px] tracking-[0.4em] text-primary/60 uppercase block mb-4">REAL FEEDBACK</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            What Our Users <span className="text-primary">Say</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-7 h-full group hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground/70 mb-6 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-display text-xs text-primary font-bold">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-28">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="glass rounded-3xl p-12 md:p-20 text-center glow-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-primary/[0.02] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
                Ready to Disappear?
              </h2>
              <p className="text-muted-foreground mb-10 max-w-md mx-auto text-lg">
                One click between you and complete digital privacy. Start your risk-free trial today.
              </p>
              <Link to="/pricing">
                <Button size="lg" className="font-display text-sm tracking-wider px-12 h-13 glow-box group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default Index;
