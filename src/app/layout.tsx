import type { Metadata, Viewport } from "next";
import { Inter, Quicksand } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import StructuredData from "@/components/seo/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030303",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zayvon.tech"),
  title: {
    default: "ZAYVON — Digital Studio",
    template: "%s | ZAYVON",
  },
  description: "We design digital experiences that command attention. A premium digital studio crafting first impressions that convert.",
  applicationName: "ZAYVON",
  authors: [{ name: "ZAYVON" }],
  creator: "ZAYVON",
  publisher: "ZAYVON",
  generator: "Next.js",
  keywords: ["digital studio", "web development", "design agency", "premium websites", "software engineering", "Kerala"],
  alternates: {
    canonical: "https://zayvon.tech",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zayvon.tech",
    siteName: "ZAYVON Digital Studio",
    title: "ZAYVON — Digital Studio",
    description: "We design digital experiences that command attention. A premium digital studio crafting first impressions that convert.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ZAYVON Digital Studio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZAYVON — Digital Studio",
    description: "We design digital experiences that command attention. A premium digital studio crafting first impressions that convert.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    title: "ZAYVON",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${quicksand.variable} antialiased`} suppressHydrationWarning>
      <body>
        <StructuredData />
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
