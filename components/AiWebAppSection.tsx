import { FiCpu, FiFileText, FiLayers, FiMessageCircle, FiPenTool, FiZap } from 'react-icons/fi';

const buildChips = [
  'Prompt-Based Tools',
  'AI API Integration',
  'Chat Interfaces',
  'Smart Forms',
  'Document Workflows',
  'React + Spring Boot',
];

const aiFeatures = [
  {
    title: 'Prompt-Based AI Features',
    description: 'Interactive features that use structured prompts to help users generate, transform, or improve content.',
    icon: FiPenTool,
  },
  {
    title: 'AI Chat Interfaces',
    description: 'Chat-style web experiences designed for clear user input, useful responses, and smooth frontend interaction.',
    icon: FiMessageCircle,
  },
  {
    title: 'AI API Integration',
    description: 'Connecting AI APIs with React interfaces, backend services, forms, and application workflows.',
    icon: FiZap,
  },
  {
    title: 'Document Upload & Processing UI',
    description: 'Interfaces for uploading documents, showing processing states, and presenting useful results clearly.',
    icon: FiFileText,
  },
  {
    title: 'AI-Powered Web Applications',
    description:
      'Practical AI-enabled features built into full stack applications using React, Java, Spring Boot, APIs, and database workflows.',
    icon: FiLayers,
    wide: true,
  },
];

export function AiWebAppSection() {
  return (
    <section id="ai-web-apps" className="scroll-mt-24 bg-[#090909] px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-20">
          <div className="self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">AI Web Apps</p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
              AI Web Application Features
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted sm:text-lg">
              I build AI-enabled web features using clear prompts, AI APIs, and practical frontend and backend
              integration. My current focus includes chat interfaces, AI-assisted forms, document upload experiences,
              and prompt-based tools that fit into React and Java Spring Boot applications.
            </p>

            <div className="mt-7 rounded-md border border-line bg-surface/70 p-5">
              <div className="flex items-center gap-3">
                <span className="ai-feature-icon">
                  <FiCpu aria-hidden="true" size={19} />
                </span>
                <h3 className="text-base font-bold text-text">What I Build</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {buildChips.map((chip) => (
                  <span key={chip} className="border border-line bg-ink px-3 py-1.5 text-xs font-semibold leading-5 text-muted">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {aiFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className={`ai-feature-card ${feature.wide ? 'sm:col-span-2' : ''}`}>
                  <span className="ai-feature-icon">
                    <Icon aria-hidden="true" size={20} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold leading-6 text-text">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
