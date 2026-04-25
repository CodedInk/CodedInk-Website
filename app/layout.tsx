import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";
import Mascot from "./components/Mascot";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ross Taylor - UI/UX Design Leader",
  description: "UI/UX Design Leader crafting meaningful, accessible digital products that balance user needs and business goals.",
  keywords: [
    "Ross Taylor",
    "CodedInk",
    "UI/UX Design Leader",
    "UI/UX Designer",
    "Product Designer",
    "Design Leadership",
    "Portfolio",
  ],
  authors: [{ name: "Ross Taylor" }],
  creator: "Ross Taylor",
  publisher: "Ross Taylor",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codedink.github.io/codedink-website/",
    title: "Ross Taylor - UI/UX Design Leader",
    description: "UI/UX Design Leader crafting meaningful, accessible digital products.",
    siteName: "Ross Taylor - CodedInk",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ross Taylor - UI/UX Design Leader",
    description: "UI/UX Design Leader crafting meaningful, accessible digital products.",
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://codedink.github.io/codedink-website/" />
      </head>
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        {children}
        <Mascot />
        <Analytics />
      </body>
    </html>
  );
}
