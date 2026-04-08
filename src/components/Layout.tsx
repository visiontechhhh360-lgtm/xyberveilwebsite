import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CyberBackground from "./CyberBackground";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen cyber-grid relative">
    <CyberBackground />
    <Navbar />
    <main className="pt-16 relative z-10">{children}</main>
    <Footer />
  </div>
);

export default Layout;
