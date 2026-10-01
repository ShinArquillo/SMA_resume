'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  /** Tailwind aspect-ratio class for the frame. */
  aspect?: string
  className?: string
  /** Small mono caption shown bottom-left over the image. */
  caption?: string
}

/**
 * Framed portrait with subtle parallax drift on scroll
 * as it scrolls through the viewport: the "live photo" effect.
 */
export default function ParallaxImage({
  src,
  alt,
  aspect = 'aspect-[4/5]',
  className = '',
  caption,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const yRaw = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const scaleRaw = useTransform(scrollYProgress, [0, 0.5, 1], [1.03, 1.06, 1.03])
  const y = reduce ? '0%' : yRaw
  const scale = reduce ? 1 : scaleRaw

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-line shadow-[var(--shadow-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-lift)] ${className}`}
    >
      <div className={`relative overflow-hidden bg-paper-raised ${aspect}`}>
        <motion.div style={{ y, scale }} className="absolute inset-[-8%]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 460px"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(120deg,transparent_35%,color-mix(in_srgb,var(--accent)_22%,transparent)_50%,transparent_65%)]" />

        {caption && (
          <div className="absolute bottom-3 left-3 z-10 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 font-mono text-[11px] tracking-[0.16em] text-white/90 backdrop-blur-sm">
            {caption}
          </div>
        )}
      </div>
    </div>
  )
}
