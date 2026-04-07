'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AboutSection = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Removed GSAP scroll trigger to prevent conflicts with Framer Motion animations
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-6 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Blue Moon</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Crafted for those who embrace the mysteries of the night and appreciate the finer
            things in life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="font-serif text-3xl font-bold">The Story</h3>
            <p className="text-muted-foreground leading-relaxed">
              Blue Moon is more than just a fragrance—it&apos;s a journey through the elegance of
              the night sky. Inspired by the rare beauty of a full moon glowing blue across the
              darkness, every note has been meticulously selected to create a unique sensory
              experience.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our master perfumers spent over two years developing this extraordinary blend,
              sourcing the finest ingredients from around the world. The result is a fragrance
              that captures the essence of luxury, mystery, and timeless elegance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="about-card glass p-6 rounded-lg hover:border-accent/50 transition-all">
              <h4 className="text-accent font-semibold mb-2">Premium Quality</h4>
              <p className="text-muted-foreground text-sm">
                Crafted from the finest ingredients and natural essences sourced globally.
              </p>
            </div>
            <div className="about-card glass p-6 rounded-lg hover:border-accent/50 transition-all">
              <h4 className="text-accent font-semibold mb-2">Timeless Design</h4>
              <p className="text-muted-foreground text-sm">
                Our signature bottle features elegant midnight blue glass with luxurious
                detailing.
              </p>
            </div>
            <div className="about-card glass p-6 rounded-lg hover:border-accent/50 transition-all">
              <h4 className="text-accent font-semibold mb-2">Long-Lasting</h4>
              <p className="text-muted-foreground text-sm">
                An 8-10 hour projection that evolves beautifully throughout the day.
              </p>
            </div>
            <div className="about-card glass p-6 rounded-lg hover:border-accent/50 transition-all">
              <h4 className="text-accent font-semibold mb-2">Ethical Sourcing</h4>
              <p className="text-muted-foreground text-sm">
                All ingredients sourced responsibly with environmental sustainability.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
