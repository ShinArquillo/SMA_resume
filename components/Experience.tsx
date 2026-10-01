'use client'

import { motion } from 'framer-motion'
import SectionShell from './SectionShell'

interface Role {
  role: string
  company: string
  current?: boolean
  meta: string
  period: string
  location: string
  bullets: string[]
  skills: string[]
}

const experiences: Role[] = [
  {
    role: 'Full-Stack Developer',
    company: 'Tee Vision Printing (TVP)',
    current: true,
    meta: 'Frontend · Backend · Internal Tools · Remote',
    period: 'Apr 2026 to Present',
    location: 'Philadelphia, PA · Remote',
    bullets: [
      'Cut operating costs by consolidating hosting and refactoring a fragmented codebase.',
      'Built three internal systems from scratch: an Employee Portal PWA used by 15 staff, an expenses / Ads / SEO operations portal, and CRM + auth tooling.',
      'Shipped Chrome extensions that pull finance data from outside platforms into internal reporting.',
      'Maintain the live storefront and run Google Ads: conversion tracking, Microsoft Clarity, technical SEO.',
    ],
    skills: ['React', 'Internal Tools', 'Chrome Extensions', 'Google Ads', 'SEO'],
  },
  {
    role: 'Freelance Systems Developer',
    company: 'Self-Employed',
    meta: 'Project Lead · Full-Stack · Client Commissions · Philippines',
    period: '2025 to Present',
    location: 'Philippines',
    bullets: [
      'Lead client systems end to end: scope, build, UAT, production deployment.',
      'Delivered DFB Smart Shop, an ecommerce site with AI visual search, now live.',
    ],
    skills: ['Project Lead', 'Full-Stack', 'UAT'],
  },
  {
    role: 'Product & Innovation Intern',
    company: 'Tech Executive Labs I.T. Solutions',
    meta: 'Internship · Hybrid',
    period: 'Feb to May 2026',
    location: 'Batangas, Calabarzon',
    bullets: [
      'Led information architecture and publishing workflows for the Bookside marketplace.',
      'Prototyped buyer browsing and seller analytics in Figma.',
    ],
    skills: ['Business Analysis', 'UI/UX', 'Figma'],
  },
  {
    role: 'Customer Service Representative',
    company: 'Amazon / Alorica (SM Lipa City)',
    meta: 'Full-time',
    period: 'Jun to Aug 2025',
    location: 'Lipa, Calabarzon',
    bullets: [
      'Resolved high-volume customer issues within SLA; earned team commendations and performance incentives.',
    ],
    skills: ['CRM', 'Communication', 'Customer Support'],
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function Experience() {
  return (
    <SectionShell
      id="experience"
      index="01"
      title="Experience"
      eyebrow="Career"
      caption="Four roles across engineering, growth, and delivery. Currently shipping production work for a US apparel brand."
    >
      <div className="-mx-4 md:-mx-6">
        {experiences.map((exp, index) => (
          <motion.article
            key={exp.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
            transition={{ duration: 0.7, delay: index * 0.06, ease }}
            className="group relative rounded-2xl px-4 py-9 transition-colors duration-500 hover:bg-[color-mix(in_srgb,var(--accent)_5%,transparent)] md:px-6 md:py-11"
          >
            {/* hairline divider that turns gold on hover */}
            <span className="absolute inset-x-4 top-0 h-px bg-line md:inset-x-6" />
            <span className="absolute inset-x-4 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100 md:inset-x-6" />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-mono text-[11.5px] tabular-nums tracking-[0.16em] text-accent-text">
                {String(index + 1).padStart(2, '0')}
              </span>
              {exp.current && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-text">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  Current
                </span>
              )}
              <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted">
                {exp.period}
              </span>
              <span className="text-line">/</span>
              <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted">
                {exp.location}
              </span>
            </div>

            <div className="mt-5 grid gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
              <div>
                <h3 className="t-display text-[1.75rem] font-semibold leading-[1.05] transition-colors duration-300 group-hover:text-accent-text md:text-[2.15rem]">
                  {exp.role}
                </h3>
                <p className="mt-2 text-base text-muted">{exp.company}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-text">
                  {exp.meta}
                </p>
              </div>

              <div>
                <ul className="space-y-3">
                  {exp.bullets.map((item, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[auto_1fr] gap-3.5 text-sm leading-relaxed text-muted md:text-[0.95rem]"
                    >
                      <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <li key={skill} className="chip">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  )
}
