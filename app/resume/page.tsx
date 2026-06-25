import type { Metadata } from 'next';
import Link from 'next/link';
import { FiDownload, FiGithub, FiMail } from 'react-icons/fi';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata, site } from '@/data/site';
import { breadcrumbSchema, createMetadata, webPageSchema } from '@/lib/seo';

export const metadata: Metadata = createMetadata({ ...pageMetadata.resume, path: '/resume' });

export default function ResumePage() {
  return (
    <main className="px-5 pb-20 pt-32 sm:px-6 lg:px-8">
      <JsonLd id="resume-webpage-schema" data={webPageSchema('/resume', pageMetadata.resume.title, pageMetadata.resume.description)} />
      <JsonLd id="resume-breadcrumb-schema" data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Resume', path: '/resume' }])} />
      <section className="mx-auto max-w-7xl">
        <h1 className="font-display text-5xl uppercase leading-none text-text sm:text-6xl">Muhammad Sufiyan Resume</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          Resume for a Full Stack Developer & AI Web Application Developer skilled in Java, Spring Boot, React, REST
          APIs, SQL, AI API integrations, and prompt-based web application features.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={`mailto:${site.email}?subject=Resume request for Muhammad Sufiyan`} className="btn-primary focus-ring">
            <FiDownload aria-hidden="true" />
            Request Resume
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn-secondary focus-ring">
            <FiGithub aria-hidden="true" />
            View GitHub
          </a>
          <Link href="/contact" className="btn-secondary focus-ring">
            <FiMail aria-hidden="true" />
            Contact Me
          </Link>
        </div>
        <article className="mt-10 border border-line bg-surface p-6 shadow-clean">
          <h2 className="text-2xl font-bold text-text">Professional Focus</h2>
          <p className="mt-4 leading-8 text-muted">
            Java Full Stack Developer building scalable web applications and practical AI-assisted features for recruiters,
            startups, software teams, and freelance clients.
          </p>
        </article>
      </section>
    </main>
  );
}
