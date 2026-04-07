'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NextImage from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const frameCount = 240
const CRITICAL_FRAMES = 30 // preload first 30 frames before showing canvas

const currentFrame = (index: number) =>
  `/hero/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.png`

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLDivElement>(null)
  const text3Ref = useRef<HTMLDivElement>(null)
  const text4Ref = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    const container = containerRef.current

    if (!canvas || !context || !container) return

    const images: HTMLImageElement[] = new Array(frameCount)
    const imageSeq = { frame: 0 }

    const render = () => {
      const img = images[imageSeq.frame]
      if (img?.complete && img.naturalWidth > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    }

    const loadImage = (i: number): Promise<void> =>
      new Promise(resolve => {
        const img = new window.Image()
        img.src = currentFrame(i)
        images[i] = img
        img.onload = () => {
          if (imageSeq.frame === i) render()
          resolve()
        }
        img.onerror = () => resolve()
      })

    const initTimeline = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=400%',
          scrub: 0.5,
          pin: true,
          refreshPriority: -1,
        }
      })

      tl.to(imageSeq, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        onUpdate: render,
        duration: 1
      }, 0)

      const durationOffset = 0.1
      tl.fromTo(text1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: durationOffset }, 0.0)
      tl.to(text1Ref.current, { opacity: 0, y: -30, duration: durationOffset }, 0.15)

      tl.fromTo(text2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: durationOffset }, 0.25)
      tl.to(text2Ref.current, { opacity: 0, y: -30, duration: durationOffset }, 0.40)

      tl.fromTo(text3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: durationOffset }, 0.50)
      tl.to(text3Ref.current, { opacity: 0, y: -30, duration: durationOffset }, 0.65)

      tl.fromTo(text4Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: durationOffset }, 0.75)
    }

    // Load frame 0 first to set canvas dimensions
    loadImage(0).then(() => {
      const firstImg = images[0]
      canvas.width = firstImg.naturalWidth || 1920
      canvas.height = firstImg.naturalHeight || 1080
      render()

      // Load critical frames (1–29) in parallel
      const criticalBatch = Array.from(
        { length: CRITICAL_FRAMES - 1 },
        (_, i) => loadImage(i + 1)
      )

      Promise.all(criticalBatch).then(() => {
        // Enough frames ready — reveal canvas and start GSAP
        setIsReady(true)
        initTimeline()

        // Load remaining frames quietly in the background
        for (let i = CRITICAL_FRAMES; i < frameCount; i++) {
          loadImage(i)
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section ref={containerRef} id="home" className="relative w-full h-screen bg-black overflow-hidden">

      {/* Loading overlay — fades out once critical frames are ready */}
      <div
        className={`absolute inset-0 z-50 bg-black flex flex-col items-center justify-center gap-4 transition-opacity duration-700 ${
          isReady ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
      >
        <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
        <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-sans">Loading</p>
      </div>

      {/* First frame shown immediately while canvas loads */}
      <NextImage
        src={currentFrame(0)}
        alt="Blue Moon Background"
        fill
        priority
        unoptimized
        className="object-cover z-0 opacity-80 pointer-events-none"
      />

      {/* Canvas fades in smoothly once ready */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
        
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
            <div ref={text1Ref} className="absolute opacity-0 flex flex-col items-start top-[15%] left-[5%] md:left-[8%] max-w-2xl text-left">
                <h1 className="text-5xl md:text-8xl font-sans uppercase tracking-[0.1em] text-white mb-4 text-gradient">
                  Blue Moon
                </h1>
                <p className="text-lg md:text-xl text-gray-300 font-sans font-light tracking-widest uppercase">
                  Essence of the Night
                </p>
            </div>
            
            <div ref={text2Ref} className="absolute opacity-0 flex flex-col items-end bottom-[15%] right-[5%] md:right-[8%] max-w-md text-right">
                <h2 className="text-4xl md:text-5xl font-sans uppercase tracking-[0.1em] text-white mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  Luminous Gravity
                </h2>
                <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">
                  Experience a fragrance that defies boundaries. The milky viscosity suspends time and elevates the senses.
                </p>
            </div>
            
            <div ref={text3Ref} className="absolute opacity-0 flex flex-col items-end top-[15%] right-[5%] md:right-[8%] max-w-md text-right">
                <h2 className="text-4xl md:text-5xl font-sans uppercase tracking-[0.1em] text-white mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  Gritty Noir
                </h2>
                <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">
                  Born from shadows and neon. A provocative scent crafted for the modern enigma.
                </p>
            </div>
            
            <div ref={text4Ref} className="absolute opacity-0 flex flex-col items-start bottom-[15%] left-[5%] md:left-[8%] max-w-md text-left">
                <h2 className="text-4xl md:text-6xl font-sans uppercase tracking-[0.1em] text-white mb-8 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  Own the Night
                </h2>
                <button className="pointer-events-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-sans uppercase tracking-[0.1em] text-sm font-semibold hover:bg-white/20 transition-all duration-300 luxury-glow-hover">
                    Explore the Collection
                </button>
            </div>
        </div>
    </section>
  )
}

export default HeroSection
