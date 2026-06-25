import type { Metadata } from 'next';
import { ContactSection } from '@/components/ContactSection';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/data/site';
import { breadcrumbSchema, createMetadata, webPageSchema } from '@/lib/seo';

export const metadata: Metadata = createMetadata({ ...pageMetadata.contact, path: '/contact' });

export default function ContactPage() {
  return (
    <main className="pt-16">
      <JsonLd id="contact-webpage-schema" data={webPageSchema('/contact', pageMetadata.contact.title, pageMetadata.contact.description)} />
      <JsonLd id="contact-breadcrumb-schema" data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-5xl uppercase leading-none text-text sm:text-6xl">Contact Muhammad Sufiyan</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            Contact me for Full Stack development, Java Spring Boot applications, React websites, API development, AI
            prompt-based AI features, AI API integrations, and practical AI web application ideas.
          </p>
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
