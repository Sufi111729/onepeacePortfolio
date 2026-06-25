'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiShield } from 'react-icons/fi';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const configError = !supabase ? 'Missing Supabase environment variables.' : '';

  useEffect(() => {
    let active = true;

    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (!data.session) {
        router.replace('/admin/login');
        return;
      }
      setSession(data.session);
      setChecking(false);
    });

    return () => {
      active = false;
    };
  }, [router]);

  if (configError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-5 text-text">
        <p className="border border-accent/60 bg-accent/10 px-5 py-4 text-sm font-semibold text-red-200" role="alert">
          {configError}
        </p>
      </main>
    );
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-5 text-text">
        <div className="w-full max-w-sm border border-line bg-surface p-6 text-center shadow-clean">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-accent/60 text-accent">
            <FiShield aria-hidden="true" size={22} />
          </span>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-text">Verifying session</p>
          <p className="mt-3 text-sm leading-6 text-muted">Checking secure admin access...</p>
        </div>
      </main>
    );
  }

  return session ? children : null;
}
