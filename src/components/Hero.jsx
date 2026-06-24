import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { FiCode, FiDownload, FiFolder, FiLayers, FiTrendingUp, FiZap } from 'react-icons/fi';
import wallpaperDesktop from '../assets/muhammad-sufiyan-java-full-stack-developer-hero.webp';
import wallpaperMobile from '../assets/muhammad-sufiyan-java-full-stack-developer-hero-mobile-source.webp';
import heroMobileBackground from '../assets/muhammad-sufiyan-java-full-stack-developer-mobile-hero.webp';

const stats = [
  { icon: FiFolder, label: '3', text: 'Featured Projects' },
  { icon: FiZap, label: '30+', text: 'FileWalaTool Utilities' },
  { icon: FiLayers, label: 'Java + React', text: 'Stack' },
  { icon: FiTrendingUp, label: 'Always', text: 'Learning & Building' },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : -42]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden px-5 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-24"
    >
      <motion.picture
        style={{ y, '--hero-mobile-image': `url(${heroMobileBackground})` }}
        className="hero-wallpaper-bg"
      >
        <source srcSet={wallpaperMobile} media="(max-width: 768px)" width="900" height="507" />
        <img
          src={wallpaperDesktop}
          srcSet={`${wallpaperDesktop} 1600w`}
          sizes="(min-width: 1024px) 58vw, 100vw"
          alt="Muhammad Sufiyan, Java Full Stack Developer"
          width="1600"
          height="900"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </motion.picture>
      <div className="hero-mobile-overlay absolute inset-0 bg-[linear-gradient(90deg,#070707_0%,rgba(7,7,7,0.94)_34%,rgba(7,7,7,0.68)_58%,rgba(7,7,7,0.2)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(7,7,7,0.78),#070707_88%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-line" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-accent">HELLO SAMURAI,</p>
          <h1
            className="hero-title font-display text-6xl uppercase leading-[0.92] text-text sm:text-7xl lg:text-8xl"
            aria-label="Muhammad Sufiyan – Java Full Stack Developer"
          >
            <span className="hero-title-im block">I&apos;M</span>
            <span className="block text-accent">MUHAMMAD</span>
            <span className="block">SUFIYAN</span>
          </h1>
          <p className="mt-6 inline-flex border-l-2 border-accent pl-4 text-base font-bold uppercase tracking-[0.22em] text-text sm:text-lg">
            Java Full Stack Developer
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            I am Muhammad Sufiyan, a Java Full Stack Developer focused on building responsive web applications using
            Java, Spring Boot, React, MySQL, and REST APIs. I enjoy turning practical ideas into
            useful digital products.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="btn-primary focus-ring">
              <FiCode aria-hidden="true" />
              View My Projects
            </a>
            <a href="/Muhammad-Sufiyan-Resume.pdf" download className="btn-secondary focus-ring">
              <FiDownload aria-hidden="true" />
              Download Resume
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={`${item.label}-${item.text}`}
                  className="stat-card"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.2 }}
                >
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
