type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="space-y-4 text-center">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
          {eyebrow}
        </p>
      ) : null}
      <div className="mx-auto h-px w-20 bg-gradient-to-r from-cyan-300/0 via-cyan-300/45 to-teal-300/0" />
      <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle ? (
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

