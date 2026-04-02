import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
};

function baseClasses(variant: Variant) {
  switch (variant) {
    case "secondary":
      return "glass-strong glow-ring hover:scale-[1.02] shadow-[0_0_0_1px_rgba(45,212,191,0.22),0_0_28px_rgba(45,212,191,0.10)]";
    case "ghost":
      return "glass hover:bg-white/5 hover:ring-1 hover:ring-cyan-300/25 hover:shadow-[0_0_28px_rgba(45,212,191,0.08)]";
    case "primary":
    default:
      return "relative bg-gradient-to-r from-cyan-300/20 via-sky-400/20 to-teal-300/20 glow-ring hover:scale-[1.02] shadow-[0_0_0_1px_rgba(45,212,191,0.22),0_0_42px_rgba(45,212,191,0.12)]";
  }
}

export default function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className,
}: Props) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition",
    "ring-1 ring-white/10",
    baseClasses(variant),
    "disabled:cursor-not-allowed disabled:opacity-60",
    className ?? "",
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}

