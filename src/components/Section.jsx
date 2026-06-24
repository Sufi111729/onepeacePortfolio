import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Section({ id, eyebrow, title, children, className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`scroll-mt-24 px-5 py-20 sm:px-6 lg:px-8 ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-4xl uppercase leading-none text-text sm:text-5xl">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
