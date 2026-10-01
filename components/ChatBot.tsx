'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMessageSquare, FiX, FiArrowUp } from 'react-icons/fi'

type Msg = { role: 'bot' | 'user'; text: string; contact?: boolean }

type Reply = { text: string; contact?: boolean }

const suggestions = ['Experience', 'Projects', 'Skills', 'Contact']

const CONTACT_LINKS = [
  {
    label: 'Email',
    href: 'mailto:arquillosheenamae@gmail.com',
    display: 'arquillosheenamae@gmail.com',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sheena-mae-arquillo-05b169399',
    display: 'View LinkedIn profile',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/ShinArquillo',
    display: 'github.com/ShinArquillo',
  },
  {
    label: 'OnlineJobs.ph',
    href: 'https://v2.onlinejobs.ph/jobseekers/info/4694400',
    display: 'View OnlineJobs.ph profile',
  },
] as const

const WELCOME =
  'Welcome. I can share a brief overview of Sheena Mae Arquillo’s experience, projects, skills, and education. For detailed or personal inquiries, please contact her directly using the details under Contact.'

function ContactLinks() {
  return (
    <ul className="mt-2.5 space-y-1.5 border-t border-line pt-2.5">
      {CONTACT_LINKS.map((link) => (
        <li key={link.href} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm">
          <span className="font-mono text-[11px] tracking-[0.12em] text-muted">{link.label}</span>
          <a
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="text-ink underline-offset-2 transition-colors hover:text-accent hover:underline"
          >
            {link.display}
          </a>
        </li>
      ))}
    </ul>
  )
}

function BotMessage({ text, contact }: { text: string; contact?: boolean }) {
  return (
    <div>
      <p className="whitespace-pre-wrap">{text}</p>
      {contact ? <ContactLinks /> : null}
    </div>
  )
}

function isGreeting(t: string) {
  return /^(hi|hello|hey|yo|sup|good (morning|afternoon|evening))[\s!.]*$/.test(t)
}

function isOffTopic(t: string) {
  return /(weather|joke|recipe|cook|crypto|bitcoin|dating|girlfriend|boyfriend|politics|meme|horoscope|sport|nba|football|movie|netflix|game of thrones|ascii|poem|sing|rap|translate|homework for me|write (me )?a (essay|code|script))/i.test(
    t
  )
}

function isDeepQuestion(t: string) {
  const words = t.trim().split(/\s+/).filter(Boolean)
  const long = words.length >= 18 || t.length >= 140
  const multiAsk = (t.match(/\?/g) || []).length >= 2
  const deepIntent =
    /(salary|compensation|rate|hourly|negotiate|offer|why did|why would|how would you|what would you|walk me through|architecture|system design|trade.?off|compare|vs\.|versus|deep dive|in detail|exactly how|step by step|confidential|nda|client list|reference|background check)/i.test(
      t
    )
  return long || multiAsk || deepIntent
}

function reply(text: string, contact?: boolean): Reply {
  return contact ? { text, contact: true } : { text }
}

