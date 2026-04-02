import Link from "next/link";
import { downloadLinks } from "@/config/site";

const platforms = [
  {
    key: "android",
    ...downloadLinks.android,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="rgba(45,212,191,0.95)"
          d="M17.6 9.48l1.84-3.36c.11-.2 0-.45-.2-.56-.2-.11-.45 0-.56.2l-1.87 3.4c-1.35-.62-2.86-.97-4.45-.97-1.59 0-3.1.35-4.45.97L6.04 5.76c-.11-.2-.36-.31-.56-.2-.2.11-.31.36-.2.56l1.84 3.36C3.55 11.24 1 15.1 1 19.5h22c0-4.4-2.55-8.26-6.4-10.02zM7 16.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
        />
      </svg>
    ),
  },
  {
    key: "ios",
    ...downloadLinks.ios,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="rgba(34,211,238,0.95)"
          d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
        />
      </svg>
    ),
  },
  {
    key: "windows",
    ...downloadLinks.windows,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="rgba(56,189,248,0.95)"
          d="M3 5.5L10.5 4.5V11.5H3V5.5ZM11.5 4.3L21 3V11.5H11.5V4.3ZM3 12.5H10.5V19.5L3 18.5V12.5ZM11.5 12.5H21V21L11.5 19.7V12.5Z"
        />
      </svg>
    ),
  },
] as const;

type Props = {
  className?: string;
  /** Payment success: same links are mirrored to this address when email delivery is enabled */
  purchaserEmail?: string;
  /** Omit footer note on the dedicated Download page */
  compact?: boolean;
};

export default function DownloadAppGrid({
  className,
  purchaserEmail,
  compact,
}: Props) {
  return (
    <div className={className}>
      <div className="grid gap-4 sm:grid-cols-3">
        {platforms.map((p) => (
          <a
            key={p.key}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-[1.5rem] glass-strong p-5 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:ring-cyan-300/35"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                {p.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{p.title}</p>
                <p className="text-xs text-white/60">{p.subtitle}</p>
              </div>
            </div>
            <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-teal-200/90">
              Open store
              <span className="ml-1 inline-block transition group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </a>
        ))}
      </div>
      {!compact ? (
        purchaserEmail ? (
          <p className="mt-4 text-sm text-white/65">
            The same install links are sent to{" "}
            <span className="font-medium text-white/85">{purchaserEmail}</span>{" "}
            after checkout completes, so you can open them from your inbox
            anytime.
          </p>
        ) : (
          <p className="mt-4 text-sm text-white/65">
            Bookmark this page or use{" "}
            <Link
              href="/download"
              className="text-cyan-200 underline hover:text-white"
            >
              Download
            </Link>{" "}
            in the menu to return here later.
          </p>
        )
      ) : null}
    </div>
  );
}
