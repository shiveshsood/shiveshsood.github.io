"use client";

import { ImageLightbox } from "../components/image-lightbox";

const projects = [
  {
    title: "Thunder",
    category: "System Design",
    tags: ["Systems Thinking", "Strategy", "Figma"],
    date: "May 2024",
    description:
      "Thunder is a climate data framework and engine that helps industries stay accountable and on track for their emissions reduction and climate action goals. Thunder relies upon numerous empirical, open data sources to paint an accurate picture of climate impacts and action. Further, Thunder's Spatial AI enables stakeholders to find deeper insights and take data-driven decisions in a matter of minutes. Thunder's Data Engine can feed its data and insights into various end-use applications such as climate activism platforms, supply chain intelligence, Carbon Credit MRV platforms, and more. Thunder was created as part of my coursework at Harvard University's Master's in Design Engineering program.",
    image: "/projects/thunder.png",
  },
  {
    title: "Indigenous Textiles Around the World",
    category: "Data Visualization",
    tags: ["Figma", "Python", "Keras", "Image Recognition"],
    date: "October 2022",
    description:
      "One of the casualties of globalization has been indigenous textile traditions of various nationalities which are being abandoned in favour of a more globalized, eurocentric attire. Our team attempts to bring attention to indigenous textile traditions from around the world through a beautiful data visualization, in hopes to raise awareness, and advocate for cultural diversity in textiles.",
    image: "/projects/indigenous-textiles.png",
    link: {
      label: "Watch Video",
      url: "https://drive.google.com/file/d/1hUfCl1k43CD7fMcbRTp3dJELOTxe5iR9/view?usp=sharing",
    },
  },
  {
    title: "StayQrious Webinar Product",
    category: "UI Design",
    tags: ["Balsamiq", "User Flows", "Product Analytics"],
    date: "July 2021",
    description:
      "StayQrious is a Y Combinator backed ed-tech startup based out of Bangalore, India. As Product Manager, I designed wireframes and design flows for an online webinar product, StayQrious Masterclass, that can support up to 5000 concurrent attendees and is StayQrious' largest source of growth and users today. Post-launch, I set up behavioral data collection flows & strategy for lead qualification and led UX efforts to improve payment conversion rates.",
    image: "/projects/stayqrious-webinar.png",
  },
  {
    title: "StayQrious Website Redesign",
    category: "Branding",
    tags: ["Content Writing", "User Research", "Figma"],
    date: "May 2021",
    description:
      "StayQrious is uniquely positioned in the Indian ed-tech space as India's first neo-school where learning techniques are based on modern brain science, and a focus on 21st-century skills of communication, collaboration, creativity, and critical thinking. We revamped & created a total of 10 different webpages for the existing website to better convey our value proposition, brand voice, and positioning in the crowded Indian ed-tech market. I conducted user interviews, brainstormed product, graphic design with the visual designer and CPO. I independently created 15+ UI components and drafted content based on user research insights for all pages of the website.",
    image: "/projects/stayqrious-website.png",
  },
  {
    title: "SWARAF",
    category: "Product Design & Development",
    tags: ["Product Dev", "Product Design", "Business"],
    date: "2018 – 2019",
    description:
      "85% of Farmers in India own pockets of land smaller than 2 Hectares. This leads to a unique problem for the Indian farmer: the farms are often too small to take advantage of modern machinery such as tractors and harvesters, which make cultivation more efficient and profitable. Most products in the realm of precision agriculture solely target large industrial farms, while smallholder farmers are relegated to use tools that haven't changed in centuries. SWARAF is designed to be a tool to make farming more profitable and bring millions of smallholder farmers out of the painful cycle of debt.",
    image: "/projects/swaraf.png",
  },
];

export default function Projects() {
  return (
    <>
      <h2 className="text-lg font-bold text-neutral-900 mb-6">Projects</h2>
      <div className="flex flex-col gap-10">
        {projects.map((project) => (
          <div key={project.title}>
            {/* Header row: title + date */}
            <div className="flex justify-between items-start gap-4 mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-neutral-900 text-sm">
                  {project.title}
                </h3>
                <span className="font-mono text-xs font-medium text-neutral-800 bg-neutral-150 rounded-md px-2 py-0.5">
                  {project.category}
                </span>
              </div>
              <span className="text-sm text-neutral-400 tabular-nums shrink-0">
                {project.date}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="font-mono text-xs text-neutral-400 leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Link */}
            {project.link && (
              <div className="mb-4">
                <a
                  href={project.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 underline underline-offset-2 decoration-neutral-900 transition-colors hover:text-neutral-600 hover:decoration-neutral-600"
                >
                  {project.link.label}
                  <span className="text-xs">&#x2197;</span>
                </a>
              </div>
            )}

            {/* Image */}
            <div className="rounded-sm overflow-hidden border border-neutral-200">
              <ImageLightbox
                src={project.image}
                alt={project.title}
                width={1000}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