function getAnswer(q: string): Reply {
  const t = q.toLowerCase().trim()

  if (!t) {
    return reply('Please ask about Experience, Projects, Skills, or Education. To get in touch:', true)
  }

  if (isGreeting(t)) {
    return reply(
      'Hello. You may ask about Experience, Projects, Skills, Education, or Contact. For questions that need a fuller discussion, please email or message Sheena directly.'
    )
  }

  if (isOffTopic(t)) {
    return reply(
      'This assistant only covers Sheena’s professional portfolio.\n\nFor other topics, please contact her directly:',
      true
    )
  }

  if (isDeepQuestion(t)) {
    return reply(
      'Thank you for the detailed question. This chat provides a high-level summary only.\n\nFor process details, metrics, interviews, or anything that needs a fuller answer, please contact Sheena directly:',
      true
    )
  }

  if (/(contact|email|reach|hire|hiring|linkedin|connect|available|open to|message|remote|hybrid|onsite|on-site|social)/.test(t)) {
    return reply(
      'Sheena is open to full-time roles in full-stack development or data analysis (onsite, hybrid, or remote).\n\nPreferred contact:',
      true
    )
  }

  if (/(thank|thanks|thx|ty)\b/.test(t)) {
    return reply('You’re welcome. If you would like to continue the conversation, please reach out directly:', true)
  }

  if (/(who|about|herself|sheena|introduce)/.test(t)) {
    return reply(
      "Sheena Mae Arquillo is a full-stack developer, data analyst, and project lead. She ships production work at Tee Vision Printing (storefront, internal tools, Chrome extensions, Google Ads), delivers client commissions such as DFB Smart Shop, and led her university capstone (Automated Sales and Inventory). She is a Dean's List BSIT Major in Business Analytics."
    )
  }

  if (/(google\s*ads|advertising|ppc|sem|campaign|clarity|seo)/.test(t)) {
    return reply(
      'At Tee Vision Printing she works hands-on with Google Ads and Microsoft Clarity, including conversion tracking, campaign review, and an internal Ads and operations portal. For campaign-level detail, please contact her directly.',
      true
    )
  }

  if (/(ops|internal tool|diagnostics|financials|lead list|leads?)/.test(t)) {
    return reply(
      "She built TVP's internal Ads and Ops portal for lead review, campaign performance, and funnel or traffic diagnostics. The Projects gallery shows the interface with live figures blurred for privacy. For operational detail beyond the portfolio, please contact her directly.",
      true
    )
  }

  if (/(chrome\s*extension|browser\s*extension)/.test(t)) {
    return reply(
      'At Tee Vision Printing she built Chrome extensions that consolidate finance data from external platforms into internal reporting, used alongside the Employee Portal, Ads & Ops portal, and CRM tools.'
    )
  }

  if (/(experience|work history|career|roles?|job|amazon|alorica|intern)/.test(t)) {
    return reply(
      'Current: Full-Stack at Tee Vision Printing (Apr 2026 to present). Also: freelance client commissions (DFB Smart Shop), university capstone (Automated Sales / Phoebe), Tech Executive Labs internship on Bookside (Feb to May 2026), and Amazon/Alorica CSR (2025). Scroll Experience on the site for bullets.'
    )
  }

  if (/(tvp|tee vision|storefront|teevisionprinting)/.test(t)) {
    return reply(
      'At TVP she contributes to the live storefront (teevisionprinting.com) and built three internal systems in-house: the Employee Portal PWA, the Ads & Ops portal, and CRM/auth tooling, plus Chrome extensions that pull finance data from external platforms into internal reporting. She also reduced operating costs by refactoring a fragmented codebase and consolidating hosting. Storefront work is team contribution, not personal ownership of the business.'
    )
  }

  if (/(employee portal|tvp portal|pwa)/.test(t)) {
    return reply(
      'TVP Employee Portal is a React PWA used by 15 staff that replaced a slow, disconnected clock-in tool. One app for clock in/out, payslips, shared availability across the team, notes anyone can post to anyone, and project management, all with role-based access. Live demo is in the Projects gallery.'
    )
  }

  if (/(bookside|techex|tech executive|figma)/.test(t)) {
    return reply(
      'At Tech Executive Labs she worked on Bookside: buyer category shelves and Seller Center insights. Demo, Figma, and screenshots are under Projects.'
    )
  }

  if (/(dfb|smart.?shop|visual search|rider)/.test(t)) {
    return reply(
      'DFB Smart Shop (dfbsupply.store) is a client commission she led: ecommerce, visual search (88.9% hold-out accuracy), inventory, and rider tracking. See Projects for screenshots.'
    )
  }

  if (/(phoebe|automated sales|pharmacy|capstone)/.test(t)) {
    return reply(
      'Automated Sales & Inventory (Phoebe) is her university capstone as Project Lead: pharmacy POS across 690+ medicines, inventory and expiry tracking, Prophet sales forecasting, sustainability analytics, and an AI pharmacy assistant. Live demo: phoebefrontend.vercel.app.'
    )
  }

  if (/(save.?me|saveme)/.test(t)) {
    return reply(
      'SaveME is a school project she led: personal finance goals, dashboard, and reports. Live demo and Figma are in Projects.'
    )
  }

  if (/(doctor\s*dose|doctors?\s*dose|dubai|collab)/.test(t)) {
    return reply(
      'Doctors Dose is a collaborative side project (Dubai skincare): admin interface and API support. Live: doctorsdose.co.uk.'
    )
  }

  if (/(hrms|peopleconnect|pharma|rgo|commission|thesis|freelance|project lead)/.test(t)) {
    return reply(
      'Client commission example: DFB Smart Shop. University capstone: Automated Sales (Phoebe). Other school builds include SaveME, HRMS, and RGO Lipa (C#). Browse Projects for demos.'
    )
  }

  if (/(project|portfolio|demo|built|build|gallery)/.test(t)) {
    return reply(
      'Top projects: TVP storefront, Employee Portal, Ads & Ops portal, Bookside, HRMS, DFB, Phoebe, SaveME, and more. Open the Projects section to browse live demos.'
    )
  }

  if (/(skill|stack|tech|python|react|flask|php|sql|frontend|backend|c#|tools?)/.test(t)) {
    return reply(
      'Core stack: React/PWA, Chrome Extensions, JavaScript, Python/Flask, PHP, C#/WinForms, REST APIs, PostgreSQL/Supabase, data analysis and dashboards, plus Google Ads, SEO, Clarity, and applied AI (visual search, forecasting).'
    )
  }

  if (/(education|school|degree|graduate|university|dean|bsit|course|major)/.test(t)) {
    return reply(
      "BSIT Major in Business Analytics, Batangas State University (Lipa), graduated 2026. Dean's List Scholar. Capstone: Automated Sales and Inventory (Phoebe)."
    )
  }

  if (/(github|repo|git)/.test(t)) {
    return reply('GitHub: ShinArquillo (personal) and 22-36829 (school). Both are active.', true)
  }

  if (/(onlinejobs|online.?jobs)/.test(t)) {
    return reply('Her OnlineJobs.ph profile is linked below, along with other preferred contact channels.', true)
  }

  if (/(proof|metric|stat|number)/.test(t)) {
    return reply(
      'Portfolio highlights include operating-cost reduction at Tee Vision Printing through codebase and hosting consolidation, three internal systems shipped in-house, Chrome extensions for finance reporting, more than ten live demos and prototypes, and hands-on Google Ads experience. On the applied AI side: image-based product search at 88.9% hold-out accuracy. For private or account-level metrics, please contact her directly.',
      true
    )
  }

  if (/(ai|llm|machine learning|forecast)/.test(t)) {
    return reply(
      'Her strongest applied AI example in the portfolio is DFB visual search (MobileNet with KNN). She has also built forecasting-oriented recommendations in her university capstone (Phoebe) and has training in LLM fine-tuning. For interview-depth discussion, please contact her directly.',
      true
    )
  }

  return reply(
    'I may not have a precise answer for that here.\n\nThis assistant covers a brief overview of her experience, projects, skills, and education. For a more complete response, please contact Sheena directly:',
    true
  )
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([{ role: 'bot', text: WELCOME }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const endRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const send = (raw: string) => {
    const q = raw.trim()
    if (!q || typing) return
    setMessages((m) => [...m, { role: 'user', text: q }])
    setInput('')
    setTyping(true)
    setShowSuggestions(false)
    const { text, contact } = getAnswer(q)
    window.setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { role: 'bot', text, contact }])
      if (contact) setShowSuggestions(true)
    }, 400)
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        className="glass-panel fixed bottom-5 right-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full text-ink shadow-[0_14px_34px_-16px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent-text active:translate-y-0 md:bottom-6 md:right-6"
      >
        {open ? <FiX className="text-lg" /> : <FiMessageSquare className="text-lg" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            data-lenis-prevent
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="glass-solid fixed bottom-[4.75rem] right-5 z-[70] flex h-[min(25rem,68vh)] w-[min(21rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl shadow-[var(--shadow-lift)] md:bottom-24 md:right-6"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <div className="leading-tight">
                  <p className="font-display text-sm font-semibold tracking-tight">Ask about Sheena</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    Quick guide
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/[0.05] hover:text-ink"
              >
                <FiX />
              </button>
            </div>

            <div className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'rounded-br-md bg-ink text-paper'
                        : 'rounded-bl-md border border-line bg-paper-raised/60 text-ink'
                    }`}
                  >
                    {m.role === 'bot' ? (
                      <BotMessage text={m.text} contact={m.contact} />
                    ) : (
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-xl border border-line px-3 py-2.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {showSuggestions && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="chip !px-2.5 !py-1 !text-[11px] !normal-case"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-line px-3 py-2.5"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about experience, projects, or skills…"
                aria-label="Message"
                className="min-w-0 flex-1 bg-transparent px-2 text-sm text-ink outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[#1a140e] transition-all duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-30"
              >
                <FiArrowUp className="text-sm" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
