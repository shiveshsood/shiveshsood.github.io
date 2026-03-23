import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "People",
  description: "People who inspire Shivesh Sood.",
  alternates: { canonical: "/people" },
  robots: { index: false },
};

export default function People() {
  return <p className="text-neutral-400">Coming soon.</p>;
}
