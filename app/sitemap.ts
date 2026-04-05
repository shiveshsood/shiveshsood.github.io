import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://shivesh.me";

  // Static pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/cv`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/writing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Writing articles (content/writing/*.md)
  const writingDir = path.join(process.cwd(), "content", "writing");
  if (fs.existsSync(writingDir)) {
    const articles = fs
      .readdirSync(writingDir)
      .filter((f) => f.endsWith(".md"));
    for (const file of articles) {
      const slug = file.replace(/\.md$/, "");
      const stat = fs.statSync(path.join(writingDir, file));
      routes.push({
        url: `${base}/writing/${slug}`,
        lastModified: stat.mtime,
        changeFrequency: "yearly",
        priority: 0.7,
      });
    }
  }

  return routes;
}
