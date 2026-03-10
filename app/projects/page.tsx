import { getProjects } from "@/lib/content";
import { ProjectList } from "./project-list";

export default async function Projects() {
  const projects = await getProjects();
  return <ProjectList projects={projects} />;
}
