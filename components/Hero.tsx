'use client'

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import Link from 'next/link'
import {
  FiArrowDown,
  FiArrowUpRight,
  FiBriefcase,
  FiFileText,
  FiFolder,
  FiGithub,
  FiLinkedin,
  FiMail,
} from 'react-icons/fi'
import { useTheme } from '@/contexts/ThemeContext'
import Counter from './Counter'
import HeroFrames from './HeroFrames'
import Magnetic from './Magnetic'

const stats = [
  { value: 4, suffix: '', label: 'Professional roles' },
  { value: 3, suffix: '', label: 'Internal systems delivered' },
  { value: 10, suffix: '+', label: 'Live demos and prototypes' },
]

const iconLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sheena-mae-arquillo-05b169399',
    icon: FiLinkedin,
    external: true,
  },
  { label: 'GitHub', href: 'https://github.com/ShinArquillo', icon: FiGithub, external: true },
  {
    label: 'OnlineJobs.ph',
    href: 'https://v2.onlinejobs.ph/jobseekers/info/4694400',
    icon: FiBriefcase,
    external: true,
  },
  { label: 'Projects', href: '#projects', icon: FiFolder, external: false },
] as const

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Stage padding clears the fixed header (top) and the mobile bottom nav
 * (bottom). On phones the copy anchors to the bottom so the portrait stays
 * visible above it; on wider screens it centres beside the portrait.
 */
const stageShell =
  'absolute inset-0 flex items-end px-5 pb-[5.75rem] pt-[5.5rem] sm:px-6 md:items-center md:px-10 md:py-28 lg:max-w-[min(100%,44rem)] lg:pr-8'

