'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'home', num: '00', label: 'Intro' },
  { id: 'experience', num: '01', label: 'Experience' },
  { id: 'projects', num: '02', label: 'Projects' },
  { id: 'skills', num: '03', label: 'Skills' },
  { id: 'about', num: '04', label: 'About' },
  { id: 'education', num: '05', label: 'Education' },
]

function SectionLinks({
  active,
  variant,
}: {
  active: string
  /** mobile: the active item expands to show its label. desktop: labels on rail hover. */
  variant: 'mobile' | 'desktop'
}) {
  return (
    <>
      {sections.map(({ id, num, label }) => {
        // The header logo already returns to the top; the phone bar needs the room.
        if (variant === 'mobile' && id === 'home') return null
        const isActive = active === id
        const showLabel = variant === 'desktop' || isActive
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={`${num} ${label}`}
            aria-current={isActive ? 'true' : undefined}
            title={label}
            className={`relative flex h-10 items-center justify-center rounded-full px-2.5 transition-all duration-300 md:justify-start ${
              isActive
                ? 'bg-accent/15 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--accent)_38%,transparent)]'
                : 'hover:bg-ink/[0.04]'
            } ${variant === 'mobile' ? (isActive ? 'shrink-0 px-3' : 'min-w-9 shrink') : ''}`}
          >
            <span
              className={`font-mono text-[11px] tabular-nums tracking-wide transition-colors duration-300 ${
                isActive ? 'text-accent-text' : 'text-muted'
              }`}
            >
              {num}
            </span>
            {showLabel && (
              <span
                className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ease-out ${
                  variant === 'desktop'
                    ? 'max-w-0 opacity-0 group-hover:max-w-[8.5rem] group-hover:pl-2 group-hover:opacity-100'
                    : 'max-w-[8.5rem] pl-2 opacity-100'
                }`}
              >
                <span
                  className={`hidden h-px w-3 shrink-0 md:block ${isActive ? 'bg-accent' : 'bg-muted/60'}`}
                />
                <span
                  className={`whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] md:tracking-[0.12em] ${
                    isActive ? 'text-accent-text' : 'text-muted'
                  }`}
                >
                  {label}
                </span>
              </span>
            )}
          </a>
        )
      })}
    </>
  )
}

export default function SectionIndex() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Mobile: horizontal glass bar along the bottom; active item shows its name */}
      <nav
        aria-label="Section navigation"
        className="fixed bottom-4 left-3 right-[4.6rem] z-40 md:hidden"
      >
        <div className="glass-panel flex items-center justify-between gap-1 rounded-2xl p-1">
          <SectionLinks active={active} variant="mobile" />
        </div>
      </nav>

      {/* Desktop: vertical glass rail on the right */}
      <nav
        aria-label="Section navigation"
        className="group fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:block xl:right-5"
      >
        <div className="glass-panel flex flex-col gap-0.5 rounded-2xl p-1">
          <SectionLinks active={active} variant="desktop" />
        </div>
      </nav>
    </>
  )
}
