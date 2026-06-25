import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { publicRoutes, site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    ...publicRoutes,
    ...projects.map((project) => `/projects/${project.slug}`),
  ];

  return routes.map((route) => ({
    url: route === '/' ? `${site.url}/` : `${site.url}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/projects' ? 0.9 : 0.7,
  }));
}
