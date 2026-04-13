import { Hero } from "@/components/sections/Hero";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { SkillsShowcase } from "@/components/sections/SkillsShowcase";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { Contact } from "@/components/sections/Contact";
import { ProjectRepository } from "@/lib/repositories/ProjectRepository";

export default async function Home() {
  const projects = await ProjectRepository.getAll('vi')

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <ProjectsGrid initialProjects={projects} />
      <SkillsShowcase />
      <JourneyTimeline />
      <Contact />
    </div>
  );
}
