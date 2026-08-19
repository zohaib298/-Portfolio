import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Zohaib Mustafa — Portfolio",
  description: "Full Stack Web Developer — transforming ideas into digital reality.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} h-full antialiased`}>
      <body className="min-h-full bg-base text-white">
        {/* If JS never runs, neutralize any motion-library initial (hidden) inline styles. */}
        <noscript>
          <style>{`.motion-fallback { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
