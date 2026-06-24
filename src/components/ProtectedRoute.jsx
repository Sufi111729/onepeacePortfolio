import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setChecking(false);
    });

    return () => {
      active = false;
    };
  }, []);

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

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
