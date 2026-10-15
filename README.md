# Xyberveil — Website

Marketing site for the Xyberveil VPN. Vite + React + TypeScript, animated with GSAP (ScrollTrigger) plus CSS, Canvas and SVG.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Where to edit things

| What | Where |
| --- | --- |
| **All product copy, FAQs, feature text** | `src/config/site.ts` |
| **Download links** (`DOWNLOAD_LINK_WINDOWS`, …) | `DOWNLOAD_LINKS` in `src/config/site.ts` |
| Support / Privacy / Terms links | `NAV_LINKS`, `LEGAL_LINKS` in `src/config/site.ts` |
| Social links (hidden while empty) | `SOCIAL_LINKS` in `src/config/site.ts` |
| Protocol names (WireGuard, VLESS, Amnezia) | `PROTOCOLS` in `src/config/site.ts` |
| Anti-Tracker wording (taken from the app's Settings screen) | `ANTI_TRACKER` in `src/config/site.ts` |
| **Real app screenshots** used in device mockups | `src/assets/screens/` + `SCREENS` in `src/config/site.ts` |
| Location names (nodes are unlabeled/abstract while empty) | `LOCATION_NAMES` in `src/config/site.ts` |
| Colours, gradients, glass, type scale, easing | `src/styles/tokens.css` |

Any link that still holds a placeholder token (an ALL_CAPS value like `DOWNLOAD_LINK_IOS`) keeps its `href`, so it's easy to search for, but clicking it does nothing (see `src/lib/links.ts`). Once you swap in a real URL it works normally, and external URLs open in a new tab.

## Placeholders to replace before launch

- `DOWNLOAD_LINK_*` (6), `SUPPORT_LINK`, `PRIVACY_POLICY_LINK`, `TERMS_OF_SERVICE_LINK`
- `[ADD VERIFIED SYSTEM REQUIREMENTS FOR …]`: shown in the Downloads panel (`src/sections/Downloads.tsx`)
- Device screens use real app captures:
  - **Phones (iOS + Android)** use the iOS screenshots (`src/assets/XV 1 (1–3).jpeg` → `src/assets/screens/app-*.webp`); Android frames draw an Android status bar over them; the Protocols phone screen is rebuilt in HTML (`src/components/AppChrome.*`).
  - **Laptop / desktop display (Windows, macOS, Linux)** use the desktop app captures (`src/assets/Screenshot 2026-09-22 at *.png`), cropped to the frameless 1200×672 app window → `src/assets/screens/desk-*.webp` (`SCREENS.desktop`). The capture is shown unmodified; only the surrounding OS differs (macOS menu bar + dock and a soft macOS window shadow, or the Windows taskbar).
  - The Chrome extension popup still shows the iOS Home screen cropped (no extension capture yet).

## Content rules

Copy covers only confirmed facts: VPN service, 30+ locations, WireGuard / VLESS / Amnezia protocols, Auto Connect, Split Tunneling, Anti-Tracker, and apps for Windows, macOS, iOS, Android, Linux and Chrome. There are no claims about encryption, logging, speed, server counts, audits, kill switch or streaming. Please keep it that way unless a claim is verified.

## Structure

```
src/
  config/site.ts        product data + links (single source of truth)
  styles/               tokens.css (theme), base.css (reset, type, glass, utilities)
  lib/                  gsap setup, useReveal / useGsap / useTilt / useSpotlight, links
  components/           ui (Button, Logo, SplitText, SpotlightCard, Toggle, Seam),
                        Devices (Laptop, Monitor, Phone, BrowserScreen, DesktopAppScreen, Wallpaper,
                        ScaledScreen, GroundShadow), AppChrome (real-app status/tab bar + settings rows), Icons
  visuals/GlobeCanvas   hero network globe (canvas, pauses off-screen)
  sections/             one folder-less module + CSS per section, in page order:
                        Nav, Hero, Statement, Showcase, Features, SplitTunneling,
                        Locations, Protocols, AntiTracker, Control, Ecosystem, Downloads, FAQ, FinalCTA, Footer
```

### Header

`src/sections/Nav.*`: `position: fixed` with constant geometry. The scrolled "glass" look is a separate
layer whose **opacity** is the only thing that transitions, so nothing changes size or moves on scroll.
Geometry and stacking come from tokens (`--nav-offset`, `--nav-bar-h`, `--nav-h`, `--z-nav`). The mobile menu
stays mounted (so it animates both ways), is `inert` when closed, and locks scrolling via
`html.is-menu-open`; `scrollbar-gutter: stable` stops the page width from shifting.

### Device system

`src/components/Devices.*`: every device shares one light direction, the layered shadow tokens
(`--shadow-device`, `--shadow-window`) and a three-layer `<GroundShadow/>` (contact, ambient, atmospheric).
Screenshots render at their native aspect ratio. HTML screens are laid out at a real resolution
(1440×900 laptop, 1600×900 display, 393×852 phone) and scaled uniformly by `<ScaledScreen/>`, so nothing
stretches.

### Motion system

- `data-reveal="up|fade|scale|left|right|blur|words|stagger"` (+ optional `data-delay`) on any element inside a section that calls `useReveal(ref)` animates it on scroll.
- `useGsap(ref, (mm) => …)` scopes GSAP to a section and cleans up on unmount.
- `prefers-reduced-motion` is respected throughout: GSAP runs only under `(prefers-reduced-motion: no-preference)`, CSS animations are disabled globally, the canvas draws a single still frame, and the particle/SMIL animations are skipped.
- Canvas and particle loops pause when they're off-screen or the tab is hidden.
