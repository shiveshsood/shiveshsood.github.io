import type { Metadata } from "next";
import { getSandboxProjects } from "@/lib/content";
import { SandboxList } from "./sandbox-list";

export const metadata: Metadata = {
  title: "Sandbox",
  description:
    "Vibecoded experiments and side projects by Shivesh Sood — ideas that may someday graduate to become full-fledged projects.",
  alternates: { canonical: "/sandbox" },
};

export default async function Sandbox() {
  const projects = await getSandboxProjects();
  return <SandboxList projects={projects} />;
}
