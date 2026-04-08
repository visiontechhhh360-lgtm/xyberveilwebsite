import { motion } from "framer-motion";
import { Monitor, Smartphone, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const platforms = [
  { icon: Monitor, name: "Windows", version: "v4.2.1", size: "48 MB", req: "Windows 10+", action: "Download .exe" },
  { icon: Smartphone, name: "Android", version: "v4.2.0", size: "32 MB", req: "Android 8.0+", action: "Google Play" },
  { icon: Smartphone, name: "iOS", version: "v4.2.0", size: "28 MB", req: "iOS 15+", action: "App Store" },
];

const steps = [
  { num: "01", title: "Download the App", desc: "Pick your platform above and download the installer. Takes under 30 seconds." },
  { num: "02", title: "Create Your Account", desc: "Open the app and sign up with just an email. No phone number required." },
  { num: "03", title: "Tap Connect", desc: "Hit the power button. You're invisible. The entire process takes under 60 seconds." },
];

const DownloadPage = () => (
  <Layout>
    <section className="py-28">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-20">
          <span className="font-display text-[10px] tracking-[0.4em] text-primary/60 uppercase block mb-4">DOWNLOAD</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Get Xyber Veil on
            <br />
            <span className="text-primary glow-text">Every Device</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            One account protects your entire digital life. Install in under a minute.
          </p>
        </AnimatedSection>

        {/* Platform cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-28">
          {platforms.map((p, i) => (
            <AnimatedSection key={p.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="glass rounded-2xl p-6 text-center group hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(174,72%,46%,0.15)] transition-all duration-300">
                    <p.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-sm font-bold tracking-wider mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-[10px] text-muted-foreground mb-1">{p.version} · {p.size}</p>
                  <p className="text-[10px] text-muted-foreground mb-4">{p.req}</p>
                  <Button size="sm" variant="outline" className="w-full text-[10px] font-display tracking-wider border-primary/30 hover:bg-primary/10 hover:border-primary/60 group/btn">
                    <ArrowDown className="mr-1.5 h-3 w-3 transition-transform group-hover/btn:translate-y-0.5" />
                    {p.action}
                  </Button>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Setup steps */}
        <AnimatedSection className="text-center mb-14">
          <span className="font-display text-[10px] tracking-[0.4em] text-primary/60 uppercase block mb-4">SETUP</span>
          <h2 className="font-display text-2xl md:text-4xl font-bold">
            Protected in <span className="text-primary">60 Seconds</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <AnimatedSection key={s.num} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-8 text-center group hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <span className="font-display text-4xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">{s.num}</span>
                  <h3 className="font-display text-sm font-bold tracking-wider mt-3 mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors duration-300">{s.desc}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default DownloadPage;
