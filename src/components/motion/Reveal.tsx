"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ElementType, type ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export type RevealTag = "section" | "main" | "div" | "aside";

type Props = {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
  delay?: number;
};

const motionMap = {
  section: motion.section,
  main: motion.main,
  div: motion.div,
  aside: motion.aside,
} as const;

/**
 * Scroll-triggered reveal with reduced-motion fallback.
 */
export function Reveal({
  children,
  className,
  as = "section",
  delay = 0,
}: Props) {
  const reduceMotion = useReducedMotion();
  const Component = motionMap[as] as ElementType;

  if (reduceMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12, margin: "-64px 0px 0px 0px" }}
      variants={fadeUp}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Staggered child inside a parent motion container — use with staggerParentVariants. */
export function RevealItem({ children, className, delay = 0 }: ItemProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};
