# Project Rules

## Content Management

All page content must be managed through `.md` files in the `content/` directory — never hardcoded in React components. Page components should read from markdown files using the content loaders in `lib/content.ts`.

- **About page**: `content/about.md`
- **CV page**: `content/cv.md`
- **Writing list**: `content/writing.md` (frontmatter lists entries, body is intro text)
- **Writing articles**: `content/writing/<slug>.md` (frontmatter: title, date, description)
- **Projects**: `content/projects/<slug>.md` (one file per project)

When adding new content pages, create a `.md` file first, then add a content loader in `lib/content.ts` if needed, and have the page component read from it.
