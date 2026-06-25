import Link from 'next/link';
import { FiGithub, FiMail } from 'react-icons/fi';
import { site } from '@/data/site';

const socials = [
  { icon: FiGithub, label: 'GitHub profile for Muhammad Sufiyan', href: site.github },
  { icon: FiMail, label: 'Email Muhammad Sufiyan', href: `mailto:${site.email}` },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#050505] px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-muted">&copy; 2026 Muhammad Sufiyan. Built with clean code.</p>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted" aria-label="Footer navigation">
          <Link href="/privacy-policy" className="hover:text-accent focus-ring">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-accent focus-ring">
            Terms
          </Link>
          {socials.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex h-11 w-11 items-center justify-center border border-line text-muted transition hover:border-accent hover:text-accent focus-ring"
                aria-label={item.label}
              >
                <Icon aria-hidden="true" size={20} />
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
