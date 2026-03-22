import type { Metadata } from "next";
import { Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ViewTransitions } from "next-view-transitions";
import { Nav } from "./nav";
import { TextileBorder } from "./textile-border";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-serif",
  display: "swap",
});

// Instrument Serif only ships weight 400 on Google Fonts
const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Shivesh Sood",
  description:
    "Product Lead, Ex-Founder and Builder. Applying emerging technologies to solve complex problems across AI, SaaS, Agriculture, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${sourceSerif.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable} font-serif text-sm text-neutral-900 antialiased relative`}
        >
          <div className="flex flex-col xs:flex-row bg-neutral-50 min-h-screen p-4 pb-12 xs:p-6 sm:p-12 md:p-24">
            <Nav />
            <main className="relative w-full min-w-0 sm:max-w-2xl text-justify hyphens-auto xs:pl-6 sm:pl-8 md:pl-12">
              <div className="hidden xs:block absolute top-0 left-0 h-full border-l border-neutral-200" />
              <article className="relative" style={{ viewTransitionName: "content" }}>{children}</article>
            </main>
          </div>
          <TextileBorder />
          <script
            data-goatcounter="https://shivesh.goatcounter.com/count"
            async
            src="//gc.zgo.at/count.js"
          />
        </body>
      </html>
    </ViewTransitions>
  );
}
