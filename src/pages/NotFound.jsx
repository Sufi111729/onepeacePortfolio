import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5 text-text">
      <section className="w-full max-w-xl border border-line bg-surface p-6 text-center shadow-clean sm:p-8">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-accent">404</p>
        <h1 className="font-display text-5xl uppercase leading-none text-text">Page not found</h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="btn-primary mt-8 focus-ring">
          <FiArrowLeft aria-hidden="true" />
          Back to Portfolio
        </Link>
      </section>
    </main>
  );
}
