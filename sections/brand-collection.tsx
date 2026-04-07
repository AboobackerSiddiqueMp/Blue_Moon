'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

const collection = [
  {
    id: 'blood-orange',
    name: 'Crimson Sun',
    note: 'Spicy Amber & Blood Orange',
    image: '/bloodOrange.png',
    color: '#AA3333'
  },
  {
    id: 'black-orchid',
    name: 'Midnight Velvet',
    note: 'Black Orchid & Dark Woods',
    image: '/blackOrchid.png',
    color: '#442266'
  },
  {
    id: 'silver-rain',
    name: 'Silver Rain',
    note: 'Ozone, Petrichor & White Musk',
    image: '/silverRain.png',
    color: '#CCCCCC'
  }
]

export default function BrandCollection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] bg-background py-24 md:py-32 overflow-hidden flex flex-col justify-center"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] via-background to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-foreground tracking-widest uppercase mb-4 opacity-90">
            The Collection
          </h2>
          <p className="text-foreground/50 uppercase tracking-[0.3em] text-xs font-light">
            Explore Other Masterpieces
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-7xl mx-auto">
          {collection.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative flex flex-col items-center cursor-pointer"
            >
              <div className="relative w-full aspect-[3/4] mb-8 bg-[#050505] rounded-sm overflow-hidden border border-white/[0.03] transition-all duration-700 group-hover:border-white/10 flex items-center justify-center">
                {/* Glow effect behind bottle */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-1000 blur-3xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)` }}
                />
                
                {/* Ambient noise overly specifically for product cards to give texture */}
                <div className="absolute inset-0 noise opacity-20 mix-blend-overlay pointer-events-none" />
                
                <div className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className={`object-cover transition-all duration-700`}
                    />
                </div>
              </div>

              <h3 className="text-2xl font-serif tracking-wider mb-2 text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-sm tracking-[0.2em] text-foreground/40 uppercase font-light text-center">
                {item.note}
              </p>
              
              <div className="h-[1px] w-0 bg-white/30 mt-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-16 opacity-50" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
