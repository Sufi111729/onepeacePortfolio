import React from 'react';
import Section from './Section.jsx';

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="About Muhammad Sufiyan" className="bg-[#090909]">
      <div className="max-w-4xl border border-line bg-surface p-5 shadow-clean sm:p-6">
        <p className="text-base leading-8 text-muted sm:text-lg">
          Muhammad Sufiyan is a Java Full Stack Developer in India focused on practical web
          applications with Java, Spring Boot, React.js, MySQL, JavaScript, and REST APIs. This
          portfolio highlights real projects, technical skills, resume access, and contact details
          for Java full stack development opportunities.
        </p>
      </div>
    </Section>
  );
}
