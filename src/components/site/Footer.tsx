import Link from "next/link";
import { footerLegalLinks, footerQuickLinks, site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="pb-10 pt-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-strong soft-shadow rounded-2xl px-5 py-6 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-md">
              <div className="flex items-center gap-3">
  <img
    src="/image.png"
    alt="logo"
    className="h-10 w-10 object-contain"
  />
  <span className="text-base font-semibold tracking-wide">
    <span className="text-gradient">Xyber</span>{" "}
    <span className="text-white/90">Veil</span>
  </span>
</div>
              <p className="mt-3 text-sm text-white/70">{site.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/65">
                  Quick links
                </p>
                <ul className="mt-3 space-y-2">
                  {footerQuickLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/75 transition hover:text-white hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/65">
                  Legal
                </p>
                <ul className="mt-3 space-y-2">
                  {footerLegalLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/75 transition hover:text-white hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/55">
              © {new Date().getFullYear()} {site.name} {site.tagline}. All rights
              reserved.
            </p>
            <p className="text-xs text-white/55">
              Secure, encrypted, privacy guaranteed.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

