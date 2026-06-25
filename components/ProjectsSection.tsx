import { AnimatedSection } from '@/components/AnimatedSection';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export function ProjectsSection({ showAll = false }: { showAll?: boolean }) {
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <AnimatedSection id="projects" eyebrow="Practical builds" title="Featured Projects" className="bg-[#090909]">
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </AnimatedSection>
  );
}
