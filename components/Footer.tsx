'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiFileText } from 'react-icons/fi'
import Magnetic from './Magnetic'

const ease = [0.22, 1, 0.36, 1] as const

const profiles = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sheena-mae-arquillo-05b169399' },
  { label: 'GitHub · Personal', href: 'https://github.com/ShinArquillo' },
  { label: 'GitHub · School', href: 'https://github.com/22-36829' },
  { label: 'OnlineJobs.ph', href: 'https://v2.onlinejobs.ph/jobseekers/info/4694400' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-x-clip border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[min(92%,48rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_70%)] blur-3xl"
      />

      <div className="section-pad relative">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="eyebrow"
        >
          Next
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.06, ease }}
          className="t-hero mt-6 max-w-[13ch]"
        >
          Let&rsquo;s build something that ships.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.14, ease }}
          className="mt-8 max-w-prose text-sm leading-relaxed text-muted md:text-base"
        >
          Open to full-time full-stack or data analyst roles — onsite, hybrid, or remote.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Magnetic strength={9}>
            <a href="mailto:arquillosheenamae@gmail.com" className="btn-primary group !px-8 !py-4">
              Get in touch
              <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic strength={9}>
            <Link href="/resume" className="btn-ghost group">
              <FiFileText className="text-sm" aria-hidden />
              Resume
              <FiArrowUpRight className="text-sm opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Magnetic>
          {profiles.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost group"
            >
              {p.label}
              <FiArrowUpRight className="text-sm opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </motion.div>

        <div className="rule mt-16 mb-7" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-base font-semibold tracking-tight">
              Sheena Mae Arquillo
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Full-Stack Developer · Data Analyst · Project Lead
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-[11.5px] text-muted">
            <a href="mailto:arquillosheenamae@gmail.com" className="link-line py-1.5">
              arquillosheenamae@gmail.com
            </a>
            <a
              href="https://github.com/ShinArquillo"
              target="_blank"
              rel="noopener noreferrer"
              className="link-line py-1.5"
            >
              github.com/ShinArquillo
            </a>
            <a
              href="https://github.com/22-36829"
              target="_blank"
              rel="noopener noreferrer"
              className="link-line py-1.5"
            >
              github.com/22-36829
            </a>
            <span>© {year}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
