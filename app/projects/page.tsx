import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { ProjectList } from "./project-list";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Shivesh Sood — spanning AI, SaaS, agriculture, hardware, and design.",
  alternates: { canonical: "/projects" },
};

export default async function Projects() {
  const projects = await getProjects();
  return <ProjectList projects={projects} />;
}
