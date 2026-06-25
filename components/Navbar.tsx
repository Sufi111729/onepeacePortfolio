'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'].map((id) => document.getElementById(id));
    if (!sections.some(Boolean)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveHash(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.35, 0.7] },
    );

    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-ink/88 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link href="/" className="group flex min-w-0 items-center focus-ring" aria-label="Muhammad Sufiyan home">
          <Image src="/mdsufidev-logo.webp" alt="MD Sufi Developer portfolio logo" width={84} height={84} className="h-20 w-20 shrink-0 object-contain" priority />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? activeHash === 'home' : false;
            return (
              <Link key={item.href} href={item.href} className="relative py-2 text-sm font-semibold text-muted transition hover:text-text focus-ring">
                {item.label}
                {isActive ? <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-6 bg-accent" /> : null}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <Link href="/contact" className="btn-outline focus-ring">
            Contact Me
          </Link>
        </div>

        <button
          type="button"
          className="flex min-h-11 min-w-11 items-center justify-center border border-line bg-surface text-text lg:hidden focus-ring"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <FiX aria-hidden="true" size={22} /> : <FiMenu aria-hidden="true" size={22} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-line bg-ink px-5 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-11 border border-transparent px-3 py-3 text-sm font-semibold text-muted hover:border-line hover:bg-surface hover:text-text focus-ring"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
