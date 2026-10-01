'use client'

import { motion } from 'framer-motion'
import SectionShell from './SectionShell'

const courses = [
  'Business Process Management',
  'Systems Analysis & Design',
  'Data Analysis',
  'Database Systems',
  'Automation & Scripting',
  'Software Engineering',
]

const credentials = [
  "Dean's List Scholar",
  'Capstone Project Lead',
  'Applied AI · Visual Search & Forecasting',
]

const ease = [0.22, 1, 0.36, 1] as const

export default function Education() {
  return (
    <SectionShell
      id="education"
      index="05"
      title="Education"
      eyebrow="Academic"
      caption="Information systems, data analysis, and predictive modeling, applied in shipped work."
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease }}
        className="card card-hover group overflow-hidden p-7 md:p-10"
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-muted">
          <span>Graduated 2026</span>
          <span className="text-line">/</span>
          <span>Lipa City, Batangas</span>
        </div>

        <h3 className="t-display mt-4 text-[1.9rem] font-semibold leading-[1.04] transition-colors duration-300 group-hover:text-accent-text md:text-[2.6rem]">
          Batangas State University
        </h3>
        <p className="mt-2 text-base text-muted md:text-lg">BSIT Major in Business Analytics</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {credentials.map((item, i) => (
            <motion.li
              key={item}
              className="chip"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45, ease }}
            >
              {item}
            </motion.li>
          ))}
        </ul>

        <p className="mt-7 max-w-prose text-sm leading-relaxed text-muted">
          Coursework in information systems, data analysis, and predictive modeling. Applied AI in
          shipped work (for example DFB visual search) plus forecasting-oriented recommendations and
          LLM fine-tuning training.
        </p>

        <p className="eyebrow mt-9">Relevant coursework</p>

        <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <motion.li
              key={course}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex items-center gap-3 bg-paper-raised/80 px-4 py-3.5 font-mono text-[11px] text-muted transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--accent)_8%,var(--bg-solid))] hover:text-ink"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
              {course}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </SectionShell>
  )
}
