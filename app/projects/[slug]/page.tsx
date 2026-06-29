import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { JsonLd } from '@/components/JsonLd';
import { getProject, projects } from '@/data/projects';
import { site } from '@/data/site';
import { absoluteUrl, breadcrumbSchema, createMetadata, webPageSchema } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return createMetadata({
    title: `${project.name} | Muhammad Sufiyan Project`,
    description: `${project.name}: ${project.tagline} Built with ${project.technologies.join(', ')}.`,
    path: `/projects/${project.slug}`,
    image: project.image,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const path = `/projects/${project.slug}`;
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    url: absoluteUrl(path),
    image: absoluteUrl(project.image),
    description: project.description,
    creator: { '@id': `${site.url}/#person` },
    keywords: project.technologies,
  };
  const softwareSchema = project.softwareApplication
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: project.name,
        url: project.live ?? absoluteUrl(path),
        image: absoluteUrl(project.image),
        applicationCategory: 'UtilitiesApplication',
        creator: { '@id': `${site.url}/#person` },
        programmingLanguage: project.technologies,
      }
    : null;

  return (
    <main className="px-5 pb-20 pt-32 sm:px-6 lg:px-8">
      <JsonLd id={`${project.slug}-webpage-schema`} data={webPageSchema(path, `${project.name} Project`, project.description)} />
      <JsonLd id={`${project.slug}-breadcrumb-schema`} data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }, { name: project.name, path }])} />
      <JsonLd id={`${project.slug}-project-schema`} data={projectSchema} />
      {softwareSchema ? <JsonLd id={`${project.slug}-software-schema`} data={softwareSchema} /> : null}
      <article className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-accent">{project.category} Project</p>
        <h1 className="font-display text-5xl uppercase leading-none text-text sm:text-6xl">{project.name}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{project.tagline}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/projects" className="btn-secondary focus-ring">
            Explore projects by Muhammad Sufiyan
          </Link>
          <Link href="/contact" className="btn-secondary focus-ring">
            Contact Muhammad Sufiyan
          </Link>
        </div>

        <div className="mt-10 overflow-hidden border border-line bg-surface shadow-clean">
          <Image src={project.image} alt={project.imageAlt} width={1280} height={720} sizes="100vw" className="h-auto w-full" priority />
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="self-start space-y-6">
            <section className="border border-line bg-surface p-6">
              <h2 className="text-2xl font-bold text-text">Problem Solved</h2>
              <p className="mt-4 leading-8 text-muted">{project.problem}</p>
            </section>
            <section className="border border-line bg-surface p-6">
              <h2 className="text-2xl font-bold text-text">Technologies Used</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="border border-line bg-ink px-3 py-1 text-sm font-semibold text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>
          <section className="self-start border border-line bg-surface p-6">
            <h2 className="text-2xl font-bold text-text">Key Features</h2>
            <ul className="mt-4 grid gap-3">
              {project.features.map((feature) => (
                <li key={feature} className="border border-line bg-ink p-4 text-sm font-semibold text-text">
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={project.github ?? site.github} target="_blank" rel="noopener noreferrer" className="btn-secondary focus-ring">
                <FiGithub aria-hidden="true" />
                GitHub
              </a>
              <a href={project.live ?? '/contact'} target={project.live ? '_blank' : undefined} rel={project.live ? 'noopener noreferrer' : undefined} className="btn-primary focus-ring">
                <FiExternalLink aria-hidden="true" />
                {project.live ? 'Live Demo' : 'Contact Me'}
              </a>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
