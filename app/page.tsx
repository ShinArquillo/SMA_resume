import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Background from '@/components/Background'
import Education from '@/components/Education'
import TechnicalSkills from '@/components/TechnicalSkills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import SectionIndex from '@/components/SectionIndex'
import Marquee from '@/components/Marquee'
import SmoothScroll from '@/components/SmoothScroll'
import ChatBot from '@/components/ChatBot'

const heroKeywords = [
  'Full-Stack',
  'Data Analyst',
  'Project Lead',
  'Google Ads',
  'Applied AI',
  'React',
  'Flask',
  'Internal Tools',
  'Production',
]

function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-paper-raised/45 py-5 md:py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-paper to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-paper to-transparent md:w-40" />
      <Marquee
        items={heroKeywords}
        baseVelocity={1.1}
        className="font-display text-2xl font-medium italic tracking-tight text-muted/80 md:text-3xl lg:text-[2.25rem]"
      />
    </div>
  )
}

function Divider() {
  return (
    <div className="mx-auto max-w-container px-5 sm:px-6 md:px-10">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-line" />
        <span className="h-1 w-1 rotate-45 bg-accent" />
        <span className="h-px flex-1 bg-line" />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <a href="#experience" className="skip-link">
        Skip to content
      </a>
      <SmoothScroll />
      <ScrollProgress />
      <SectionIndex />
      <Header />
      <main id="main" className="relative">
        <Hero />
        <MarqueeStrip />

        <Experience />
        <Divider />

        <div className="bg-paper-raised/35">
          <Projects />
        </div>

        <TechnicalSkills />
        <Divider />

        <div className="bg-paper-raised/35">
          <Background />
        </div>

        <Education />
      </main>
      <Footer />
      <ChatBot />
    </>
  )
}
