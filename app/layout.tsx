import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import CommandPalette from "@/components/CommandPalette";
import { socialItems } from "@/lib/data";

// Display font — headings and the logo wordmark.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Text font — body copy, everything else.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// TODO: replace with your real production domain once you have one.
const SITE_URL = "https://zohaibmustafa.dev";
const SITE_NAME = "Zohaib Mustafa";
const SITE_DESCRIPTION =
  "AI automation, ERP and web development — software a business actually runs on.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI Automation & Software Developer`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — AI Automation & Software Developer`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — AI Automation & Software Developer`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: "AI Automation & Software Developer",
  url: SITE_URL,
  email: "mailto:zohaibmustafa200@gmail.com",
  sameAs: socialItems.filter((item) => item.external).map((item) => item.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-base text-ink">
        {/* If JS never runs, neutralize any motion-library initial (hidden) inline styles. */}
        <noscript>
          <style>{`.motion-fallback { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NoiseOverlay />
          <CommandPalette />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
