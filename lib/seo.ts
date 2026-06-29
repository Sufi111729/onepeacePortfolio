import type { Metadata } from 'next';
import { site } from '@/data/site';

export function absoluteUrl(path = '/') {
  return path === '/' ? `${site.url}/` : `${site.url}${path}`;
}

export function createMetadata({
  title,
  description,
  path = '/',
  image = site.ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords: site.keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Muhammad Sufiyan Portfolio',
      type: 'website',
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: site.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@Sufi111729',
      images: [absoluteUrl(image)],
    },
  };
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: 'Muhammad Sufiyan',
  alternateName: ['Md Sufi', 'Sufi111729'],
  url: `${site.url}/`,
  jobTitle: 'Java Full Stack Developer',
  description:
    'Java Full Stack Developer in India specializing in Java, Spring Boot, React, REST APIs, MySQL, responsive web applications, and practical AI-powered features.',
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  sameAs: ['https://github.com/Sufi111729'],
  knowsAbout: [
    'Java',
    'Spring Boot',
    'React',
    'TypeScript',
    'JavaScript',
    'REST APIs',
    'MySQL',
    'Full Stack Development',
    'Web Development',
  ],
};

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: 'Muhammad Sufiyan Portfolio',
    url: `${site.url}/`,
    publisher: { '@id': `${site.url}/#person` },
  };
}

export function webPageSchema(path: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#person` },
  };
}

export function profilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${site.url}/#profile`,
    url: `${site.url}/`,
    name: 'Muhammad Sufiyan Portfolio',
    mainEntity: { '@id': `${site.url}/#person` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
