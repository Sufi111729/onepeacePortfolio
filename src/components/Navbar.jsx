import React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.35, 0.7] },
    );

    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-ink/88 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a href="#home" className="group min-w-0 focus-ring">
          <span className="block truncate text-base font-bold text-text">Muhammad Sufiyan</span>
          <span className="block truncate text-xs font-medium uppercase tracking-[0.18em] text-muted group-hover:text-accent">
            Java Full Stack Developer
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className="relative py-2 text-sm font-semibold text-muted transition hover:text-text focus-ring"
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-6 bg-accent"
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <a href="#contact" className="btn-outline focus-ring">
            Contact Me
          </a>
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

      {open && (
        <div className="border-t border-line bg-ink px-5 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="min-h-11 border border-transparent px-3 py-3 text-sm font-semibold text-muted hover:border-line hover:bg-surface hover:text-text focus-ring"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className="btn-outline mt-2 text-center focus-ring" onClick={() => setOpen(false)}>
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
