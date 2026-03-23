import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { getWritingData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Published writing by Shivesh Sood on product management, technology, design, and building.",
  alternates: { canonical: "/writing" },
};

export default async function Writing() {
  const writing = await getWritingData();

  return (
    <>
      <h1 className="font-display text-lg text-neutral-900 mb-6">Writing</h1>
      <div
        className="mb-8 space-y-4 prose-writing"
        dangerouslySetInnerHTML={{ __html: writing.introHtml }}
      />

      <div className="space-y-1">
        {writing.writings.map((entry) => {
          const isExternal = entry.url.startsWith("http");
          const Wrapper = isExternal ? "a" : Link;
          const linkProps = isExternal
            ? { href: entry.url, target: "_blank" as const, rel: "noopener noreferrer" }
            : { href: entry.url };
          return (
            <Wrapper
              key={entry.title}
              {...linkProps}
              className="group relative flex justify-between transition-colors hover:text-neutral-900"
            >
              <div className="absolute top-[10px] left-0 w-full border-t border-neutral-300 transition-colors group-hover:border-neutral-900" />
              <h2 className="relative block bg-neutral-50 pr-2 text-left font-normal">
                {entry.title}
              </h2>
              <time className="relative ml-2 block bg-neutral-50 pl-2 whitespace-nowrap text-neutral-500 transition-colors group-hover:text-neutral-900">
                {entry.date}
              </time>
            </Wrapper>
          );
        })}
      </div>
    </>
  );
}
