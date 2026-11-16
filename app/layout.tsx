import type { Metadata, Viewport } from "next";
import "./globals.css";
import { business } from "@/content/business";

const site = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: `${business.name} | Littleton, Colorado`,
    template: `%s | ${business.shortName}, Littleton CO`,
  },
  description:
    "Father and son tree transplanting and a five acre tree farm in Littleton, Colorado. Trees grown in Littleton soil, moved with our own spades, planted across the state.",
  openGraph: { siteName: business.name, type: "website", locale: "en_US" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Headline:wght@300;500&family=Stack+Sans+Text:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
