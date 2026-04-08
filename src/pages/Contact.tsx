import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { toast } from "sonner";

const channels = [
  { icon: Mail, title: "Email Us", detail: "support@xyberveil.com", sub: "We respond within 4 hours" },
  { icon: MessageCircle, title: "Live Chat", detail: "Available 24/7", sub: "Instant help from real humans" },
  { icon: Clock, title: "Response Time", detail: "< 4 hours", sub: "Average across all channels" },
];

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll get back to you within 4 hours.");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <Layout>
      <section className="py-28">
        <div className="container mx-auto px-4 max-w-5xl">
          <AnimatedSection className="text-center mb-16">
            <span className="font-display text-[10px] tracking-[0.4em] text-primary/60 uppercase block mb-4">SUPPORT</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              We're Here
              <br />
              <span className="text-primary glow-text">To Help</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Privacy questions, technical issues, or just saying hi — we're listening.
            </p>
          </AnimatedSection>

          {/* Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {channels.map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="glass rounded-2xl p-6 text-center group hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(174,72%,46%,0.15)] transition-all duration-300">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-sm font-bold tracking-wider mb-1 group-hover:text-primary transition-colors">{c.title}</h3>
                  <p className="text-sm font-medium text-foreground/80">{c.detail}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{c.sub}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Form */}
          <AnimatedSection>
            <div className="glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto relative overflow-hidden group hover:border-primary/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/[0.03] rounded-full blur-[60px] pointer-events-none" />
              <div className="relative z-10">
                <h2 className="font-display text-lg font-bold tracking-wider mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Name</Label>
                      <Input placeholder="Your name" required className="mt-1.5 bg-secondary/30 border-border/50 focus:border-primary/50" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <Input type="email" placeholder="you@email.com" required className="mt-1.5 bg-secondary/30 border-border/50 focus:border-primary/50" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Subject</Label>
                    <Input placeholder="How can we help?" required className="mt-1.5 bg-secondary/30 border-border/50 focus:border-primary/50" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Message</Label>
                    <Textarea placeholder="Describe your issue or question..." rows={5} required className="mt-1.5 bg-secondary/30 border-border/50 focus:border-primary/50 resize-none" />
                  </div>
                  <Button type="submit" className="w-full font-display text-xs tracking-wider glow-box h-12 group/btn" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