function Intro() {
  return (
    <div className="relative z-10 w-full max-w-[40rem]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="mb-5 inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-paper-raised/70 px-3.5 py-1.5 backdrop-blur-sm md:mb-7"
      >
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          Open to full-time · Onsite, hybrid, or remote
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.05, ease }}
        className="hero-title t-hero pb-3"
      >
        <span className="block whitespace-nowrap">Sheena Mae</span>
        <span className="relative inline-block whitespace-nowrap">
          Arquillo
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
            className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full bg-accent"
          />
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.16, ease }}
        className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted md:mt-8"
      >
        <span className="text-ink">Full-Stack Developer</span>
        <span className="text-accent-text">/</span>
        <span className="text-ink">Data Analyst</span>
        <span className="text-accent-text">/</span>
        <span className="text-ink">Project Lead</span>
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.22, ease }}
        className="t-lede mt-4 max-w-[30ch] text-ink md:mt-6"
      >
        I build production software and turn data into decisions.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.28, ease }}
        className="mt-3 max-w-[46ch] text-[0.9rem] leading-relaxed text-muted md:mt-4 md:text-[0.95rem]"
      >
        At Tee Vision Printing I work on the live storefront, internal tools, Chrome extensions, and
        Google Ads. I also lead client commissions from scope through production deployment.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.34, ease }}
        className="relative z-20 mt-6 flex flex-wrap items-center gap-3 md:mt-9"
      >
        <Magnetic strength={8}>
          <a href="mailto:arquillosheenamae@gmail.com" className="btn-primary group">
            <FiMail className="text-sm" aria-hidden />
            Get in touch
            <FiArrowUpRight
              className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        </Magnetic>
        <Magnetic strength={8}>
          <Link href="/resume" className="btn-ghost group">
            <FiFileText className="text-sm" aria-hidden />
            Resume
            <FiArrowUpRight
              className="text-sm opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </Magnetic>
        <Magnetic strength={8} className="hidden sm:inline-flex">
          <a href="#experience" className="btn-ghost group">
            Experience
            <FiArrowDown
              className="text-sm opacity-70 transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden
            />
          </a>
        </Magnetic>
      </motion.div>

      <motion.nav
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.42 }}
        aria-label="Profiles and sections"
        className="relative z-20 mt-5 md:mt-7"
      >
        <ul className="flex items-center gap-2.5">
          {iconLinks.map(({ label, href, icon: Icon, external }) => (
            <li key={label}>
              <Magnetic strength={6}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={label}
                  title={label}
                  className="icon-btn"
                >
                  <Icon className="text-[1.1rem]" />
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
      </motion.nav>
    </div>
  )
}

const proofRows = [
  {
    k: 'Current',
    v: (
      <>
        Full-stack developer at Tee Vision Printing (remote), on the live storefront{' '}
        <a
          href="https://www.teevisionprinting.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-line"
        >
          teevisionprinting.com
        </a>
      </>
    ),
  },
  {
    k: 'Systems',
    v: 'Employee Portal PWA · Ads and SEO operations portal · CRM and authentication · Chrome extensions',
  },
  { k: 'Growth', v: 'Google Ads · conversion tracking · Microsoft Clarity · technical SEO' },
  { k: 'Background', v: 'Tech Executive Labs (Bookside) · client commissions · university capstone' },
]

function Proof() {
  return (
    <div className="relative z-10 w-full max-w-[38rem]">
      <p className="eyebrow">Proof points</p>

      <div className="mt-6 grid grid-cols-3 gap-4 md:mt-8 md:gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="min-w-0 border-t border-line pt-3 md:pt-4"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.55, ease }}
          >
            <div className="t-display text-[2.25rem] font-bold leading-none text-ink md:text-6xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 max-w-[9rem] font-mono text-[11px] uppercase leading-snug tracking-[0.12em] text-muted md:mt-3">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      <dl className="mt-6 max-w-lg space-y-2.5 border-t border-line pt-5 text-[0.9rem] leading-relaxed text-muted md:mt-9 md:space-y-3.5 md:pt-7 md:text-[0.95rem]">
        {proofRows.map((row) => (
          <div key={row.k} className="grid grid-cols-[5.5rem_1fr] gap-3 md:grid-cols-[6.5rem_1fr]">
            <dt className="pt-[0.3em] font-mono text-[11px] uppercase tracking-[0.14em] text-accent-text">
              {row.k}
            </dt>
            <dd>{row.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 md:mt-7">
        <a
          href="#experience"
          className="link-line py-2 font-mono text-[11.5px] uppercase tracking-[0.14em]"
        >
          See experience <FiArrowUpRight className="text-xs" />
        </a>
        <a
          href="#projects"
          className="link-line py-2 font-mono text-[11.5px] uppercase tracking-[0.14em]"
        >
          Browse projects <FiArrowUpRight className="text-xs" />
        </a>
      </div>
    </div>
  )
}

function Sun() {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'
  // Rounded: raw trig output differs in the last float digit between Node and
  // the browser, which trips React's hydration diff on the SVG attributes.
  const rays = Array.from({ length: 10 }, (_, i) => {
    const a = (i * 36 * Math.PI) / 180
    const at = (r: number) => (50 + Math.cos(a) * r).toFixed(3)
    const bt = (r: number) => (50 + Math.sin(a) * r).toFixed(3)
    return { x1: at(28), y1: bt(28), x2: at(42), y2: bt(42) }
  })

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? 'night' : 'day'} mode`}
      title="Toggle day / night"
      className="group absolute right-[6%] top-[14%] z-30 hidden h-20 w-20 transition-transform duration-300 hover:scale-105 active:scale-95 md:block lg:h-24 lg:w-24"
    >
      <div className="absolute inset-[-30%] rounded-full bg-[radial-gradient(circle,rgba(255,205,110,0.45),transparent_70%)] blur-xl dark:bg-[radial-gradient(circle,rgba(200,220,255,0.28),transparent_70%)]" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 text-amber-400/80 dark:text-slate-200/80"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          {rays.map((r, i) => (
            <line
              key={i}
              x1={r.x1}
              y1={r.y1}
              x2={r.x2}
              y2={r.y2}
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              opacity="0.65"
            />
          ))}
        </svg>
      </motion.div>
      <div className="absolute inset-[32%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff7db,#ffd166_55%,#f2a52b)] dark:bg-[radial-gradient(circle_at_35%_30%,#eef3ff,#c9d6ef_55%,#93a6c9)]" />
    </button>
  )
}

function Backdrop({ progress }: { progress?: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-paper">
      {progress ? (
        <BackdropFrames progress={progress} />
      ) : (
        <div className="hero-frame-mask absolute inset-0">
          <HeroFrames />
        </div>
      )}
      {/* Desktop: fade the left column so copy sits on paper, not on the portrait */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-paper from-[8%] via-paper/80 via-[42%] to-transparent to-[70%] md:block" />
      <div className="absolute inset-y-0 left-0 hidden w-[min(48%,34rem)] bg-gradient-to-r from-paper via-paper/40 to-transparent md:block" />
      {/* Mobile: solid scrim under the bottom-anchored copy */}
      <div className="absolute inset-0 bg-gradient-to-t from-paper from-[18%] via-paper/85 via-[48%] to-paper/10 md:from-paper/50 md:via-transparent md:to-paper/30" />
    </div>
  )
}

function BackdropFrames({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0, 1], [1, 1.06])
  const dim = useTransform(progress, [0, 1], [0, 0.12])
  return (
    <>
      <motion.div
        className="hero-frame-mask absolute inset-0 will-change-transform"
        style={{ scale }}
      >
        <HeroFrames progress={progress} />
      </motion.div>
      <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: dim }} />
    </>
  )
}

function Stage({
  opacity,
  pointerEvents,
  y,
  children,
}: {
  opacity: MotionValue<number>
  pointerEvents: MotionValue<'auto' | 'none'>
  y?: MotionValue<number>
  children: ReactNode
}) {
  return (
    <motion.div
      style={{ opacity, pointerEvents, y }}
      className={`${stageShell} will-change-[opacity,transform]`}
    >
      <div className="w-full">{children}</div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const introOpacity = useTransform(scrollYProgress, [0, 0.4, 0.55], [1, 1, 0])
  const proofOpacity = useTransform(scrollYProgress, [0.45, 0.62], [0, 1])
  const introY = useTransform(scrollYProgress, [0, 0.55], [0, -40])
  const proofY = useTransform(scrollYProgress, [0.45, 1], [32, -14])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.18, 0.3], [1, 1, 0])
  const railFill = useTransform(scrollYProgress, [0, 1], [0, 1])

  const introPE = useTransform(introOpacity, (v) => (v > 0.45 ? 'auto' : 'none'))
  const proofPE = useTransform(proofOpacity, (v) => (v > 0.45 ? 'auto' : 'none'))

  if (reduce) {
    return (
      <section id="home" className="relative">
        <div className="relative flex min-h-[88svh] items-end overflow-hidden pb-24 pt-24 md:items-center md:pb-28 md:pt-28">
          <Backdrop />
          <div className="relative mx-auto w-full max-w-container px-5 sm:px-6 md:px-10">
            <Intro />
          </div>
          <Sun />
        </div>
        <div className="mx-auto max-w-container px-5 py-16 sm:px-6 md:px-10 md:py-20">
          <Proof />
        </div>
      </section>
    )
  }

  return (
    <section id="home" ref={ref} className="relative h-[180svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <Backdrop progress={scrollYProgress} />

        <div className="relative z-20 mx-auto h-full max-w-container">
          <Stage opacity={introOpacity} pointerEvents={introPE} y={introY}>
            <Intro />
          </Stage>
          <Stage opacity={proofOpacity} pointerEvents={proofPE} y={proofY}>
            <Proof />
          </Stage>
        </div>

        <Sun />

        {/* Vertical scroll rail */}
        <div className="pointer-events-none absolute bottom-10 left-6 z-20 hidden items-end gap-3 lg:flex">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="relative block h-24 w-px bg-line">
            <motion.span
              style={{ scaleY: railFill }}
              className="absolute inset-0 origin-top bg-accent"
            />
          </span>
        </div>

        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex lg:hidden"
        >
          <span className="font-mono text-[11px] tracking-[0.18em] text-muted">SCROLL</span>
          <motion.span
            className="h-8 w-px origin-top bg-accent"
            animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
