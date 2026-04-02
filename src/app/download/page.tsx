import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import DownloadAppGrid from "@/components/site/DownloadAppGrid";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Download Xyber Veil VPN | Android, iOS & Windows",
  description:
    "Download Xyber Veil VPN for Android, iPhone, iPad, and Windows. Get the app from Google Play, the App Store, or Microsoft Store.",
};

export default function DownloadPage() {
  return (
    <Reveal as="main" className="pb-12 pt-10 sm:pt-14">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/55">
            Apps
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Download <span className="text-gradient">{site.name}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70">
            Install on the device you use most. After purchase, the same links
            appear on your payment confirmation page and can be emailed to you.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <DownloadAppGrid compact />
         
        </div>
      </Container>
    </Reveal>
  );
}
