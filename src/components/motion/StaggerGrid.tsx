"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { staggerParent } from "@/components/motion/Reveal";

type Props = {
  className?: string;
  children: ReactNode;
};

/** Parent for `RevealItem` children — scroll-triggered stagger. */
export default function StaggerGrid({ className, children }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1, margin: "-40px 0px 0px 0px" }}
      variants={staggerParent}
    >
      {children}
    </motion.div>
  );
}
