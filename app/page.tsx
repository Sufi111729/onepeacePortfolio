import type { Metadata } from 'next';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { site } from '@/data/site';
import { createMetadata, webPageSchema } from '@/lib/seo';

const homeMetadata = createMetadata({
  title: site.title,
  description: site.description,
  path: '/',
});

export const metadata: Metadata = {
  ...homeMetadata,
  title: {
    absolute: site.title,
  },
};

export default function HomePage() {
  return (
    <main>
      <JsonLd id="home-webpage-schema" data={webPageSchema('/', site.title, site.description)} />
      <Hero />
      <AboutSection compact />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
