'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { FiSun, FiMoon, FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi'

const links = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          // Back in the hero: no section is "current".
          setActive(entry.target.id === 'home' ? '' : `#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    ;['#home', ...links.map((l) => l.href)].forEach((href) => {
      const el = document.getElementById(href.slice(1))
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close the sheet on Escape and whenever the viewport grows past the breakpoint.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <motion.div
        animate={{
          maxWidth: scrolled && !menuOpen ? '64rem' : '82.5rem',
        }}
        transition={{ duration: 0.6, ease }}
        className={`mx-auto transition-[background,border-color,backdrop-filter,box-shadow] duration-500 ease-out ${
          scrolled || menuOpen
            ? 'glass-panel rounded-2xl'
            : 'rounded-2xl border border-transparent bg-transparent'
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-4 px-3 md:h-16 md:px-5">
          <a
            href="#home"
            className="group flex h-10 items-center gap-2.5 rounded-full pr-2"
            aria-label="Sheena Mae Arquillo, back to top"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent font-mono text-[11px] font-bold text-[#1a140e] transition-transform duration-300 group-hover:rotate-6">
              SA
            </span>
            <span className="font-display text-[0.95rem] font-semibold tracking-tight transition-colors group-hover:text-accent-text">
              Sheena&nbsp;Mae
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {links.map((link) => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative flex h-10 items-center rounded-full px-3.5 font-mono text-[11.5px] uppercase tracking-[0.12em] transition-colors duration-300 ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent/14 ring-1 ring-accent/30"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              )
            })}
            <Link
              href="/resume"
              className="flex h-10 items-center rounded-full px-3.5 font-mono text-[11.5px] uppercase tracking-[0.12em] text-muted transition-colors duration-300 hover:text-ink"
            >
              Resume
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="mailto:arquillosheenamae@gmail.com"
              className="group hidden h-10 items-center gap-1.5 rounded-full bg-accent px-4 font-mono text-[11.5px] uppercase tracking-[0.12em] text-[#1a140e] shadow-[0_10px_26px_-14px_color-mix(in_srgb,var(--accent)_90%,transparent)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              Hire me
              <FiArrowUpRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:bg-accent/10"
            >
              {theme === 'dark' ? <FiMoon className="text-sm" /> : <FiSun className="text-sm" />}
            </button>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent lg:hidden"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-menu"
              aria-label="Primary"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="overflow-hidden border-t border-line lg:hidden"
            >
              <ul className="flex flex-col p-3">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.35, ease }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-accent/10"
                    >
                      {link.label}
                      <span className="text-accent-text">{String(i + 1).padStart(2, '0')}</span>
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + links.length * 0.05, duration: 0.35, ease }}
                >
                  <Link
                    href="/resume"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-accent/10"
                  >
                    Resume
                    <FiArrowUpRight className="text-accent-text" />
                  </Link>
                </motion.li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
