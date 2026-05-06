import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, CheckCircle, ArrowLeft, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";

const planData: Record<string, { name: string; price: string; period: string; desc: string }> = {
  monthly: { name: "Monthly", price: "$4.99", period: "/month", desc: "Billed monthly" },
  yearly: { name: "Annual", price: "$48.99", period: "/year", desc: "Billed once per subscription term" },
};

const Checkout = () => {
  const [params] = useSearchParams();
  const rawPlan = params.get("plan") || "yearly";
  const planId = rawPlan === "monthly" || rawPlan === "yearly" ? rawPlan : "yearly";
  const plan = planData[planId];
  const [step, setStep] = useState<"payment" | "success">("payment");
  const [payMethod, setPayMethod] = useState<"card" | "google" | "apple">("card");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 2000);
  };

  return (
    <Layout>
      <section className="py-28 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4 max-w-lg">
          <AnimatePresence mode="wait">
            {step === "payment" ? (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Link to="/pricing" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Back to Pricing
                </Link>

                <div className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.03] rounded-full blur-[50px] pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Lock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h1 className="font-display text-lg font-bold tracking-wider">Secure Checkout</h1>
                        <p className="text-[10px] text-muted-foreground">Secure encrypted checkout</p>
                      </div>
                    </div>

                    {/* Plan summary */}
                    <div className="bg-secondary/50 rounded-xl p-5 mb-8 flex items-center justify-between border border-border/30">
                      <div>
                        <p className="font-display text-sm font-bold tracking-wider">{plan.name} Plan</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{plan.desc}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-xl font-bold text-primary">{plan.price}</p>
                        <p className="text-[10px] text-muted-foreground">{plan.period.trim()}</p>
                      </div>
                    </div>

                    {/* Payment tabs */}
                    <div className="flex gap-2 mb-6">
                      {(["card", "google", "apple"] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setPayMethod(m)}
                          className={`flex-1 py-3 px-3 rounded-xl text-xs font-medium transition-all border ${
                            payMethod === m
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-primary/30 hover:text-foreground/70"
                          }`}
                        >
                          {m === "card" && "💳 Card"}
                          {m === "google" && "Google Pay"}
                          {m === "apple" && " Apple Pay"}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {payMethod === "card" ? (
                        <>
                          <div>
                            <Label className="text-xs text-muted-foreground">Email</Label>
                            <Input type="email" placeholder="you@email.com" required className="mt-1.5 bg-secondary/30 border-border/50 focus:border-primary/50" />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Card Number</Label>
                            <Input placeholder="4242 4242 4242 4242" required className="mt-1.5 bg-secondary/30 border-border/50 focus:border-primary/50" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs text-muted-foreground">Expiry</Label>
                              <Input placeholder="MM/YY" required className="mt-1.5 bg-secondary/30 border-border/50 focus:border-primary/50" />
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">CVC</Label>
                              <Input placeholder="123" required className="mt-1.5 bg-secondary/30 border-border/50 focus:border-primary/50" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-10 glass rounded-xl">
                          <CreditCard className="h-8 w-8 text-primary/40 mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">
                            {payMethod === "google" ? "Google Pay" : "Apple Pay"} will open in a secure window
                          </p>
                        </div>
                      )}

                      <Button type="submit" className="w-full font-display text-xs tracking-wider glow-box h-12 mt-2" disabled={loading}>
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Processing payment...
                          </span>
                        ) : (
                          `Pay ${plan.price}`
                        )}
                      </Button>

                      <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground pt-2">
                        <Shield className="h-3 w-3 text-primary/60" />
                        <span>Secured with end-to-end encryption</span>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="glass rounded-2xl p-12 md:p-16 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8"
                    >
                      <CheckCircle className="h-10 w-10 text-primary" />
                    </motion.div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 glow-text">You're Protected</h2>
                    <p className="text-muted-foreground mb-10 leading-relaxed max-w-sm mx-auto">
                      Your Xyber Veil subscription is active. Download the app and connect to start browsing invisibly.
                    </p>
                    <div className="flex flex-col gap-3">
                      <Link to="/download">
                        <Button className="w-full font-display text-xs tracking-wider glow-box h-12">
                          Download Xyber Veil
                        </Button>
                      </Link>
                      <Link to="/">
                        <Button variant="outline" className="w-full font-display text-xs tracking-wider border-primary/30 hover:bg-primary/10">
                          Back to Home
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
