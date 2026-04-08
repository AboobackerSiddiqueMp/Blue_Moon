'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import gsap from 'gsap'

/* ─────────────────────────────────────────
   One slide per spec — large typographic reveal
   The bottle stays sticky while these scroll past
───────────────────────────────────────── */
const SLIDES = [
  {
    index: '01',
    label: 'Material',
    value: 'Premium\nHand-Blown\nGlass',
    sub: 'Crafted by master artisans in century-old ateliers.',
    accent: '#3b82f6',
  },
  {
    index: '02',
    label: 'Concentration',
    value: 'Eau\nde\nParfum',
    sub: 'The strongest, most enduring fragrance form.',
    accent: '#60a5fa',
  },
  {
    index: '03',
    label: 'Longevity',
    value: '8–10\nHour\nWear',
    sub: 'A single spray lasts from dusk until dawn.',
    accent: '#93c5fd',
  },
  {
    index: '04',
    label: 'Origin',
    value: 'Grasse,\nFrance',
    sub: 'The perfume capital of the world for 400 years.',
    accent: '#bfdbfe',
  },
]

/* ── Floating bottle (GSAP idle tween) ── */
function BottleStage({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const bottleRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bottleRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2)
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2)
    gsap.to(bottleRef.current, {
      rotateY: dx * 14,
      rotateX: -dy * 9,
      duration: 0.55,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }
  const handleMouseLeave = () => {
    if (!bottleRef.current) return
    gsap.to(bottleRef.current, {
      rotateY: 0, rotateX: 0,
      duration: 1.4,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    })
  }

  /* Continuous float */
  useEffect(() => {
    if (!bottleRef.current) return
    const t = gsap.to(bottleRef.current, {
      y: -20,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    return () => { t.kill() }
  }, [])

  /* Scroll-linked glow intensity */
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const glowOpacity = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.28, 0.16]), { stiffness: 60, damping: 20 })

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* Section header — top of right panel */}
      <div className="absolute top-12 left-0 right-0 flex flex-col items-center gap-3 pointer-events-none">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-8 bg-accent/50" />
          <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-accent">The Bottle</span>
          <div className="h-[1px] w-8 bg-accent/50" />
        </div>
        <p className="font-serif text-lg md:text-xl text-foreground/30 tracking-widest">Blue Moon</p>
      </div>

      {/* Grid dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Atmospheric glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '80%', height: '70%',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse at 50% 55%, rgba(59,130,246,1) 0%, rgba(30,58,138,0.6) 40%, transparent 70%)',
          filter: 'blur(28px)',
          opacity: glowOpacity,
        }}
      />

      {/* The bottle */}
      <div ref={bottleRef} style={{ transformStyle: 'preserve-3d' }} className="relative z-10 w-full max-w-lg flex justify-center">
        <div className="relative" style={{ width: 480, height: 380 }}>
          {/* Halo */}
          <div
            className="absolute -inset-8 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 60%)',
              filter: 'blur(20px)',
            }}
          />
          <Image
            src="/perfume-bottle.png"
            alt="Blue Moon Perfume Bottle"
            fill
            className="object-contain relative z-10 transition-all duration-700"
            style={{
              mixBlendMode: 'lighten',
              WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
              maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)'
            }}
            priority
          />
          {/* Ground shadow/reflection */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: 180, height: 20,
              background: 'radial-gradient(ellipse, rgba(59,130,246,0.2) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
        </div>
      </div>

      {/* Corner marks */}
      {[
        { pos: 'top-4 left-4',     b: 'borderTop borderLeft'    },
        { pos: 'top-4 right-4',    b: 'borderTop borderRight'   },
        { pos: 'bottom-4 left-4',  b: 'borderBottom borderLeft'  },
        { pos: 'bottom-4 right-4', b: 'borderBottom borderRight' },
      ].map(({ pos }, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-5 h-5 pointer-events-none`}
          style={{
            borderTop:    i < 2  ? '1px solid rgba(59,130,246,0.35)' : 'none',
            borderBottom: i >= 2 ? '1px solid rgba(59,130,246,0.35)' : 'none',
            borderLeft:   i % 2 === 0 ? '1px solid rgba(59,130,246,0.35)' : 'none',
            borderRight:  i % 2 !== 0 ? '1px solid rgba(59,130,246,0.35)' : 'none',
          }}
        />
      ))}

      {/* Vertical editorial labels */}
      <div
        className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
      >
        <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-blue-500/40">Eau de Parfum</span>
      </div>
      <div
        className="absolute right-5 top-1/2 pointer-events-none"
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%)' }}
      >
        <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-white/15">Blue Moon</span>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 pointer-events-auto">
        <button
          id="cta-60ml"
          className="px-7 py-3 text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 luxury-glow-hover"
          style={{
            border: '1px solid rgba(59,130,246,0.45)',
            color: '#93c5fd',
            background: 'rgba(59,130,246,0.07)',
            backdropFilter: 'blur(8px)',
          }}
        >
          60 ml · $149
        </button>
        <button
          id="cta-100ml"
          className="px-7 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105"
          style={{ background: 'rgba(59,130,246,0.88)', color: '#050505', boxShadow: '0 0 28px rgba(59,130,246,0.28)' }}
        >
          100 ml · $199
        </button>
      </div>
    </div>
  )
}

/* ── Single scroll-progress pip ── */
function ScrollPip({
  containerRef,
  slideIndex,
  total,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
  slideIndex: number
  total: number
}) {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const segStart = slideIndex / total
  const segEnd   = (slideIndex + 1) / total
  const w = useSpring(
    useTransform(scrollYProgress, [segStart, segEnd], ['0%', '100%']),
    { stiffness: 80, damping: 20 }
  )
  return (
    <div className="relative w-8 h-[2px] bg-white/10 overflow-hidden">
      <motion.div style={{ width: w }} className="absolute inset-y-0 left-0 bg-blue-500/70" />
    </div>
  )
}

/* ── Single scrolling spec slide ── */
function SpecSlide({
  slide,
  containerRef,
  slideIndex,
  total,
}: {
  slide: (typeof SLIDES)[0]
  containerRef: React.RefObject<HTMLDivElement | null>
  slideIndex: number
  total: number
}) {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const segStart = slideIndex / total
  const segMid   = (slideIndex + 0.5) / total
  const segEnd   = (slideIndex + 1) / total

  const isLast = slideIndex === total - 1

  // opacity: 0 → 1 → (0 if not last) across this slide's segment
  const opacity = useSpring(
    useTransform(
      scrollYProgress,
      [segStart, segStart + 0.08, segEnd - 0.08, segEnd],
      [0, 1, 1, isLast ? 1 : 0]
    ),
    { stiffness: 80, damping: 18 }
  )
  // y: slides up gently as it enters, then continues up as it leaves (unless last)
  const y = useSpring(
    useTransform(
      scrollYProgress,
      [segStart, segMid, segEnd],
      [60, 0, isLast ? 0 : -60]
    ),
    { stiffness: 80, damping: 18 }
  )
  // scale: slight zoom in at peak
  const scale = useSpring(
    useTransform(
      scrollYProgress,
      [segStart, segMid, segEnd],
      [0.92, 1, isLast ? 1 : 0.92]
    ),
    { stiffness: 80, damping: 18 }
  )

  const lines = slide.value.split('\n')

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex flex-col justify-center px-10 md:px-14 pointer-events-none"
    >
      {/* Index + label row */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-xs font-bold tracking-[0.28em] uppercase" style={{ color: slide.accent }}>
          {slide.index}
        </span>
        <div className="h-[1px] w-10" style={{ background: `${slide.accent}55` }} />
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
          {slide.label}
        </span>
      </div>

      {/* Large value — 3 lines of serif text */}
      <div className="mb-8 overflow-hidden">
        {lines.map((line, li) => (
          <div key={li} className="overflow-hidden">
            <motion.span
              className="block font-serif font-bold leading-[0.95] tracking-tight"
              style={{
                fontSize: 'clamp(52px, 7vw, 88px)',
                color: li === 0 ? slide.accent : li === 1 ? `${slide.accent}cc` : `${slide.accent}66`,
              }}
            >
              {line}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Sub-text */}
      <p className="text-muted-foreground/70 text-sm md:text-base font-light leading-relaxed max-w-sm">
        {slide.sub}
      </p>

      {/* Thin accent divider */}
      <div className="mt-8 h-[1px] w-16" style={{ background: `${slide.accent}44` }} />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════ */
const ProductShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    /*
      Outer wrapper is tall (N × 100vh) — one "page" per spec slide
      The inner sticky div stays at the top while outer scrolls past it
    */
    <div
      ref={containerRef}
      id="product"
      style={{ height: '140vh', position: 'relative' }}
      className="relative"
      suppressHydrationWarning
    >
      {/* Sticky viewport-height panel */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">

        {/* Scan lines */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.022]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 48px)',
          }}
        />

        {/* Split layout */}
        <div className="relative z-10 flex h-full">

          {/* ── LEFT: scrolling spec slides ── */}
          <div className="relative w-full md:w-1/2 h-full border-r border-white/5">
            {SLIDES.map((slide, i) => (
              <SpecSlide
                key={i}
                slide={slide}
                containerRef={containerRef}
                slideIndex={i}
                total={SLIDES.length}
              />
            ))}

            {/* Scroll-progress pips */}
            <div className="absolute bottom-10 left-10 md:left-14 flex flex-col gap-2">
              {SLIDES.map((_, i) => (
                <ScrollPip
                  key={i}
                  containerRef={containerRef}
                  slideIndex={i}
                  total={SLIDES.length}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: sticky bottle ── */}
          <div className="hidden md:block relative w-1/2 h-full">
            <BottleStage containerRef={containerRef} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductShowcase
