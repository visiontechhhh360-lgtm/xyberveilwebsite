import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Sparkles, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$4.99",
    period: "/mo",
    desc: "Try Xyber Veil risk-free. Cancel anytime.",
    features: ["All 30+ server locations across 25+ countries", "Private VPN tunneling", "No-logs guarantee", "Anti-tracker tools", "5 simultaneous devices", "Email support"],
    popular: false,
  },
  {
    id: "yearly",
    name: "Annual",
    price: "$48.99",
    period: "/yr",
    billed: "Billed once per subscription term",
    savings: "Best value",
    desc: "Full privacy for less than paying month-by-month.",
    features: ["Everything in Monthly", "10 simultaneous devices", "Priority 24/7 support", "Dedicated IP option", "Stronger anti-tracker defaults"],
    popular: true,
  },
];

const Pricing = () => (
  <Layout>
    <section className="py-28">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-20">
          <span className="font-display text-[10px] tracking-[0.4em] text-primary/60 uppercase block mb-4">PRICING</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            One Price.
            <br />
            <span className="text-primary glow-text">Total Freedom.</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            No hidden fees. No bandwidth caps. No data harvesting. Two simple plans.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`glass rounded-2xl p-8 h-full flex flex-col relative overflow-hidden group transition-all duration-300 ${
                  plan.popular ? "glow-border border-primary/40" : "hover:border-primary/20"
                }`}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-display font-bold tracking-[0.2em] px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" /> BEST VALUE
                  </div>
                )}

                <div className="relative z-10 flex flex-col h-full">
                  {plan.savings && (
                    <span className="inline-flex self-start px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-display font-bold tracking-wider mb-4">
                      {plan.savings}
                    </span>
                  )}
                  {!plan.savings && <div className="h-[26px] mb-4" />}

                  <h3 className="font-display text-lg font-bold tracking-wider mb-1 group-hover:text-primary transition-colors">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{plan.desc}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                    {plan.billed && <p className="text-[11px] text-muted-foreground mt-1">{plan.billed}</p>}
                  </div>

                  <ul className="flex-1 space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground group-hover:text-foreground/70 transition-colors">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={`/checkout?plan=${plan.id}`}>
                    <Button
                      className={`w-full font-display text-xs tracking-wider h-12 group/btn ${
                        plan.popular ? "glow-box" : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.popular ? "Get Annual Plan" : "Choose Monthly"}
                      <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-14">
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">30-day money-back guarantee — no questions asked</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default Pricing;
