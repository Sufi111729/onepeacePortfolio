import type { Metadata } from 'next';
import { site } from '@/data/site';

export function absoluteUrl(path = '/') {
  return path === '/' ? `${site.url}/` : `${site.url}${path}`;
}

export function createMetadata({
  title,
  description,
  path = '/',
  image = '/opengraph-image',
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
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Muhammad Sufiyan Portfolio',
      type: 'website',
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: `${site.name} portfolio preview` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Sufiyan',
  url: 'https://mdsufidev.vercel.app/',
  jobTitle: 'Full Stack Developer and AI Web Application Developer',
  description:
    'Full Stack Developer specializing in Java, Spring Boot, React, REST APIs, database-driven applications, prompt-based AI web features, and practical AI API integration.',
  sameAs: ['https://github.com/Sufi111729'],
  knowsAbout: [
    'Java',
    'Spring Boot',
    'React',
    'JavaScript',
    'SQL',
    'REST APIs',
    'Full Stack Development',
    'Artificial Intelligence',
    'AI APIs',
    'Prompt Engineering Basics',
    'AI Web Applications',
    'AI Chat Interfaces',
    'Document Processing Basics',
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
