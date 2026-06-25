import type { Metadata } from 'next';
import { AiWebAppSection } from '@/components/AiWebAppSection';
import { JsonLd } from '@/components/JsonLd';
import { SkillsSection } from '@/components/SkillsSection';
import { pageMetadata } from '@/data/site';
import { breadcrumbSchema, createMetadata, webPageSchema } from '@/lib/seo';

export const metadata: Metadata = createMetadata({ ...pageMetadata.skills, path: '/skills' });

export default function SkillsPage() {
  return (
    <main className="pt-16">
      <JsonLd id="skills-webpage-schema" data={webPageSchema('/skills', pageMetadata.skills.title, pageMetadata.skills.description)} />
      <JsonLd id="skills-breadcrumb-schema" data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Skills', path: '/skills' }])} />
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-5xl uppercase leading-none text-text sm:text-6xl">Java Full Stack Developer & AI Web App Skills</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            Technical skills across React, JavaScript, Java, Spring Boot, SQL, REST APIs, AI APIs, prompt engineering
            basics, AI chat interfaces, and prompt-based web application features.
          </p>
        </div>
      </section>
      <SkillsSection />
      <AiWebAppSection />
    </main>
  );
}
