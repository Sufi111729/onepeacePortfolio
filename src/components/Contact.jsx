import React, { useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { supabase } from '../lib/supabase';
import Section from './Section.jsx';

const contacts = [
  { icon: FiMail, label: 'Email', value: 'sufi111729@gmail.com', href: 'mailto:sufi111729@gmail.com' },
  { icon: FiGithub, label: 'GitHub', value: 'github.com/Sufi111729', href: 'https://github.com/Sufi111729' },
  { icon: FiMapPin, label: 'Location', value: 'Kushinagar, Uttar Pradesh, India' },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'LinkedIn profile placeholder', href: 'https://www.linkedin.com/' },
];

export default function Contact() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedName.length < 2) {
      setStatus({ type: 'error', message: 'Name must have at least 2 characters.' });
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (trimmedMessage.length < 10) {
      setStatus({ type: 'error', message: 'Message must have at least 10 characters.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    const { error } = await supabase.from('contact_messages').insert([
      {
        full_name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      setStatus({
        type: 'error',
        message: error.message || 'Message could not be sent. Please try again.',
      });
      return;
    }

    setStatus({ type: 'success', message: 'Message sent successfully. Thank you!' });
    setFullName('');
    setEmail('');
    setMessage('');
  }

  return (
    <Section id="contact" eyebrow="Contact me" title="Let's Build Something Great" className="bg-ink">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
            I am open to Java Full Stack Developer opportunities, internships, freelance projects,
            and collaborations. Feel free to reach out for a project, job opportunity, or technical
            discussion.
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
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-row focus-ring"
                >
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

        <form
          onSubmit={handleSubmit}
          className="border border-line bg-surface p-5 shadow-clean sm:p-6"
          aria-label="Contact form"
        >
          <div className="grid gap-5">
            <label className="form-field">
              <span>Full Name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
            </label>
            <label className="form-field">
              <span>Email Address</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label className="form-field">
              <span>Message</span>
              <textarea
                name="message"
                rows="6"
                placeholder="Tell me about the opportunity or project"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
            </label>
            {status.message && (
              <p
                className={`border px-4 py-3 text-sm font-semibold ${
                  status.type === 'success'
                    ? 'border-green-500/50 bg-green-500/10 text-green-300'
                    : 'border-accent/60 bg-accent/10 text-red-200'
                }`}
                role={status.type === 'error' ? 'alert' : 'status'}
              >
                {status.message}
              </p>
            )}
            <button type="submit" className="btn-primary justify-center focus-ring" disabled={loading}>
              <FiSend aria-hidden="true" />
              {loading ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}
