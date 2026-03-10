import { getWritingData } from "@/lib/content";

export default async function Writing() {
  const writing = await getWritingData();

  return (
    <>
      <h2 className="font-display text-lg text-neutral-900 mb-6">Writing</h2>
      <div
        className="mb-8 space-y-4 prose-writing"
        dangerouslySetInnerHTML={{ __html: writing.introHtml }}
      />

      <div className="space-y-1">
        {writing.writings.map((entry) => (
          <a
            key={entry.title}
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex justify-between transition-colors hover:text-neutral-900"
          >
            <div className="absolute top-[10px] left-0 w-full border-t border-neutral-300 transition-colors group-hover:border-neutral-900" />
            <h2 className="relative block bg-neutral-50 pr-2 text-left">
              {entry.title}
            </h2>
            <time className="relative ml-2 block bg-neutral-50 pl-2 whitespace-nowrap text-neutral-500 transition-colors group-hover:text-neutral-900">
              {entry.date}
            </time>
          </a>
        ))}
      </div>
    </>
  );
}
