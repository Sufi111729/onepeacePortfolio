import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import type { Project } from '@/data/projects';

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const detailHref = `/projects/${project.slug}`;
  const primaryHref = project.live ?? detailHref;
  const primaryIsExternal = Boolean(project.live);
  const primaryLabel = project.live ? 'Live Demo' : 'View Details';

  return (
    <article className="project-card group">
      <Link href={detailHref} className="project-thumb focus-ring" aria-label={`View ${project.name} project details`}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={1280}
          height={720}
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={priority}
          className="h-full w-full object-contain transition duration-500 ease-out group-hover:scale-[1.02]"
        />
      </Link>

      <div className="project-card-content">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">{project.category}</p>
        <h3 className="text-2xl font-bold leading-tight text-text">{project.name}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tag) => (
            <span key={tag} className="border border-line/90 bg-ink px-3 py-1 text-xs font-semibold leading-5 text-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="project-card-actions">
          <a
            href={project.github ?? 'https://github.com/mdsufidev'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-small focus-ring"
            aria-label={`Open GitHub profile for ${project.name}`}
          >
            <FiGithub aria-hidden="true" />
            GitHub
          </a>
          {primaryIsExternal ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-small btn-small-accent focus-ring"
              aria-label={`Open ${project.name} live demo`}
            >
              <FiExternalLink aria-hidden="true" />
              {primaryLabel}
            </a>
          ) : (
            <Link href={primaryHref} className="btn-small btn-small-accent focus-ring" aria-label={`View ${project.name} project details`}>
              <FiExternalLink aria-hidden="true" />
              {primaryLabel}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
