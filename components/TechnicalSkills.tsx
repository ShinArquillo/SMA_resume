'use client'

import { motion } from 'framer-motion'
import SectionShell from './SectionShell'

const skillCategories: { category: string; skills: string[] }[] = [
  {
    category: 'Growth & Ads',
    skills: [
      'Google Ads',
      'Conversion Tracking',
      'Technical SEO',
      'Microsoft Clarity',
      'Reporting',
    ],
  },
  {
    category: 'Data Analysis',
    skills: [
      'Dashboards',
      'SQL Reporting',
      'Predictive Analytics',
      'Business Analytics',
      'Data Cleaning',
    ],
  },
  {
    category: 'Applied AI',
    skills: [
      'Visual Search (MobileNet + KNN)',
      'Forecasting Models',
      'LLM Fine-Tuning',
      'Recommendations',
    ],
  },
  {
    category: 'Frontend',
    skills: ['React', 'PWA', 'Chrome Extensions', 'JavaScript', 'HTML/CSS', 'UI/UX', 'Figma'],
  },
  {
    category: 'Backend',
    skills: ['Python', 'Flask', 'PHP', 'C# / WinForms', 'REST APIs', 'SQL (PostgreSQL / Supabase)'],
  },
  {
    category: 'Delivery',
    skills: [
      'Project Leadership',
      'UAT',
      'Process Mapping',
      'Automation Anywhere',
      'Documentation',
    ],
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function TechnicalSkills() {
  return (
    <SectionShell
      id="skills"
      index="03"
      title="Technical Skills"
      eyebrow="Toolkit"
      caption="Full-stack delivery paired with analytics and paid growth, so a build does not stop at handoff."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {skillCategories.map(({ category, skills }, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: (index % 2) * 0.07 + Math.floor(index / 2) * 0.05, ease }}
            whileHover={{ y: -4 }}
            className="card card-hover group p-6 md:p-7"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="t-display text-lg font-semibold tracking-tight md:text-xl">
                {category}
              </h3>
              <span className="font-mono text-[11px] tabular-nums tracking-[0.16em] text-muted transition-colors duration-300 group-hover:text-accent-text">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <span className="mt-4 block h-px w-full bg-line">
              <span className="block h-px w-0 bg-accent transition-all duration-700 ease-out group-hover:w-full" />
            </span>

            <ul className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.li
                  key={skill}
                  className="chip"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-6% 0px' }}
                  transition={{ delay: i * 0.04, duration: 0.4, ease }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}
