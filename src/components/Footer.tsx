import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border/30 bg-card/20 backdrop-blur-sm relative z-10">
    <div className="container mx-auto px-4 py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4 group">
            <img src={logo} alt="Xyber Veil" className="h-8 w-8 object-contain transition-all group-hover:drop-shadow-[0_0_8px_hsl(174,72%,46%,0.5)]" />
            <span className="font-display text-base font-bold tracking-wider">
              XYBER <span className="text-primary">VEIL</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
            Your digital identity, protected by Swiss-engineered privacy tooling.
          </p>
        </div>
        <div>
          <h4 className="font-display text-[10px] tracking-[0.3em] text-foreground/70 mb-4">PRODUCT</h4>
          <div className="flex flex-col gap-2.5">
            {[{ to: "/features", l: "Features" }, { to: "/pricing", l: "Pricing" }, { to: "/download", l: "Download" }].map(link => (
              <Link key={link.to} to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.l}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-[10px] tracking-[0.3em] text-foreground/70 mb-4">COMPANY</h4>
          <div className="flex flex-col gap-2.5">
            {[{ to: "/about", l: "About" }, { to: "/contact", l: "Contact" }].map(link => (
              <Link key={link.to} to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.l}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-[10px] tracking-[0.3em] text-foreground/70 mb-4">LEGAL</h4>
          <div className="flex flex-col gap-2.5">
            {[{ to: "/privacy", l: "Privacy Policy" }, { to: "/terms", l: "Terms of Service" }].map(link => (
              <Link key={link.to} to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.l}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border/20 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-muted-foreground">© Xyber Veil. All rights reserved.</p>
        
      </div>
    </div>
  </footer>
);

export default Footer;
