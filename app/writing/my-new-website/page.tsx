import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { getWritingArticle } from "@/lib/content";

const SLUG = "my-new-website";

export async function generateMetadata(): Promise<Metadata> {
  const article = await getWritingArticle(SLUG);
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/writing/${SLUG}` },
  };
}

export default async function MyNewWebsite() {
  const article = await getWritingArticle(SLUG);

  return (
    <article className="text-left">
      <header className="mb-8">
        <h1 className="font-display text-lg text-neutral-900 mb-1">
          {article.title}
        </h1>
        <time className="font-mono text-xs text-neutral-400">
          {article.date}
        </time>
      </header>

      <div
        className="space-y-4 prose-writing"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      <div className="mt-10">
        <Link
          href="/writing"
          className="font-display text-neutral-400 transition-colors hover:text-neutral-900"
        >
          &larr; back to writing
        </Link>
      </div>
    </article>
  );
}
