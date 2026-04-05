import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ─── Types ──────────────────────────────────────────────────────────

export interface AboutLink {
  label: string;
  url: string;
  external: boolean;
}

export interface AboutData {
  name: string;
  image: string;
  links: AboutLink[];
  bioHtml: string;
}

export interface WorkEntry {
  company: string;
  location: string;
  date: string;
  title: string;
  description: string;
  url?: string;
  logo?: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  date?: string;
  focus?: string;
  logo?: string;
}

export interface CVData {
  work: WorkEntry[];
  education: EducationEntry[];
  skills: string[];
}

export interface WritingEntry {
  title: string;
  date: string;
  url: string;
}

export interface WritingData {
  writings: WritingEntry[];
  introHtml: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface MediaItem {
  type: "image" | "video";
  src: string;
}

export interface Project {
  title: string;
  category: string;
  tags: string[];
  date: string;
  media: MediaItem[];
  link?: ProjectLink;
  order: number;
  descriptionHtml: string;
  slug: string;
}

// ─── Markdown renderer ─────────────────────────────────────────────

export async function renderMarkdown(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}

export interface SandboxProject extends Project {
  graduated: boolean;
}

// ─── Content loaders ────────────────────────────────────────────────

export async function getAboutData(): Promise<AboutData> {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "about.md"), "utf-8");
  const { data, content } = matter(raw);
  const bioHtml = await renderMarkdown(content);
  return {
    name: data.name,
    image: data.image,
    links: data.links as AboutLink[],
    bioHtml,
  };
}

export async function getCVData(): Promise<CVData> {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "cv.md"), "utf-8");
  const { data } = matter(raw);
  return {
    work: data.work as WorkEntry[],
    education: data.education as EducationEntry[],
    skills: data.skills as string[],
  };
}

export async function getWritingData(): Promise<WritingData> {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "writing.md"), "utf-8");
  const { data, content } = matter(raw);
  const introHtml = await renderMarkdown(content);
  return {
    writings: data.writings as WritingEntry[],
    introHtml,
  };
}

export interface WritingArticle {
  title: string;
  date: string;
  description: string;
  contentHtml: string;
}

export async function getWritingArticle(slug: string): Promise<WritingArticle> {
  const raw = fs.readFileSync(
    path.join(CONTENT_DIR, "writing", `${slug}.md`),
    "utf-8"
  );
  const { data, content } = matter(raw);
  const contentHtml = await renderMarkdown(content);
  return {
    title: data.title,
    date: data.date,
    description: data.description,
    contentHtml,
  };
}

export async function getProjects(): Promise<Project[]> {
  const projectsDir = path.join(CONTENT_DIR, "projects");
  const filenames = fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".md"));

  const projects = await Promise.all(
    filenames.map(async (filename) => {
      const raw = fs.readFileSync(
        path.join(projectsDir, filename),
        "utf-8"
      );
      const { data, content } = matter(raw);
      const descriptionHtml = await renderMarkdown(content);
      const slug = filename.replace(/\.md$/, "");

      // Build media array from frontmatter: images, image, and videos fields
      const media: MediaItem[] = [];
      const imgs: string[] = data.images
        ? (data.images as string[])
        : data.image
          ? [data.image as string]
          : [];
      for (const src of imgs) {
        media.push({ type: "image", src });
      }
      if (data.videos) {
        for (const src of data.videos as string[]) {
          media.push({ type: "video", src });
        }
      }

      return {
        title: data.title,
        category: data.category,
        tags: data.tags as string[],
        date: data.date,
        media,
        link: data.link as ProjectLink | undefined,
        order: data.order as number,
        descriptionHtml,
        slug,
      } satisfies Project;
    })
  );

  return projects.sort((a, b) => a.order - b.order);
}

export async function getSandboxProjects(): Promise<SandboxProject[]> {
  const sandboxDir = path.join(CONTENT_DIR, "sandbox");
  const filenames = fs
    .readdirSync(sandboxDir)
    .filter((f) => f.endsWith(".md"));

  const projects = await Promise.all(
    filenames.map(async (filename) => {
      const raw = fs.readFileSync(
        path.join(sandboxDir, filename),
        "utf-8"
      );
      const { data, content } = matter(raw);
      const descriptionHtml = await renderMarkdown(content);
      const slug = filename.replace(/\.md$/, "");

      const media: MediaItem[] = [];
      const imgs: string[] = data.images
        ? (data.images as string[])
        : data.image
          ? [data.image as string]
          : [];
      for (const src of imgs) {
        media.push({ type: "image", src });
      }
      if (data.videos) {
        for (const src of data.videos as string[]) {
          media.push({ type: "video", src });
        }
      }

      return {
        title: data.title,
        category: "Sandbox",
        tags: data.tags as string[],
        date: data.date,
        media,
        link: data.link as ProjectLink | undefined,
        order: data.order as number,
        descriptionHtml,
        slug,
        graduated: (data.graduated as boolean) ?? false,
      } satisfies SandboxProject;
    })
  );

  return projects.sort((a, b) => a.order - b.order);
}
