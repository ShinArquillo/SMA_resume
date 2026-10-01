'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useMotionValueEvent } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

const FRAME_COUNT = 120
const EASE = 0.16 // how quickly the shown frame catches up to the scroll target

/** Cover crop anchors: face sits ~78% from left / ~40% from top in the frames. */
const FOCUS = {
  mobile: { x: 0.86, y: 0.3 },
  desktop: { x: 0.62, y: 0.5 },
} as const

const framePath = (i: number) => `/frames/frame-${String(i + 1).padStart(4, '0')}.jpg`

function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
}

type NetInfo = { saveData?: boolean; effectiveType?: string }

/**
 * Phones get every second frame (half the bytes, still 60 steps across the
 * scroll). Data-saver / slow connections get a single still: the hero stays a
 * portrait, it just does not scrub.
 */
function pickStep() {
  if (typeof navigator === 'undefined') return 1
  const net = (navigator as Navigator & { connection?: NetInfo }).connection
  if (net?.saveData || net?.effectiveType === '2g' || net?.effectiveType === 'slow-2g') {
    return FRAME_COUNT
  }
  return isMobileViewport() ? 2 : 1
}

/**
 * Apple-style scroll-scrubbed image sequence. Paints frame 0 as soon as it
 * decodes, then preloads the rest on idle so the sequence never competes with
 * the first paint. A single rAF loop eases the displayed frame toward the
 * scroll target: smooth, and it never backtracks from momentum jitter.
 */
export default function HeroFrames({ progress }: { progress?: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const stepRef = useRef(1)
  const currentRef = useRef(-1)
  const targetRef = useRef(0)
  const displayRef = useRef(0)
  const rafRef = useRef(0)
  const focusRef = useRef<{ x: number; y: number }>(FOCUS.desktop)
  const fallback = useMotionValue(0)
  const src = progress ?? fallback

  function draw(index: number) {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    if (!canvas || !img || !img.complete || !img.naturalWidth) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const cw = canvas.clientWidth
    const ch = canvas.clientHeight
    if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
      canvas.width = Math.round(cw * dpr)
      canvas.height = Math.round(ch * dpr)
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const W = canvas.width
    const H = canvas.height
    const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight)
    const w = img.naturalWidth * scale
    const h = img.naturalHeight * scale
    const { x, y } = focusRef.current
    ctx.clearRect(0, 0, W, H)
    ctx.drawImage(img, (W - w) * x, (H - h) * y, w, h)
    currentRef.current = index
  }

  /** Nearest frame that has already decoded, so a fast scroll never blanks. */
  function nearestReady(index: number) {
    const imgs = imagesRef.current
    if (imgs[index]?.complete && imgs[index]?.naturalWidth) return index
    for (let d = 1; d < imgs.length; d++) {
      const lo = imgs[index - d]
      if (lo?.complete && lo.naturalWidth) return index - d
      const hi = imgs[index + d]
      if (hi?.complete && hi.naturalWidth) return index + d
    }
    return -1
  }

  function tick() {
    const target = targetRef.current
    let display = displayRef.current
    if (Math.abs(target - display) < 0.35) {
      display = target
    } else {
      display += (target - display) * EASE
    }
    displayRef.current = display

    const idx = nearestReady(Math.round(display))
    if (idx >= 0 && idx !== currentRef.current) draw(idx)

    if (display !== target) {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      rafRef.current = 0
    }
  }

  // Load frame 0 now, the rest on idle.
  useEffect(() => {
    focusRef.current = isMobileViewport() ? FOCUS.mobile : FOCUS.desktop
    const step = pickStep()
    stepRef.current = step
    const count = Math.ceil(FRAME_COUNT / step)

    const imgs: HTMLImageElement[] = new Array(count)
    const load = (i: number) => {
      const img = new window.Image()
      img.decoding = 'async'
      img.src = framePath(Math.min(FRAME_COUNT - 1, i * step))
      imgs[i] = img
    }
    load(0)
    imagesRef.current = imgs

    let cancelled = false
    const loadRest = () => {
      if (cancelled) return
      for (let i = 1; i < count; i++) load(i)
    }
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback
    const idleId = idle ? idle(loadRest) : window.setTimeout(loadRest, 600)

    // Keep trying to paint frame 0 until it's decoded and the canvas is sized.
    let raf = 0
    const ensureFirst = () => {
      if (currentRef.current !== -1) return
      draw(0)
      raf = requestAnimationFrame(ensureFirst)
    }
    raf = requestAnimationFrame(ensureFirst)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      if (!idle) window.clearTimeout(idleId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Repaint the current frame on resize; retarget face focus for mobile vs desktop.
  useEffect(() => {
    const onResize = () => {
      focusRef.current = isMobileViewport() ? FOCUS.mobile : FOCUS.desktop
      draw(currentRef.current < 0 ? 0 : currentRef.current)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update the scroll target; the rAF loop eases toward it.
  useMotionValueEvent(src, 'change', (p) => {
    const last = imagesRef.current.length - 1
    if (last <= 0) return
    targetRef.current = Math.min(last, Math.max(0, p * last))
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
  })

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />
}
