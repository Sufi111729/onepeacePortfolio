import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { ProjectsSection } from '@/components/ProjectsSection';
import { pageMetadata } from '@/data/site';
import { breadcrumbSchema, createMetadata, webPageSchema } from '@/lib/seo';

export const metadata: Metadata = createMetadata({ ...pageMetadata.projects, path: '/projects' });

export default function ProjectsPage() {
  return (
    <main className="pt-16">
      <JsonLd id="projects-webpage-schema" data={webPageSchema('/projects', pageMetadata.projects.title, pageMetadata.projects.description)} />
      <JsonLd id="projects-breadcrumb-schema" data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }])} />
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-5xl uppercase leading-none text-text sm:text-6xl">Full Stack, Java, React & AI Web App Projects</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            Real project work from Muhammad Sufiyan, including Java Full Stack applications, React interfaces, document
            tools, and foundations for prompt-based AI web applications.
          </p>
        </div>
      </section>
      <ProjectsSection showAll />
    </main>
  );
}
