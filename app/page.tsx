import { ImageLightbox } from "./components/image-lightbox";

export default function Home() {
  return (
    <>
      {/* Profile Photo */}
      <div className="mb-6">
        <ImageLightbox
          src="/profile.jpg"
          alt="Shivesh Sood"
          width={160}
          height={160}
          className="w-40 h-40 rounded-sm object-cover"
          priority
        />
      </div>

      {/* Name */}
      <h1 className="mb-8 text-left font-display font-medium text-neutral-900 text-sm">
        Shivesh Sood
      </h1>

      {/* Bio */}
      <div className="space-y-4">
        <p>
          I&apos;m a Product Manager &amp; Strategist with a penchant for
          tackling complex problems using technology and thoughtful design. I
          operate at the intersections of multiple mediums and domains.
        </p>
        <p>
          I&apos;m also a maker with experience building across AI, ClimateTech,
          Ag and Healthcare domains. I graduated in 2024 from Harvard
          University&apos;s{" "}
          <a
            href="https://www.gsd.harvard.edu/master-in-design-engineering/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-neutral-500"
          >
            Master&apos;s in Design Engineering
          </a>{" "}
          program.
        </p>
      </div>

      {/* Divider */}
      <hr className="border-neutral-200 my-8" />

      {/* Social Links */}
      <div className="flex flex-wrap gap-4">
        <a
          href="mailto:shivesh.sood@gmail.com"
          className="underline underline-offset-2 transition-colors hover:text-neutral-500"
        >
          Email
        </a>
        <a
          href="https://linkedin.com/in/shiveshsood"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-neutral-500"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-neutral-500"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-neutral-500"
        >
          Twitter
        </a>
      </div>
    </>
  );
}
