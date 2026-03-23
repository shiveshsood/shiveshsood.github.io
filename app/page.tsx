import { ImageLightbox } from "./components/image-lightbox";
import { VisitCounter } from "./components/visit-counter";
import { getAboutData } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shivesh Sood",
  url: "https://shivesh.me",
  image: "https://shivesh.me/profile.jpg",
  jobTitle: "Lead AI Product Manager",
  worksFor: {
    "@type": "Organization",
    name: "Harvard Business School",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Harvard University",
    },
  ],
  knowsAbout: [
    "Product Management",
    "Artificial Intelligence",
    "SaaS",
    "Full-Stack Development",
  ],
  sameAs: [],
};

export default async function Home() {
  const about = await getAboutData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Profile Photo */}
      <div className="mb-4">
        <ImageLightbox
          src={about.image}
          alt={about.name}
          width={160}
          height={160}
          className="w-40 h-40 rounded-sm object-cover"
          priority
        />
      </div>

      {/* Name */}
      <h1 className="mb-5 text-left font-display font-medium text-neutral-900 text-base tracking-tight">
        {about.name}
      </h1>

      {/* Bio */}
      <div
        className="space-y-4 prose-about"
        dangerouslySetInnerHTML={{ __html: about.bioHtml }}
      />

      {/* Divider */}
      <hr className="border-neutral-200 my-8" />

      {/* Social Links + Location + Visit Counter */}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm">
        <span className="text-neutral-400">📍 Cambridge, MA</span>
        {about.links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="underline underline-offset-2 transition-colors hover:text-neutral-500"
          >
            {link.label}
          </a>
        ))}
        <span className="ml-auto">
          <VisitCounter />
        </span>
      </div>
    </>
  );
}
