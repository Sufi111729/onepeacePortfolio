import type { Metadata } from 'next';
import { AboutSection } from '@/components/AboutSection';
import { AiWebAppSection } from '@/components/AiWebAppSection';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/data/site';
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
            Full Stack Developer & AI Web Application Developer building Java Spring Boot backends, React interfaces,
            REST APIs, database applications, and prompt-based AI web features.
          </p>
        </div>
      </section>
      <AboutSection />
      <AiWebAppSection />
    </main>
  );
}
