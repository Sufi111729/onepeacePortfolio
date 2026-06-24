import React from 'react';
import {
  SiEclipseide,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiPostman,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
} from 'react-icons/si';
import { FaCss3Alt, FaJava } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import { TbApi, TbDatabaseCog, TbServerCog } from 'react-icons/tb';
import Section from './Section.jsx';

const categories = [
  {
    title: 'Frontend',
    icon: SiReact,
    skills: [
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: FaCss3Alt },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'React.js', icon: SiReact },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    title: 'Backend',
    icon: TbServerCog,
    skills: [
      { name: 'Java', icon: FaJava },
      { name: 'Spring Boot', icon: SiSpringboot },
      { name: 'Hibernate', icon: TbDatabaseCog },
      { name: 'JDBC', icon: TbApi },
      { name: 'REST APIs', icon: TbApi },
    ],
  },
  {
    title: 'Database & Tools',
    icon: TbDatabaseCog,
    skills: [
      { name: 'MySQL', icon: SiMysql },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Postman', icon: SiPostman },
      { name: 'VS Code', icon: VscCode },
      { name: 'Eclipse', icon: SiEclipseide },
    ],
  },
];

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Technical toolkit" title="Skills & Arsenal" className="bg-ink">
      <div className="grid gap-5 lg:grid-cols-3">
        {categories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <article key={category.title} className="border border-line bg-surface p-5 shadow-clean">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center border border-accent/55 text-accent">
                  <CategoryIcon aria-hidden="true" size={22} />
                </span>
                <h3 className="text-xl font-bold text-text">{category.title}</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div key={skill.name} className="skill-card">
                      <Icon aria-hidden="true" className="text-accent" size={21} />
                      <span>{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
