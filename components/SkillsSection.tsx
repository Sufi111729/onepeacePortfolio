import { FiCpu, FiDatabase, FiLayout, FiTool } from 'react-icons/fi';
import { aiSkillGroups, coreSkillGroups } from '@/data/skills';

const coreIcons = [FiLayout, FiDatabase, FiTool];

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 bg-ink px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Technical Toolkit</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl lg:text-5xl">
            Java Full Stack <span className="text-accent">&amp;</span> AI Web App Skills
          </h2>
          <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
            Core Java full stack development skills, supported by practical AI web app foundations for prompt-based
            features and API-driven application workflows.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
          {coreSkillGroups.map((category, index) => {
            const Icon = coreIcons[index] ?? FiTool;
            return (
              <article key={category.title} className="skill-core-card">
                <div className="flex items-center gap-3">
                  <span className="skill-icon-box">
                    <Icon aria-hidden="true" size={21} />
                  </span>
                  <h3 className="text-lg font-bold text-text">{category.title}</h3>
                </div>
                <div className="my-4 h-px bg-line" />
                <div className="grid gap-2.5">
                  {category.skills.map((skill) => (
                    <SkillRow key={skill} skill={skill} />
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <article className="skill-ai-panel">
          <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="skill-ai-badge">Building & Learning</span>
              <div className="mt-4 flex items-center gap-3">
                <span className="skill-icon-box">
                  <FiCpu aria-hidden="true" size={21} />
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-text">AI Web Apps & Agentic AI Foundations</h3>
              </div>
              <p className="mt-5 text-base leading-8 text-muted">
                Building AI-powered web experiences with API integrations, prompt-based workflows, document processing
                interfaces, and automation-oriented application features.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {aiSkillGroups.map((group) => (
                <div key={group.title} className="skill-ai-group">
                  <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-accent">{group.title}</h4>
                  <div className="mt-4 grid gap-2.5">
                    {group.skills.map((skill) => (
                      <SkillRow key={skill} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function SkillRow({ skill }: { skill: string }) {
  return (
    <div className="skill-card">
      <span className="h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
      <span>{skill}</span>
    </div>
  );
}
