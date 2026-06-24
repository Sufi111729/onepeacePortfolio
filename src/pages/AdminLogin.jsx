import React, { useEffect, useState } from 'react';
import { FiLock, FiLogIn } from 'react-icons/fi';
import { supabase } from '../lib/supabase';

function navigateTo(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) {
        navigateTo('/admin/messages');
      }
    });

    return () => {
      active = false;
    };
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message || 'Login failed. Please check your credentials.');
        return;
      }

      navigateTo('/admin/messages');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'Network error. Please check your Supabase URL and internet connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink px-5 py-12 text-text sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <form
          onSubmit={handleLogin}
          className="w-full border border-line bg-surface p-6 shadow-clean sm:p-8"
          aria-label="Admin login form"
        >
          <span className="mb-5 flex h-12 w-12 items-center justify-center border border-accent/60 text-accent">
            <FiLock aria-hidden="true" size={22} />
          </span>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-accent">Admin Access</p>
          <h1 className="font-display text-4xl uppercase leading-none text-text">Messages Login</h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            Sign in with your Supabase admin account to view contact messages.
          </p>

          <div className="mt-8 grid gap-5">
            <label className="form-field">
              <span>Email</span>
              <input
                type="email"
                autoComplete="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label className="form-field">
              <span>Password</span>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            {errorMessage && (
              <p className="border border-accent/60 bg-accent/10 px-4 py-3 text-sm font-semibold text-red-200" role="alert">
                {errorMessage}
              </p>
            )}
            <button type="submit" className="btn-primary justify-center focus-ring" disabled={loading}>
              <FiLogIn aria-hidden="true" />
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
