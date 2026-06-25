import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, createMetadata, webPageSchema } from '@/lib/seo';

const title = 'Privacy Policy | Muhammad Sufiyan Portfolio';
const description = 'Privacy policy for the Muhammad Sufiyan portfolio website and contact form.';

export const metadata: Metadata = createMetadata({ title, description, path: '/privacy-policy' });

export default function PrivacyPolicyPage() {
  return (
    <main className="px-5 pb-20 pt-32 sm:px-6 lg:px-8">
      <JsonLd id="privacy-webpage-schema" data={webPageSchema('/privacy-policy', title, description)} />
      <JsonLd id="privacy-breadcrumb-schema" data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy-policy' }])} />
      <article className="mx-auto max-w-4xl">
        <h1 className="font-display text-5xl uppercase leading-none text-text sm:text-6xl">Privacy Policy</h1>
        <div className="mt-8 space-y-6 text-base leading-8 text-muted">
          <p>This portfolio collects only the information a visitor chooses to submit through the contact form, such as name, email address, and message content.</p>
          <p>The information is used to respond to project, job, collaboration, or freelance inquiries. It is not sold or used for misleading advertising.</p>
          <p>External links, including GitHub and project demos, may have their own privacy practices. Visitors should review those services separately.</p>
          <p>To request removal of a message submitted through the website, contact Muhammad Sufiyan by email.</p>
        </div>
      </article>
    </main>
  );
}
