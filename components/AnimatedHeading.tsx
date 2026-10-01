'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedHeadingProps {
  text: string
  className?: string
}

/**
 * Masked, word-by-word reveal: each word slides up from behind a clip.
 *
 * The observer watches the heading itself, not the translated word. A word
 * translated 115% inside an overflow-hidden wrapper is fully clipped, so an
 * IntersectionObserver on it never fires and the title would stay invisible.
 */
export default function AnimatedHeading({ text, className = '' }: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })
  const words = text.split(' ')

  if (reduce) {
    return (
      <h2 ref={ref} className={className}>
        {text}
      </h2>
    )
  }

  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.12em' }}
          aria-hidden
        >
          <motion.span
            className="inline-block"
            initial={{ y: '115%' }}
            animate={inView ? { y: 0 } : { y: '115%' }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </h2>
  )
}
