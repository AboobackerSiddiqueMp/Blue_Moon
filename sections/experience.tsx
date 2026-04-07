'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── helpers ── */
const EXPERIENCES = [
  {
    index: '01',
    label: 'Evening Elegance',
    headline: 'A ritual\nborn of dusk.',
    body: 'Perfect for sophisticated evenings. The fragrance unfolds with delicate top notes of bergamot and saffron, evolving into a heart of iris and leather that captures the essence of refined beauty.',
    tag: 'Dusk · Allure · Ritual',
    accent: '#3b82f6',
  },
  {
    index: '02',
    label: 'Night Mystery',
    headline: 'Darkness\nwears Blue Moon.',
    body: 'Embrace the allure of the midnight hour. With its deep base of musk and cedarwood, Blue Moon becomes an invisible aura of mystery and intrigue that lingers long after you have gone.',
    tag: 'Midnight · Mystery · Depth',
    accent: '#60a5fa',
  },
  {
    index: '03',
    label: 'Silent Luxury',
    headline: 'Whispers\nof rare accord.',
    body: 'The quietest rooms carry the loudest statements. A signature that speaks without words — to those who deserve to know.',
    tag: 'Silence · Signature · Statement',
    accent: '#93c5fd',
  },
]

/* Word-split animated heading */
function SplitHeading({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  const words = text.split('\n').map((line) => line.split(' '))

  return (
    <h3
      ref={ref}
      aria-label={text.replace('\n', ' ')}
      className="font-serif text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight"
    >
      {words.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          {line.map((word, wi) => (
            <motion.span
              key={wi}
              className="inline-block mr-[0.25em]"
              initial={{ y: '105%', opacity: 0 }}
              animate={inView ? { y: '0%', opacity: 1 } : {}}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + li * 0.08 + wi * 0.06,
              }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      ))}
    </h3>
  )
}



/* Ambient floating particle */
function Particle({ x, y, size, dur }: { x: number; y: number; size: number; dur: number }) {
  return (
    <motion.div
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      className="absolute rounded-full bg-blue-500/20 blur-sm pointer-events-none"
      animate={{ y: [0, -30, 0], opacity: [0.15, 0.45, 0.15], scale: [1, 1.3, 1] }}
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

const PARTICLES = [
  { x: 8,  y: 25, size: 6,  dur: 5.2 },
  { x: 15, y: 60, size: 10, dur: 6.8 },
  { x: 78, y: 15, size: 7,  dur: 4.5 },
  { x: 88, y: 72, size: 12, dur: 7.1 },
  { x: 55, y: 88, size: 5,  dur: 5.9 },
  { x: 42, y: 10, size: 8,  dur: 6.3 },
  { x: 92, y: 42, size: 4,  dur: 4.9 },
  { x: 5,  y: 85, size: 9,  dur: 7.5 },
]

/* Single experience card */
function ExperienceCard({
  exp,
  index,
  isOdd,
}: {
  exp: (typeof EXPERIENCES)[0]
  index: number
  isOdd: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true, margin: '-10%' })

  /* GSAP parallax on the glow orb behind the card */
  const glowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!glowRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
        y: -60,
        ease: 'none',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col ${isOdd ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch gap-0 min-h-[480px]`}
    >
      {/* ── Glow orb (parallax) ── */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none z-0"
        style={{
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${exp.accent}22 0%, transparent 70%)`,
          [isOdd ? 'right' : 'left']: '-80px',
          top: '50%',
          transform: 'translateY(-50%)',
          filter: 'blur(48px)',
        }}
      />

      {/* ── Visual panel ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, x: isOdd ? 60 : -60 }}
        animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="relative z-10 w-full md:w-1/2 flex-shrink-0 overflow-hidden"
        style={{ minHeight: 320 }}
      >
        {/* Layered gradient "image" panel — rich faux-image with gradients + grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#0f172a] to-[#050505]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Large index number — decorative */}
        <motion.div
          initial={{ opacity: 0, scale: 1.6 }}
          animate={inView ? { opacity: 0.06, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center font-serif select-none pointer-events-none"
          style={{ fontSize: 'clamp(140px, 22vw, 260px)', color: '#fff', lineHeight: 1 }}
        >
          {exp.index}
        </motion.div>

        {/* Glowing centre orb */}
        <motion.div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${exp.accent}55 0%, transparent 70%)`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Tag badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="absolute bottom-6 left-6 right-6 flex items-center gap-3"
        >
          <div className="h-[1px] flex-1" style={{ background: `${exp.accent}66` }} />
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
            {exp.tag}
          </span>
          <div className="h-[1px] flex-1" style={{ background: `${exp.accent}66` }} />
        </motion.div>

        {/* Border glow on panel */}
        <motion.div
          className="absolute inset-0 rounded-none pointer-events-none"
          style={{ border: `1px solid ${exp.accent}22` }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Content panel ── */}
      <div
        className={`relative z-10 w-full md:w-1/2 flex flex-col justify-center px-8 md:px-14 py-12 md:py-16 ${
          isOdd ? 'md:pr-20' : 'md:pl-20'
        }`}
      >
        {/* Index + label row */}
        <motion.div
          initial={{ opacity: 0, x: isOdd ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4 mb-8"
        >
          <span
            className="font-mono text-xs font-bold tracking-[0.25em] uppercase"
            style={{ color: exp.accent }}
          >
            {exp.index}
          </span>
          <div className="h-[1px] w-12" style={{ background: `${exp.accent}55` }} />
          <span className="text-xs tracking-widest uppercase text-muted-foreground">
            {exp.label}
          </span>
        </motion.div>

        {/* Split headline */}
        <div className="mb-8">
          <SplitHeading text={exp.headline} delay={0.25 + index * 0.05} />
        </div>

        {/* Body text — lines stagger in */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-md mb-10"
        >
          {exp.body}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="flex items-center gap-5"
        >
          <motion.button
            whileHover={{ scale: 1.04, x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3 text-sm font-semibold tracking-wider uppercase"
            style={{ color: exp.accent }}
          >
            Discover more
            {/* Animated arrow line */}
            <span className="relative flex items-center">
              <span
                className="block h-[1px] w-8 transition-all duration-300 group-hover:w-14"
                style={{ background: exp.accent }}
              />
              <span
                className="ml-1 text-lg leading-none transition-transform duration-300 group-hover:translate-x-2"
                style={{ color: exp.accent }}
              >
                →
              </span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════
   Main Section
════════════════════════════════════════════ */
const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  /* Scroll-driven title line width */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 30%'],
    layoutEffect: false
  })
  const lineWidth = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 60,
    damping: 20,
  })

  /* GSAP — subtle section-wide horizontal drift on the particles layer */
  const particlesRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!particlesRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(particlesRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
        y: -80,
        ease: 'none',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-background overflow-hidden"
    >
      {/* ── Ambient particles layer ── */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0">
        {PARTICLES.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      {/* ── Subtle horizontal scan lines ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 48px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Section header ── */}
        <div className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-5 mb-8"
          >
            <div className="h-[1px] w-10 bg-accent/50" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-accent">
              The Experience
            </span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="font-serif text-5xl md:text-7xl xl:text-8xl font-bold leading-none tracking-tight"
            >
              Discover how{' '}
              <span className="text-gradient">Blue&nbsp;Moon</span>
            </motion.h2>
          </div>

          <div className="overflow-hidden mb-10">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              viewport={{ once: true }}
              className="font-serif text-5xl md:text-7xl xl:text-8xl font-bold leading-none tracking-tight text-foreground/30"
            >
              transforms your moments.
            </motion.h2>
          </div>

          {/* Animated underline */}
          <motion.div className="relative h-[2px] max-w-md">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              style={{ width: lineWidth }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-300"
            />
          </motion.div>
        </div>

        {/* ── Experience cards ── */}
        <div className="flex flex-col divide-y divide-border/40">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="py-12 md:py-16 first:pt-0 last:pb-0">
              <ExperienceCard exp={exp} index={idx} isOdd={idx % 2 !== 0} />
            </div>
          ))}
        </div>

        {/* ── Bottom accent row ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-border/40"
        >
          <p className="text-muted-foreground text-sm tracking-widest uppercase">
            Every drop tells its own story.
          </p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group relative px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase overflow-hidden"
            style={{ border: '1px solid rgba(59,130,246,0.35)', color: '#93c5fd' }}
          >
            {/* animated shimmer on hover */}
            <motion.div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)',
              }}
            />
            <span className="relative z-10">Explore Collection</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default ExperienceSection
