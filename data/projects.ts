export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  technologies: string[];
  features: string[];
  image: string;
  imageAlt: string;
  github?: string;
  live?: string;
  category: 'Full Stack' | 'Frontend' | 'Utility';
  softwareApplication?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'filewalatool',
    name: 'FileWalaTool',
    tagline: 'PDF, image, and document utilities for everyday productivity.',
    description:
      'FileWalaTool is a practical web platform for PDF, image, and document workflows, including compression, conversion, resizing, passport photo creation, and background removal tools.',
    problem:
      'Users often need quick document and image utilities without installing desktop software or moving through complex workflows.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'Document Tools'],
    features: ['PDF merge, split, and compression flows', 'Image compression and resizing', 'Image to PDF and PDF to JPG utilities', 'Passport photo and background removal tools'],
    image: '/projects/filewalatool-pdf-image-tools-project.webp',
    imageAlt: 'FileWalaTool PDF and image tools web application',
    live: 'https://www.filewalatool.com/',
    github: 'https://github.com/mdsufidev',
    category: 'Utility',
    softwareApplication: true,
  },
  {
    slug: 'mangalok',
    name: 'MangaLok',
    tagline: 'A manga reading web application with catalog and chapter reading flows.',
    description:
      'MangaLok is a manga reading application designed around a smooth catalog, readable chapter pages, responsive UI, and backend-driven content management.',
    problem:
      'Manga readers need a clean interface that makes browsing, selecting, and reading chapters simple across devices.',
    technologies: ['React', 'Spring Boot', 'MySQL', 'REST APIs'],
    features: ['Responsive manga catalog interface', 'Chapter reading experience', 'Backend-based content management', 'Database-driven application structure'],
    image: '/projects/mangalok-manga-reading-web-app.webp',
    imageAlt: 'MangaLok React and Spring Boot manga reading web application project',
    github: 'https://github.com/mdsufidev',
    category: 'Full Stack',
  },
  {
    slug: 'resume-builder',
    name: 'Resume Builder',
    tagline: 'An ATS-friendly resume builder with clean editing and export flow.',
    description:
      'Resume Builder helps users create structured resumes with a clean interface and downloadable output suitable for job applications.',
    problem:
      'Students and developers need a simple way to produce readable, recruiter-friendly resumes without fighting complicated document formatting.',
    technologies: ['React', 'JavaScript', 'PDF Export', 'Responsive Design'],
    features: ['ATS-friendly resume sections', 'Clean form-based editing', 'Downloadable resume output', 'Responsive React interface'],
    image: '/projects/resume-builder-react-project.webp',
    imageAlt: 'React resume builder project with ATS-friendly sections',
    github: 'https://github.com/mdsufidev',
    category: 'Frontend',
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
