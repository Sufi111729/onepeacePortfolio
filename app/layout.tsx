import type { Metadata, Viewport } from 'next';
import { AppShell } from '@/components/AppShell';
import { JsonLd } from '@/components/JsonLd';
import { personSchema, profilePageSchema, webSiteSchema } from '@/lib/seo';
import { site } from '@/data/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://muhammadsufiyan.filewalatool.com'),
  applicationName: 'Md Sufi Developer',
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Muhammad Sufiyan | Java Full Stack Developer',
    description: site.description,
    url: '/',
    siteName: 'Muhammad Sufiyan Portfolio',
    type: 'website',
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: site.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Sufiyan | Java Full Stack Developer',
    description: site.description,
    images: [site.ogImage],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#070707',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink font-sans text-text antialiased">
        <JsonLd id="person-schema" data={personSchema} />
        <JsonLd id="website-schema" data={webSiteSchema()} />
        <JsonLd id="profile-schema" data={profilePageSchema()} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
