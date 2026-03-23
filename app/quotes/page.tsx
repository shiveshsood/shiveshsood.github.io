import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quotes",
  description: "A collection of quotes curated by Shivesh Sood.",
  alternates: { canonical: "/quotes" },
  robots: { index: false },
};

export default function Quotes() {
  return <p className="text-neutral-400">Coming soon.</p>;
}
