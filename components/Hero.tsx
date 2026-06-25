'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { FiCode, FiDownload, FiFolder, FiLayers, FiMail, FiTrendingUp, FiZap } from 'react-icons/fi';

const stats = [
  { icon: FiFolder, label: '3', text: 'Featured Projects' },
  { icon: FiZap, label: 'AI APIs', text: 'Prompt-Based Features' },
  { icon: FiLayers, label: 'Java + React', text: 'Full Stack' },
  { icon: FiTrendingUp, label: 'India', text: 'Remote Ready' },
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : -42]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-5 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-24">
      <motion.div style={{ y }} className="hero-wallpaper-bg">
        <Image
          src="/muhammad-sufiyan-java-full-stack-developer-hero.webp"
          alt="Muhammad Sufiyan, Full Stack Developer and AI web application developer in India"
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          priority
          className="object-cover"
        />
      </motion.div>
      <div className="hero-mobile-overlay absolute inset-0 bg-[linear-gradient(90deg,#070707_0%,rgba(7,7,7,0.94)_34%,rgba(7,7,7,0.68)_58%,rgba(7,7,7,0.2)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(7,7,7,0.78),#070707_88%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-line" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-accent">Muhammad Sufiyan</p>
          <h1 className="hero-title font-display text-5xl uppercase leading-[0.96] text-text sm:text-6xl lg:text-7xl">
            <span className="block">Full Stack</span>
            <span className="block">Developer</span>
            <span className="block text-accent">AI Web Apps</span>
          </h1>
          <h2 className="mt-6 max-w-2xl border-l-2 border-accent pl-4 text-lg font-bold uppercase leading-7 tracking-[0.1em] text-text sm:text-xl">
            Building scalable Java, React, and prompt-based AI web applications
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            I am Muhammad Sufiyan, a Full Stack Developer focused on Java, Spring Boot, React, REST APIs, databases,
            responsive interfaces, and practical AI API features for useful web applications.
          </p>

          <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap">
            <Link href="/projects" className="btn-primary focus-ring">
              <FiCode aria-hidden="true" />
              View Projects
            </Link>
            <Link href="/resume" className="btn-secondary focus-ring">
              <FiDownload aria-hidden="true" />
              Download Resume
            </Link>
            <Link href="/contact" className="btn-secondary focus-ring">
              <FiMail aria-hidden="true" />
              Contact Me
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={`${item.label}-${item.text}`} className="stat-card" whileHover={reduceMotion ? undefined : { y: -4 }} transition={{ duration: 0.2 }}>
                  <span className="stat-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <strong>{item.label}</strong>
                  <span>{item.text}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
