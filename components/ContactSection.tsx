'use client';

import { FormEvent, useState } from 'react';
import { FiGithub, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { AnimatedSection } from '@/components/AnimatedSection';
import { site } from '@/data/site';
import { supabase } from '@/lib/supabase';

const contacts = [
  { icon: FiMail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: FiGithub, label: 'GitHub', value: 'github.com/Sufi111729', href: site.github },
  { icon: FiMapPin, label: 'Location', value: site.localLocation },
];

export function ContactSection() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedName.length < 2) return setStatus({ type: 'error', message: 'Name must have at least 2 characters.' });
    if (!emailPattern.test(trimmedEmail)) return setStatus({ type: 'error', message: 'Please enter a valid email address.' });
    if (trimmedMessage.length < 10) return setStatus({ type: 'error', message: 'Message must have at least 10 characters.' });

    if (!supabase) {
      window.location.href = `mailto:${site.email}?subject=Portfolio inquiry from ${encodeURIComponent(trimmedName)}&body=${encodeURIComponent(trimmedMessage)}`;
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });
    const { error } = await supabase.from('contact_messages').insert([{ full_name: trimmedName, email: trimmedEmail, message: trimmedMessage }]);
    setLoading(false);

    if (error) return setStatus({ type: 'error', message: error.message || 'Message could not be sent. Please try again.' });
    setStatus({ type: 'success', message: 'Message sent successfully. Thank you!' });
    setFullName('');
    setEmail('');
    setMessage('');
  }

  return (
    <AnimatedSection id="contact" eyebrow="Contact me" title="Contact Muhammad Sufiyan" className="bg-ink">
      <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="self-start">
          <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
            I am open to Full Stack Developer opportunities, Java Spring Boot applications, React websites, API
            development, practical AI-powered web features, internships, and freelance collaborations.
          </p>
          <div className="mt-8 grid gap-4">
            {contacts.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent/55 text-accent">
                    <Icon aria-hidden="true" size={21} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-muted">{item.label}</span>
                    <span className="block break-words text-sm font-semibold text-text sm:text-base">{item.value}</span>
                  </span>
                </>
              );
              return item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="contact-row focus-ring">
                  {content}
                </a>
              ) : (
                <div key={item.label} className="contact-row">
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="self-start border border-line bg-surface p-5 shadow-clean sm:p-6" aria-label="Contact form">
          <div className="grid gap-5">
            <label className="form-field">
              <span>Full Name</span>
              <input type="text" name="name" autoComplete="name" placeholder="Your name" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
            </label>
            <label className="form-field">
              <span>Email Address</span>
              <input type="email" name="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <label className="form-field">
              <span>Message</span>
              <textarea name="message" rows={6} placeholder="Tell me about the opportunity or project" value={message} onChange={(event) => setMessage(event.target.value)} required />
            </label>
            {status.message ? (
              <p className={`border px-4 py-3 text-sm font-semibold ${status.type === 'success' ? 'border-green-500/50 bg-green-500/10 text-green-300' : 'border-accent/60 bg-accent/10 text-red-200'}`} role={status.type === 'error' ? 'alert' : 'status'}>
                {status.message}
              </p>
            ) : null}
            <button type="submit" className="btn-primary justify-center focus-ring" disabled={loading}>
              <FiSend aria-hidden="true" />
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </AnimatedSection>
  );
}
