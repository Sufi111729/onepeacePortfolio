import type { Metadata } from 'next';
import { AboutSection } from '@/components/AboutSection';
import { AiWebAppSection } from '@/components/AiWebAppSection';
import { ContactSection } from '@/components/ContactSection';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { site } from '@/data/site';
import { createMetadata, webPageSchema } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Muhammad Sufiyan | Full Stack Developer & AI Web Application Developer',
  description:
    'Muhammad Sufiyan is a Full Stack Developer building scalable web applications, Java Spring Boot backends, React interfaces, REST APIs, database-driven systems, and prompt-based AI web application features.',
  path: '/',
});

export default function HomePage() {
  return (
    <main>
      <JsonLd id="home-webpage-schema" data={webPageSchema('/', site.title, site.description)} />
      <Hero />
      <AboutSection compact />
      <SkillsSection />
      <ProjectsSection />
      <AiWebAppSection />
      <ContactSection />
    </main>
  );
}
