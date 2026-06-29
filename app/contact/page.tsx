import type { Metadata } from 'next';
import Link from 'next/link';
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
            Use the public contact options on this portfolio to reach Muhammad Sufiyan about Java Full Stack
            development, Spring Boot applications, React websites, API development, and practical web application ideas.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/projects" className="btn-secondary focus-ring">
              View projects by Muhammad Sufiyan
            </Link>
            <Link href="/about" className="btn-secondary focus-ring">
              Learn more about Muhammad Sufiyan
            </Link>
          </div>
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
