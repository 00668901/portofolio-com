import type { Project } from "@/lib/types";
import ProjectCard from "./project-card";

interface ProjectGalleryProps {
  projects: Project[];
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container">
        <h2 className="text-center font-headline text-3xl md:text-4xl font-bold mb-12">
          My Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
