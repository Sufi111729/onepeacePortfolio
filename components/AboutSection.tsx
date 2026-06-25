import { AnimatedSection } from '@/components/AnimatedSection';

export function AboutSection({ compact = false }: { compact?: boolean }) {
  return (
    <AnimatedSection id="about" eyebrow="About" title="About Muhammad Sufiyan" className="bg-[#090909]">
      <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border border-line bg-surface p-5 shadow-clean sm:p-6">
          <p className="text-base leading-8 text-muted sm:text-lg">
            I am Muhammad Sufiyan, a Full Stack Developer in India specializing in Java Full Stack Development and
            prompt-based AI web application features. I build scalable web applications, Java Spring Boot backend systems, React frontend
            interfaces, REST API integrations, and database-driven applications for practical business needs.
          </p>
          {!compact ? (
            <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
              My current focus includes AI chat interfaces, prompt-based tools, document upload experiences, and useful
              AI API integrations inside real web applications.
            </p>
          ) : null}
        </div>
        <div className="grid items-start gap-3 sm:grid-cols-2">
          {['Full Stack web applications', 'Java Spring Boot backend systems', 'React frontend interfaces', 'REST API integrations', 'Database-driven applications', 'Prompt-based AI tools', 'AI chat interfaces', 'AI API integrations'].map((item) => (
            <div key={item} className="self-start border border-line bg-ink p-4 text-sm font-semibold leading-6 text-text">
              {item}
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
