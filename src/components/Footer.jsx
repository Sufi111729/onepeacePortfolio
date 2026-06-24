import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const socials = [
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com/Sufi111729' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { icon: FiMail, label: 'Email', href: 'mailto:sufi111729@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#050505] px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-muted">© 2026 Muhammad Sufiyan. Built with passion and clean code.</p>
        <div className="flex items-center gap-3">
          {socials.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="flex h-11 w-11 items-center justify-center border border-line text-muted transition hover:border-accent hover:text-accent focus-ring"
                aria-label={item.label}
              >
                <Icon aria-hidden="true" size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
