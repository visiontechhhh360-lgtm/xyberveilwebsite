import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

import featureEncryption from "@/assets/feature-encryption.jpg";
import featureNologs from "@/assets/feature-nologs.jpg";
import featureGlobal from "@/assets/feature-global.jpg";
import featureSpeed from "@/assets/feature-speed.jpg";
import featureWifi from "@/assets/feature-wifi.jpg";
import featureDevices from "@/assets/feature-devices.jpg";
import featureKillswitch from "@/assets/feature-killswitch.jpg";
import featureSplit from "@/assets/feature-split.jpg";
import featureAutoconnect from "@/assets/feature-autoconnect.jpg";

const features = [
  {
    image: featureEncryption,
    title: "Military-Grade Encryption",
    desc: "Your traffic is wrapped in 256-bit AES — the same cipher that guards classified government intel. Even if intercepted, your data reads as pure noise.",
    stat: "256-bit",
    statLabel: "AES Cipher",
  },
  {
    image: featureNologs,
    title: "Strict No-Logs Policy",
    desc: "We architected our servers to physically prevent data retention. No connection timestamps, no browsing records, no IP trails. Independently audited annually.",
    stat: "0",
    statLabel: "Data Stored",
  },
  {
    image: featureGlobal,
    title: "50+ Server Locations",
    desc: "Hop between continents in milliseconds. Our bare-metal servers across 50+ countries ensure you always find a fast, nearby connection point.",
    stat: "50+",
    statLabel: "Countries",
  },
  {
    image: featureSpeed,
    title: "Blazing-Fast Throughput",
    desc: "Built on the WireGuard® protocol, Xyber Veil delivers up to 10 Gbps throughput. Stream 4K, game competitively, and download without throttling.",
    stat: "10 Gbps",
    statLabel: "Peak Speed",
  },
  {
    image: featureWifi,
    title: "Public Wi-Fi Armor",
    desc: "Coffee shops, airports, hotels — every open network is a threat vector. Our encrypted tunnel activates instantly, neutralizing man-in-the-middle attacks before they start.",
    stat: "100%",
    statLabel: "Leak Protection",
  },
  {
    image: featureDevices,
    title: "Every Device, One Shield",
    desc: "Windows, macOS, Android, iOS, Linux, routers — protect your entire ecosystem with a single subscription. Configs sync automatically across all platforms.",
    stat: "6+",
    statLabel: "Platforms",
  },
  {
    image: featureKillswitch,
    title: "Instant Kill Switch",
    desc: "If the VPN tunnel drops for even a fraction of a second, the kill switch severs all network traffic immediately. Zero bytes escape unencrypted.",
    stat: "<1ms",
    statLabel: "Response Time",
  },
  {
    image: featureSplit,
    title: "Smart Split Tunneling",
    desc: "Route banking through the VPN while streaming local content directly. Granular per-app routing gives you full control over what's protected and what's not.",
    stat: "Per-App",
    statLabel: "Routing",
  },
  {
    image: featureAutoconnect,
    title: "Auto-Connect Intelligence",
    desc: "Xyber Veil detects untrusted networks and activates protection automatically. Set your rules once — the app handles the rest silently in the background.",
    stat: "24/7",
    statLabel: "Always On",
  },
];

const Features = () => (
  <Layout>
    {/* Hero */}
    <section className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-medium mb-6 tracking-wider font-display">
            9 CORE TECHNOLOGIES
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Engineered for
            <br />
            <span className="text-primary glow-text">Absolute Privacy</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Every layer of Xyber Veil is purpose-built to keep you invisible. 
            Here's the technology that makes it possible.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* Alternating feature rows */}
    <section className="pb-24">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          {features.map((f, i) => {
            const isEven = i % 2 === 0;
            return (
              <AnimatedSection key={f.title} delay={0.05}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="glass rounded-2xl overflow-hidden group hover:glow-border transition-all duration-500"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? "" : "lg:[direction:rtl]"}`}>
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto">
                      <img
                        src={f.image}
                        alt={f.title}
                        loading="lazy"
                        width={640}
                        height={640}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background/60" />
                      
                      {/* Stat overlay */}
                      <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                        <div className="glass rounded-xl px-4 py-3 backdrop-blur-md">
                          <p className="font-display text-2xl font-bold text-primary leading-none">{f.stat}</p>
                          <p className="text-[10px] text-muted-foreground tracking-wider uppercase mt-1">{f.statLabel}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`p-8 lg:p-12 flex flex-col justify-center ${isEven ? "" : "lg:[direction:ltr]"}`}>
                      <span className="font-display text-[10px] tracking-[0.3em] text-primary/60 uppercase mb-3">
                        0{i + 1} / 09
                      </span>
                      <h3 className="font-display text-xl md:text-2xl font-bold tracking-wide mb-4 group-hover:text-primary transition-colors duration-300">
                        {f.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                        {f.desc}
                      </p>
                      <div className="mt-6 h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent w-0 group-hover:w-full transition-all duration-700" />
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  </Layout>
);

export default Features;
