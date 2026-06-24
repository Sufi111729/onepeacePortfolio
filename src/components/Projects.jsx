import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import Section from './Section.jsx';

const projects = [
  {
    title: 'FileWalaTool',
    description:
      'A practical online platform for PDF, image, and document utilities. It includes tools for image compression, image resizing, PDF merge, split, compress, image to PDF, PDF to JPG, passport photo creation, background removal, and more.',
    image: '/projects/filewalatool.webp',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    github: 'PASTE_FILEWALATOOL_GITHUB_REPO_LINK_HERE',
    live: 'https://www.filewalatool.com/',
  },
  {
    title: 'MangaLok',
    description:
      'A manga reading web application designed with a smooth catalog experience, chapter reading flow, user-friendly interface, and backend-based content management.',
    image: '/projects/mangalok.webp',
    technologies: ['React', 'Spring Boot', 'MySQL'],
    github: 'PASTE_MANGALOK_GITHUB_REPO_LINK_HERE',
    live: 'PASTE_MANGALOK_LIVE_DEMO_LINK_HERE',
  },
  {
    title: 'Resume Builder',
    description:
      'An ATS-friendly resume builder that helps users create professional resumes with a clean interface and downloadable resume output.',
    image: '/projects/resume-builder.webp',
    technologies: ['React', 'JavaScript', 'PDF Export'],
    github: 'PASTE_RESUME_BUILDER_GITHUB_REPO_LINK_HERE',
    live: 'PASTE_RESUME_BUILDER_LIVE_DEMO_LINK_HERE',
  },
];

function isReadyLink(link) {
  return link && !link.startsWith('PASTE_');
}

function ProjectThumbnail({ project }) {
  const liveHref = isReadyLink(project.live) ? project.live : '#contact';

  return (
    <a
      href={liveHref}
      target={isReadyLink(project.live) ? '_blank' : undefined}
      rel={isReadyLink(project.live) ? 'noopener noreferrer' : undefined}
      className="project-thumb focus-ring"
      aria-label={`Open ${project.title} live demo`}
    >
      <img
        src={project.image}
        alt={`${project.title} project preview`}
        loading="lazy"
        decoding="async"
        onError={(event) => {
          event.currentTarget.hidden = true;
          event.currentTarget.nextElementSibling?.removeAttribute('hidden');
        }}
      />
      <div className="project-thumb-fallback" hidden>
        <span>{project.title}</span>
      </div>
      <span className="project-thumb-overlay" aria-hidden="true" />
    </a>
  );
}

export default function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="projects" eyebrow="Practical builds" title="Selected Projects" className="bg-[#090909]">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.article
            key={project.title}
            className="project-card group"
            whileHover={reduceMotion ? undefined : { y: -7, rotateX: 1.2, rotateY: -1.2 }}
            transition={{ duration: 0.22 }}
          >
            <ProjectThumbnail project={project} />
            <div className="p-5">
              <h3 className="text-2xl font-bold text-text">{project.title}</h3>
              <p className="mt-3 min-h-32 text-sm leading-7 text-muted">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tag) => (
                  <span key={tag} className="border border-line bg-ink px-3 py-1 text-xs font-semibold text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href={isReadyLink(project.github) ? project.github : 'https://github.com/Sufi111729'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-small focus-ring"
                >
                  <FiGithub aria-hidden="true" />
                  GitHub
                </a>
                <a
                  href={isReadyLink(project.live) ? project.live : '#contact'}
                  target={isReadyLink(project.live) ? '_blank' : undefined}
                  rel={isReadyLink(project.live) ? 'noopener noreferrer' : undefined}
                  className="btn-small btn-small-accent focus-ring"
                >
                  <FiExternalLink aria-hidden="true" />
                  Live Demo
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
