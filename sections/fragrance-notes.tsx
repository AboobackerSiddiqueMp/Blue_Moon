'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const FragranceNotesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Animate the line height from 0% to 100%
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const notes = [
    {
      title: 'Top Notes',
      time: '0-15 Min',
      description: 'First Impression',
      items: ['Bergamot', 'Saffron', 'Cardamom'],
    },
    {
      title: 'Heart Notes',
      time: '15 Min - 6 Hrs',
      description: 'Peak Fragrance',
      items: ['Iris', 'Sandalwood', 'Leather'],
    },
    {
      title: 'Base Notes',
      time: '6-10+ Hrs',
      description: 'Dry Down & Foundation',
      items: ['Musk', 'Cedarwood', 'Vetiver'],
    },
  ]

  return (
    <section
      id="fragrance"
      className="relative py-32 px-6 overflow-hidden"
      suppressHydrationWarning
    >
      <div className="max-w-4xl mx-auto relative" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 tracking-wide">
            The <span className="text-gradient">Evolution</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            A meticulously crafted olfactory journey. From the initial burst to the lingering dark foundation.
          </p>
        </motion.div>

        <div className="relative">
          {/* Central Line Background */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-border transform md:-translate-x-1/2 z-0"></div>
          
          {/* Animated Central Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-accent via-blue-600 to-transparent transform md:-translate-x-1/2 z-10"
          ></motion.div>

          <div className="space-y-24 relative z-20">
            {notes.map((note, idx) => {
              const isEven = idx % 2 === 0
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true, margin: "-20%" }}
                  className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-8 md:gap-16 relative pl-20 md:pl-0`}
                >
                  {/* Glowing Node */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true, margin: "-20%" }}
                    className="absolute left-[31.5px] md:left-1/2 top-0 md:top-2 w-[11px] h-[11px] rounded-full bg-accent luxury-glow transform md:-translate-x-1/2"
                  />

                  {/* Empty space for alternating side on desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                    <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
                      {note.time}
                    </p>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                      {note.title}
                    </h3>
                    <p className="text-muted-foreground text-sm uppercase tracking-wider mb-6">
                      {note.description}
                    </p>

                    <ul className={`space-y-3 ${isEven ? 'md:items-end flex flex-col items-start' : 'items-start flex flex-col'}`}>
                      {note.items.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                          viewport={{ once: true }}
                          className="text-foreground/80 hover:text-accent transition-colors cursor-default text-lg"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FragranceNotesSection

