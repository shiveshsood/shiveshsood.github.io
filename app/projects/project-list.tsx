"use client";

import { ImageLightbox } from "../components/image-lightbox";
import { ProjectSlideshow } from "../components/project-slideshow";
import type { Project } from "@/lib/content";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <>
      <h2 className="font-display text-lg text-neutral-900 mb-6">Projects</h2>
      <div className="flex flex-col gap-10">
        {projects.map((project) => (
          <div key={project.title}>
            {/* Header row: title + date */}
            <div className="flex justify-between items-start gap-4 mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-neutral-900 text-sm">
                  {project.title}
                </h3>
                <span className="font-mono text-xs font-medium text-neutral-700 bg-neutral-150 rounded-md px-2 py-0.5">
                  {project.category}
                </span>
              </div>
              <span className="text-sm text-neutral-500 tabular-nums shrink-0">
                {project.date}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-neutral-500"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div
              className="text-xs text-neutral-700 leading-relaxed mb-4 prose-project"
              dangerouslySetInnerHTML={{ __html: project.descriptionHtml }}
            />

            {/* Link */}
            {project.link && (
              <div className="mb-4">
                <a
                  href={project.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 underline underline-offset-2 transition-colors hover:text-neutral-500"
                >
                  {project.link.label}
                  <span className="text-xs">&#x2197;</span>
                </a>
              </div>
            )}

            {/* Images — slideshow when multiple, single lightbox otherwise */}
            {project.images.length > 1 ? (
              <ProjectSlideshow images={project.images} alt={project.title} />
            ) : project.images.length === 1 ? (
              <div className="rounded-sm overflow-hidden border border-neutral-200">
                <ImageLightbox
                  src={project.images[0]}
                  alt={project.title}
                  width={1000}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}
