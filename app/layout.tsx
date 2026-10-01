import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Syne, Manrope, JetBrains_Mono } from 'next/font/google'
import { person, siteUrl } from '@/lib/site'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const title = 'Sheena Mae Arquillo | Full-Stack Developer & Data Analyst'
const description =
  'Full-stack developer and data analyst shipping production software: ecommerce, internal business systems, Google Ads, and applied AI for visual search and demand forecasting. Open to full-time onsite, hybrid, or remote roles.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | Sheena Mae Arquillo',
  },
  description,
  applicationName: 'Sheena Mae Arquillo Portfolio',
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  keywords: [
    'Sheena Mae Arquillo',
    'full-stack developer',
    'data analyst',
    'React developer',
    'Python developer',
    'Flask',
    'Supabase',
    'Google Ads',
    'business analytics',
    'demand forecasting',
    'applied AI',
    'Philippines developer',
    'remote developer',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: person.name,
    title,
    description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#f7f5f0',
  width: 'device-width',
  initialScale: 1,
}

/* Applies the saved theme before first paint so a Night visitor never sees a
   Day flash. Kept tiny and inline on purpose. */
const themeScript = `try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  url: siteUrl,
  email: `mailto:${person.email}`,
  telephone: person.phone,
  jobTitle: ['Full-Stack Developer', 'Data Analyst'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Batangas',
    addressCountry: 'PH',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Batangas State University',
  },
  sameAs: [person.linkedin, person.github, person.onlineJobs],
  knowsAbout: [
    'Full-stack development',
    'Data analysis',
    'Google Ads',
    'Applied machine learning',
    'Business analytics',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* First hero frame is the LCP image on every viewport. */}
        <link rel="preload" as="image" href="/frames/frame-0001.jpg" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
