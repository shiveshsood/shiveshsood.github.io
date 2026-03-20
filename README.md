# shivesh.me

Personal portfolio for **Shivesh Sood** — product manager, strategist, and maker.

Built with Next.js 16, React 19, and Tailwind CSS 4. Deployed as a fully static site to GitHub Pages.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, static export) |
| UI | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Primitives | [Radix UI](https://www.radix-ui.com/) (Dialog, VisuallyHidden) |
| Transitions | [next-view-transitions](https://github.com/shuding/next-view-transitions) |
| Content | Markdown + [gray-matter](https://github.com/jonschlinkert/gray-matter) + [unified](https://unifiedjs.com/) / remark / rehype |
| Deployment | GitHub Pages via GitHub Actions |

## Architecture

```
app/
  layout.tsx              Root layout (fonts, nav, textile border)
  page.tsx                About / home
  nav.tsx                 Sidebar + mobile navigation
  textile-border.tsx      Decorative Kullu patti border strip
  globals.css             Tailwind theme + view transition keyframes
  components/
    image-lightbox.tsx    Accessible image lightbox (Radix Dialog)
    project-slideshow.tsx Media carousel + lightbox for project media
  cv/page.tsx             CV / work experience
  writing/page.tsx        Published writing
  projects/
    page.tsx              Projects index
    project-list.tsx      Client-side project renderer
content/
  about.md                Bio, profile image, social links
  cv.md                   Work history, education, skills
  writing.md              Writing entries
  projects/*.md           Individual project pages
lib/
  content.ts              Markdown loading + rendering pipeline
public/
  patterns/               Kullu patti textile patterns
  projects/               Project screenshots
```

Content lives in `content/` as Markdown files with YAML frontmatter. The `lib/content.ts` module reads these at build time using gray-matter and renders markdown to HTML via a unified pipeline (remark-parse → remark-rehype → rehype-raw → rehype-external-links → rehype-stringify).

Pages are server components that call content loaders. Interactive pieces (`"use client"`) handle lightboxes, carousel navigation, and the decorative border.

## Design System

### Palette

A warm, parchment-inspired neutral scale defined in `app/globals.css`:

| Token | Hex | Usage |
| --- | --- | --- |
| neutral-50 | `#faf9f5` | Page background |
| neutral-150 | `#f0eeea` | Badges, tags |
| neutral-200 | `#e8e6dc` | Borders, dividers |
| neutral-400 | `#7a7870` | Inactive nav, muted text |
| neutral-700 | `#3a3835` | Body text |
| neutral-800 | `#2a2826` | Tooltip background |
| neutral-900 | `#1a1918` | Headings, primary text |

### Typography

| Role | Font | CSS Variable |
| --- | --- | --- |
| Body | Source Serif 4 | `--font-source-serif` |
| Display | Instrument Serif | `--font-instrument-serif` |
| Mono | IBM Plex Mono | `--font-ibm-plex-mono` |

### Layout

- Base text size: `text-sm` (14px)
- Sidebar layout on `xs` (480px+), stacked on mobile
- Content column max width: `max-w-2xl` (672px)
- View transitions: blur crossfade on route change
- Decorative Kullu patti textile border on right edge (desktop)

## Getting Started

**Prerequisites:** Node.js 20+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Static output is written to `out/`.

### Deploy

Push to `main`. The GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages automatically. The site is served at [shivesh.me](https://shivesh.me).

## License

All content and design copyright Shivesh Sood. Code structure may be referenced for learning.
