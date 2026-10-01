'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import AnimatedHeading from './AnimatedHeading'

interface SectionShellProps {
  id: string
  index: string
  title: string
  eyebrow?: string
  caption?: string
  /** split: sticky title rail beside content. stacked: title above full-width content. */
  layout?: 'split' | 'stacked'
  children: ReactNode
}

/**
 * Editorial section frame. Hierarchy reads top-down: index + eyebrow on one
 * line, then the title, then a short caption. On desktop the split variant
 * keeps the title block sticky while content scrolls past it, and the hairline
 * rail fills to show progress through the section.
 */
export default function SectionShell({
  id,
  index,
  title,
  eyebrow,
  caption,
  layout = 'split',
  children,
}: SectionShellProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 90%'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.35 })

  const header = (
    <div className={layout === 'split' ? 'lg:sticky lg:top-28' : ''}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11.5px] tabular-nums tracking-[0.18em] text-accent-text">
          {index}
        </span>
        <span className="relative h-px w-10 shrink-0 bg-line">
          <motion.span
            style={{ scaleX: fill }}
            className="absolute inset-0 origin-left bg-accent"
          />
        </span>
        {eyebrow ? <span className="eyebrow before:hidden">{eyebrow}</span> : null}
      </div>

      <AnimatedHeading
        text={title}
        className={`t-section mt-4 ${layout === 'stacked' ? 't-section-xl' : ''}`}
      />

      {caption ? (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-muted"
        >
          {caption}
        </motion.p>
      ) : null}
    </div>
  )

  return (
    <section id={id} ref={ref} className="relative">
      <div className="section-pad">
        {layout === 'split' ? (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
            <header>{header}</header>
            <div className="min-w-0">{children}</div>
          </div>
        ) : (
          <>
            <header className="mb-10 md:mb-12">{header}</header>
            <div className="min-w-0">{children}</div>
          </>
        )}
      </div>
    </section>
  )
}
