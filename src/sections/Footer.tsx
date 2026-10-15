import { LEGAL_LINKS, NAV_LINKS, PLATFORMS, SOCIAL_LINKS } from '../config/site'
import { PlatformIcon } from '../components/Icons'
import { Logo } from '../components/ui'
import { linkProps } from '../lib/links'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo size={40} />
            <p className="muted">A VPN for Windows, macOS, iOS, Android, Linux and Chrome.</p>
            {SOCIAL_LINKS.length > 0 && (
              <ul className="footer__social">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}><a {...linkProps(s.href)}>{s.label}</a></li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="footer__col">
            <h2>Navigation</h2>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.label}><a {...linkProps(l.href)}>{l.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h2>Platforms</h2>
            <ul>
              {PLATFORMS.map((p) => (
                <li key={p.id}>
                  <a {...linkProps(p.href)}><PlatformIcon id={p.id} size={14} />{p.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2>Legal</h2>
            <ul>
              {LEGAL_LINKS.map((l) => (
                <li key={l.label}><a {...linkProps(l.href)}>{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__base">
          <span>© {year} Xyberveil. All rights reserved.</span>
          <a href="#top" className="footer__top">Back to top ↑</a>
        </div>
        <div className="footer__word text-chrome" aria-hidden="true">Xyberveil</div>
      </div>
    </footer>
  )
}
