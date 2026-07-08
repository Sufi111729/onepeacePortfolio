import type { Metadata } from 'next';
import Link from 'next/link';
import { AboutSection } from '@/components/AboutSection';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata, site } from '@/data/site';
import { breadcrumbSchema, createMetadata, webPageSchema } from '@/lib/seo';

export const metadata: Metadata = createMetadata({ ...pageMetadata.about, path: '/about' });

export default function AboutPage() {
  return (
    <main className="pt-16">
      <JsonLd id="about-webpage-schema" data={webPageSchema('/about', pageMetadata.about.title, pageMetadata.about.description)} />
      <JsonLd id="about-breadcrumb-schema" data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-5xl uppercase leading-none text-text sm:text-6xl">About Muhammad Sufiyan</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            Java Full Stack Developer in India building Spring Boot backends, React interfaces, REST APIs, database
            applications, and responsive web experiences.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/" className="btn-secondary focus-ring">
              Visit Homepage
            </Link>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn-secondary focus-ring">
              View GitHub
            </a>
          </div>
        </div>
      </section>
      <AboutSection />
    </main>
  );
}
