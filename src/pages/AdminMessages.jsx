import React, { useEffect, useState } from 'react';
import { FiLogOut, FiMail, FiRefreshCw } from 'react-icons/fi';
import { supabase } from '../lib/supabase';

function navigateTo(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function formatDate(value) {
  if (!value) return 'Unknown';

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function AdminMessages() {
  const [authChecked, setAuthChecked] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function fetchMessages() {
    setLoading(true);
    setErrorMessage('');

    const { data, error } = await supabase
      .from('contact_messages')
      .select('id, full_name, email, message, created_at')
      .order('created_at', { ascending: false });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Could not load contact messages.');
      return;
    }

    setMessages(data || []);
  }

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;

      if (!data.session) {
        navigateTo('/admin/login');
        return;
      }

      setAdminEmail(data.session.user.email || '');
      setAuthChecked(true);
      fetchMessages();
    });

    return () => {
      active = false;
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigateTo('/admin/login');
  }

  if (!authChecked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-5 text-text">
        <p className="border border-line bg-surface px-5 py-4 text-sm font-semibold text-muted">
          Checking admin session...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink px-5 py-10 text-text sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-accent">Admin Dashboard</p>
            <h1 className="font-display text-4xl uppercase leading-none text-text sm:text-5xl">Contact Messages</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
              Latest portfolio contact submissions from Supabase.
            </p>
            {adminEmail && (
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Signed in as <span className="text-accent">{adminEmail}</span>
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" className="btn-secondary focus-ring" onClick={fetchMessages} disabled={loading}>
              <FiRefreshCw aria-hidden="true" />
              Refresh
            </button>
            <button type="button" className="btn-outline focus-ring" onClick={handleLogout}>
              <FiLogOut aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>

        {loading && (
          <p className="mt-8 border border-line bg-surface px-5 py-4 text-sm font-semibold text-muted">
            Loading messages...
          </p>
        )}

        {errorMessage && (
          <p className="mt-8 border border-accent/60 bg-accent/10 px-5 py-4 text-sm font-semibold text-red-200" role="alert">
            {errorMessage}
          </p>
        )}

        {!loading && !errorMessage && messages.length === 0 && (
          <div className="mt-8 flex min-h-64 items-center justify-center border border-line bg-surface p-8 text-center">
            <div>
              <FiMail aria-hidden="true" className="mx-auto mb-4 text-accent" size={32} />
              <p className="text-lg font-bold text-text">No contact messages yet.</p>
            </div>
          </div>
        )}

        {!loading && !errorMessage && messages.length > 0 && (
          <>
            <div className="mt-8 hidden overflow-hidden border border-line bg-surface lg:block">
              <table className="w-full border-collapse text-left">
                <thead className="border-b border-line bg-[#0b0b0b] text-xs uppercase tracking-[0.16em] text-muted">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Message</th>
                    <th className="px-5 py-4">Date and time</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((item) => (
                    <tr key={item.id} className="border-b border-line align-top last:border-b-0">
                      <td className="px-5 py-4 font-semibold text-text">{item.full_name}</td>
                      <td className="px-5 py-4 text-muted">{item.email}</td>
                      <td className="max-w-xl px-5 py-4 leading-7 text-muted">{item.message}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-muted">{formatDate(item.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-4 lg:hidden">
              {messages.map((item) => (
                <article key={item.id} className="border border-line bg-surface p-5">
                  <div className="flex flex-col gap-1 border-b border-line pb-4">
                    <h2 className="text-lg font-bold text-text">{item.full_name}</h2>
                    <a href={`mailto:${item.email}`} className="text-sm font-semibold text-accent focus-ring">
                      {item.email}
                    </a>
                  </div>
                  <p className="mt-4 leading-7 text-muted">{item.message}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    {formatDate(item.created_at)}
                  </p>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
