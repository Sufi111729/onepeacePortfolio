import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, createMetadata, webPageSchema } from '@/lib/seo';

const title = 'Terms and Conditions | Muhammad Sufiyan Portfolio';
const description = 'Terms and conditions for using the Muhammad Sufiyan portfolio website.';

export const metadata: Metadata = createMetadata({ title, description, path: '/terms-and-conditions' });

export default function TermsPage() {
  return (
    <main className="px-5 pb-20 pt-32 sm:px-6 lg:px-8">
      <JsonLd id="terms-webpage-schema" data={webPageSchema('/terms-and-conditions', title, description)} />
      <JsonLd id="terms-breadcrumb-schema" data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Terms and Conditions', path: '/terms-and-conditions' }])} />
      <article className="mx-auto max-w-4xl">
        <h1 className="font-display text-5xl uppercase leading-none text-text sm:text-6xl">Terms and Conditions</h1>
        <div className="mt-8 space-y-6 text-base leading-8 text-muted">
          <p>This website presents the portfolio, skills, projects, and contact details of Muhammad Sufiyan for professional review.</p>
          <p>Project descriptions are provided for informational purposes. Availability, scope, and implementation details may change over time.</p>
          <p>Visitors may not copy website content, images, or project materials in a misleading way or present them as their own work.</p>
          <p>Use of this website does not create an employment, client, or service agreement unless separately agreed in writing.</p>
        </div>
      </article>
    </main>
  );
}
