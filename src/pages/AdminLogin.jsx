import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEye, FiEyeOff, FiLock, FiLogIn } from 'react-icons/fi';
import { supabase } from '../lib/supabase';
import RouteMeta from '../components/RouteMeta.jsx';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) {
        navigate('/admin/messages', { replace: true });
      }
    });

    return () => {
      active = false;
    };
  }, [navigate]);

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

      navigate('/admin/messages', { replace: true });
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'Network error. Please check your Supabase URL and internet connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink px-5 py-12 text-text sm:px-6 lg:px-8">
      <RouteMeta robots="noindex, nofollow" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(225,29,46,0.13),transparent_32%),linear-gradient(180deg,rgba(17,18,20,0.32),transparent_46%)]" />
      <section className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <form
          onSubmit={handleLogin}
          className="w-full border border-line bg-surface p-6 shadow-clean sm:p-8"
          aria-label="Admin login form"
        >
          <span className="mb-5 flex h-12 w-12 items-center justify-center border border-accent/60 text-accent">
            <FiLock aria-hidden="true" size={22} />
          </span>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-accent">Sufi Portfolio Admin</p>
          <h1 className="font-display text-4xl uppercase leading-none text-text">Admin Access</h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            Sign in to manage contact messages securely.
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
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="pr-14"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-muted transition hover:text-accent focus-ring"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                </button>
              </div>
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
            <Link to="/" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-muted transition hover:text-accent focus-ring">
              <FiArrowLeft aria-hidden="true" />
              Back to Portfolio
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
