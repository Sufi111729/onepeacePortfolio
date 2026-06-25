import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center px-5 py-24 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-accent">404</p>
        <h1 className="font-display text-5xl uppercase leading-none text-text sm:text-6xl">Page Not Found</h1>
        <p className="mt-5 text-lg leading-8 text-muted">The page you are looking for does not exist on this portfolio.</p>
        <Link href="/" className="btn-primary mt-8 focus-ring">
          Back to Home
        </Link>
      </section>
    </main>
  );
}
