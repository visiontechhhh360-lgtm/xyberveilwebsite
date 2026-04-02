"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { mainNav, site } from "@/config/site";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeHref = useMemo(() => {
    if (pathname?.startsWith("/pricing")) return "/pricing";
    if (pathname?.startsWith("/contact")) return "/contact";
    if (pathname?.startsWith("/download")) return "/download";
    return "/";
  }, [pathname]);

  useEffect(() => {
    const id = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 glass-strong soft-shadow rounded-2xl">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3">

            {/* Logo */}
           <Link href="/" className="flex items-center gap-3">
  <img
    src="/image.png"
    alt="logo"
    className="h-10 w-10 object-contain"
  />
  <span className="text-base font-semibold tracking-wide">
    <span className="text-gradient">Xyber</span>{" "}
    <span className="text-white/90">Veil</span>
  </span>
</Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2">
              {mainNav.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cx(
                      "px-3 py-2 rounded-xl text-sm font-medium transition",
                      "hover:bg-white/5 hover:ring-1 hover:ring-cyan-300/30",
                      isActive && "bg-white/6 ring-1 ring-cyan-300/35"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              
              {/* Buy Button */}
              <Link
                href="/plans/yearly/details"
                className="hidden md:inline-flex px-3 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-cyan-300/20 via-sky-400/20 to-teal-300/20 ring-1 ring-white/10 hover:scale-[1.02] transition"
              >
                Buy now
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="md:hidden h-10 w-10 flex items-center justify-center rounded-xl glass"
                aria-label="Toggle menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M4 7H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 17H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden border-t border-white/10 px-4 py-3">
              <div className="flex flex-col gap-2">
                {mainNav.map((item) => {
                  const isActive = activeHref === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cx(
                        "px-3 py-2 rounded-xl text-sm font-medium transition",
                        "hover:bg-white/5 hover:ring-1 hover:ring-cyan-300/30",
                        isActive && "bg-white/6 ring-1 ring-cyan-300/35"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <Link
                  href="/plans/yearly/details"
                  className="mt-2 px-3 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-cyan-300/20 via-sky-400/20 to-teal-300/20 ring-1 ring-white/10"
                >
                  Buy now
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}