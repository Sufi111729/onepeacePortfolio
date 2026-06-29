import Link from 'next/link';
import { AnimatedSection } from '@/components/AnimatedSection';
import { site } from '@/data/site';

export function AboutSection({ compact = false }: { compact?: boolean }) {
  return (
    <AnimatedSection id="about" eyebrow="About" title="About Muhammad Sufiyan" className="bg-[#090909]">
      <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border border-line bg-surface p-5 shadow-clean sm:p-6">
          <p className="text-base leading-8 text-muted sm:text-lg">
            I am Muhammad Sufiyan, a Java Full Stack Developer in India focused on building practical web applications
            with Java, Spring Boot, React, JavaScript, REST APIs, SQL databases, and responsive frontend interfaces.
          </p>
          {!compact ? (
            <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
              This portfolio includes projects such as FileWalaTool, MangaLok, and a Resume Builder, along with skills
              in Git, GitHub, Vercel deployment, API integration, TypeScript, and full stack development workflows.
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/projects" className="btn-small btn-small-accent focus-ring">
              View projects by Muhammad Sufiyan
            </Link>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn-small focus-ring">
              Visit Sufi111729 on GitHub
            </a>
          </div>
        </div>
        <div className="grid items-start gap-3 sm:grid-cols-2">
          {['Java full stack development', 'Spring Boot backend systems', 'React frontend interfaces', 'REST API integrations', 'SQL and MySQL database work', 'JavaScript and TypeScript', 'Git and GitHub workflow', 'Vercel deployment'].map((item) => (
            <div key={item} className="self-start border border-line bg-ink p-4 text-sm font-semibold leading-6 text-text">
              {item}
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
