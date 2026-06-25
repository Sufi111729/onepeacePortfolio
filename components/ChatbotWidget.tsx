'use client';

import { FormEvent, useState } from 'react';
import { FiMail, FiMessageCircle, FiSend, FiX } from 'react-icons/fi';
import { site } from '@/data/site';

const quickPrompts = [
  {
    label: 'Skills',
    answer:
      'Muhammad Sufiyan works with Java, Spring Boot, React, JavaScript, REST APIs, SQL, Git, GitHub, Postman, Vercel, and prompt-based AI web app features.',
  },
  {
    label: 'Projects',
    answer:
      'Featured projects include FileWalaTool, MangaLok, and Resume Builder. You can view project details from the Projects section.',
  },
  {
    label: 'Contact',
    answer: `You can contact Muhammad Sufiyan at ${site.email} or use the contact form on this portfolio.`,
  },
];

type ChatMessage = {
  role: 'bot' | 'user';
  text: string;
};

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'bot',
      text: "Hi, I can answer quick questions about Muhammad Sufiyan's skills, projects, and contact details.",
    },
  ]);

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    setMessages((current) => [...current, { role: 'user', text: trimmed }]);
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || 'Chat request failed.');
      }

      setMessages((current) => [
        ...current,
        { role: 'bot', text: data.reply || 'I could not generate a response right now.' },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'bot',
          text: error instanceof Error ? error.message : 'Chat is unavailable right now. Please use the contact form.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleQuickPrompt(answer: string) {
    setMessages((current) => [...current, { role: 'bot', text: answer }]);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {open ? (
        <section className="w-[min(calc(100vw-2.5rem),24rem)] overflow-hidden rounded-md border border-line bg-[#0b0b0c] shadow-clean">
          <header className="flex items-center justify-between border-b border-line bg-surface px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-accent/45 bg-ink text-accent">
                <FiMessageCircle aria-hidden="true" size={19} />
              </span>
              <div>
                <p className="text-sm font-bold text-text">Portfolio Chat</p>
                <p className="text-xs text-muted">Skills, projects, contact</p>
              </div>
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-muted transition hover:text-accent focus-ring"
              aria-label="Close portfolio chat"
              onClick={() => setOpen(false)}
            >
              <FiX aria-hidden="true" size={20} />
            </button>
          </header>

          <div className="max-h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`max-w-[88%] rounded-sm border px-3 py-2 text-sm leading-6 ${
                  item.role === 'user'
                    ? 'ml-auto border-accent/45 bg-accent/10 text-text'
                    : 'border-line bg-surface text-muted'
                }`}
              >
                {item.text}
              </div>
            ))}
            {loading ? (
              <div className="max-w-[88%] rounded-sm border border-line bg-surface px-3 py-2 text-sm leading-6 text-muted">
                Thinking...
              </div>
            ) : null}
          </div>

          <div className="border-t border-line p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt.label}
                  type="button"
                  className="border border-line bg-ink px-3 py-1.5 text-xs font-semibold text-muted transition hover:border-accent/50 hover:text-text focus-ring"
                  onClick={() => handleQuickPrompt(prompt.answer)}
                >
                  {prompt.label}
                </button>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-1.5 border border-line bg-ink px-3 py-1.5 text-xs font-semibold text-muted transition hover:border-accent/50 hover:text-text focus-ring"
              >
                <FiMail aria-hidden="true" />
                Email
              </a>
            </div>

            <form onSubmit={submitMessage} className="flex gap-2">
              <label className="sr-only" htmlFor="portfolio-chat-message">
                Ask a portfolio question
              </label>
              <input
                id="portfolio-chat-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask about skills or projects"
                disabled={loading}
                className="min-w-0 flex-1 border border-line bg-ink px-3 py-2 text-sm text-text outline-none placeholder:text-muted/55 focus:border-accent disabled:cursor-not-allowed disabled:opacity-70"
              />
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent bg-accent text-white transition hover:bg-transparent hover:text-accent focus-ring disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Send chat message"
                disabled={loading}
              >
                <FiSend aria-hidden="true" size={17} />
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        className="flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-accent text-white shadow-clean transition hover:-translate-y-1 hover:bg-transparent hover:text-accent focus-ring"
        aria-label={open ? 'Close portfolio chat' : 'Open portfolio chat'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <FiX aria-hidden="true" size={22} /> : <FiMessageCircle aria-hidden="true" size={22} />}
      </button>
    </div>
  );
}
