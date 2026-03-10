import { ImageLightbox } from "./components/image-lightbox";
import { getAboutData } from "@/lib/content";

export default async function Home() {
  const about = await getAboutData();

  return (
    <>
      {/* Profile Photo */}
      <div className="mb-6">
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
      <h1 className="mb-4 text-left font-display font-medium text-neutral-900 text-sm">
        {about.name}
      </h1>

      {/* Bio */}
      <div
        className="space-y-4 prose-about"
        dangerouslySetInnerHTML={{ __html: about.bioHtml }}
      />

      {/* Divider */}
      <hr className="border-neutral-200 my-8" />

      {/* Social Links */}
      <div className="flex flex-wrap gap-4">
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
      </div>
    </>
  );
}
