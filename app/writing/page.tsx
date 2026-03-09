const writings = [
  {
    title: "AI Development Guide: Assistants",
    date: "Jan 2026",
    url: "https://store.hbr.org/product/ai-development-guide-assistants-a/826136",
  },
  {
    title: "The Deep Tea (Substack Newsletter)",
    date: "2024 – Present",
    url: "https://thedeeptea.substack.com/",
  },
];

export default function Writing() {
  return (
    <>
      <h2 className="font-display text-lg text-neutral-900 mb-6">Writing</h2>
      <div className="mb-8 space-y-4">
        <p>
          I write to make sense of the systems shaping our world — technology,
          culture, and the quiet forces between them.
        </p>
        <p>
          Most of it lives at the intersection of deep tech and human-centered
          thinking.
        </p>
      </div>

      <div className="space-y-1">
        {writings.map((entry) => (
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
