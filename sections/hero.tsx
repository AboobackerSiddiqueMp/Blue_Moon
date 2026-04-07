'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const frameCount = 240
const currentFrame = (index: number) =>
  `/hero/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.png`

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLDivElement>(null)
  const text3Ref = useRef<HTMLDivElement>(null)
  const text4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    const container = containerRef.current
    
    if (!canvas || !context || !container) return

    // Preload images
    const images: HTMLImageElement[] = []
    
    const imageSeq = {
      frame: 0
    }

    for (let i = 0; i < frameCount; i++) {
        const img = new Image()
        img.src = currentFrame(i)
        images.push(img)
    }

    images[0].onload = () => {
      canvas.width = images[0].width || 1920
      canvas.height = images[0].height || 1080
      render()
    }

    function render() {
      if (images[imageSeq.frame] && images[imageSeq.frame].complete) {
        context?.clearRect(0, 0, canvas.width, canvas.height)
        context?.drawImage(images[imageSeq.frame], 0, 0, canvas.width, canvas.height)
      }
    }

    // Main animation timeline
    // This timeline will control both the image sequence and the synchronized text fades
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=400%', // Makes the pin duration 4x the viewport height
        scrub: 0.5,
        pin: true,
      }
    })

    // 1. Image Sequence Animation (span the entire timeline, from 0 to 1)
    tl.to(imageSeq, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: render,
      duration: 1
    }, 0)

    // 2. Texts sync
    const durationOffset = 0.1
    // Intro Text (Feature 1) -> 0.0 to 0.2
    tl.fromTo(text1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: durationOffset }, 0.0)
    tl.to(text1Ref.current, { opacity: 0, y: -30, duration: durationOffset }, 0.15)
    
    // Text 2 (Feature 2)
    tl.fromTo(text2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: durationOffset }, 0.25)
    tl.to(text2Ref.current, { opacity: 0, y: -30, duration: durationOffset }, 0.40)

    // Text 3 (Feature 3)
    tl.fromTo(text3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: durationOffset }, 0.50)
    tl.to(text3Ref.current, { opacity: 0, y: -30, duration: durationOffset }, 0.65)

    // Text 4 (Feature 4 - Outro)
    tl.fromTo(text4Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: durationOffset }, 0.75)

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={containerRef} id="home" className="relative w-full h-screen bg-black overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
        
        {/* Texts container overlayed on top of the canvas */}
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
            
            {/* Text 1: Top Left */}
            <div ref={text1Ref} className="absolute opacity-0 flex flex-col items-start top-[15%] left-[5%] md:left-[8%] max-w-2xl text-left">
                <h1 className="text-5xl md:text-8xl font-sans uppercase tracking-[0.1em] text-white mb-4 text-gradient">
                  Blue Moon
                </h1>
                <p className="text-lg md:text-xl text-gray-300 font-sans font-light tracking-widest uppercase">
                  Essence of the Night
                </p>
            </div>
            
            {/* Text 2: Bottom Right */}
            <div ref={text2Ref} className="absolute opacity-0 flex flex-col items-end bottom-[15%] right-[5%] md:right-[8%] max-w-md text-right">
                <h2 className="text-4xl md:text-5xl font-sans uppercase tracking-[0.1em] text-white mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  Luminous Gravity
                </h2>
                <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">
                  Experience a fragrance that defies boundaries. The milky viscosity suspends time and elevates the senses.
                </p>
            </div>
            
            {/* Text 3: Top Right */}
            <div ref={text3Ref} className="absolute opacity-0 flex flex-col items-end top-[15%] right-[5%] md:right-[8%] max-w-md text-right">
                <h2 className="text-4xl md:text-5xl font-sans uppercase tracking-[0.1em] text-white mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  Gritty Noir
                </h2>
                <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">
                  Born from shadows and neon. A provocative scent crafted for the modern enigma.
                </p>
            </div>
            
            {/* Text 4: Bottom Left */}
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
