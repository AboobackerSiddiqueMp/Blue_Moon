'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TestimonialsSection = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    // Removed GSAP scroll trigger to prevent conflicts with Framer Motion animations
  }, [])

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Fashion Editor',
      text: 'Blue Moon is simply exquisite. The fragrance is sophisticated, mysterious, and absolutely captivating. It has become my signature scent.',
      rating: 5,
    },
    {
      name: 'James Chen',
      role: 'Luxury Connoisseur',
      text: 'After years of trying premium fragrances, Blue Moon stands out as a masterpiece. The longevity and sillage are exceptional.',
      rating: 5,
    },
    {
      name: 'Emma Rodriguez',
      role: 'Fragrance Collector',
      text: 'The complexity of the notes is remarkable. It evolves throughout the day and never fails to receive compliments.',
      rating: 5,
    },
    {
      name: 'Michael Thompson',
      role: 'Entrepreneur',
      text: 'Wearing Blue Moon makes me feel confident and distinguished. It&apos;s more than just a fragrance; it&apos;s an experience.',
      rating: 5,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section ref={containerRef} className="relative pt-4 pb-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            What Our Customers <span className="text-gradient">Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made Blue Moon their signature
            fragrance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="testimonial-card group"
            >
              <div className="glass p-8 rounded-lg h-full flex flex-col justify-between group-hover:border-accent/50 transition-all">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ delay: i * 0.1 }}
                      className="text-accent text-lg"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Author */}
                <div className="border-t border-muted pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-muted"
        >
          <div className="text-center space-y-3">
            <p className="font-serif text-4xl font-bold text-accent">10K+</p>
            <p className="text-muted-foreground">Happy Customers</p>
          </div>
          <div className="text-center space-y-3">
            <p className="font-serif text-4xl font-bold text-accent">4.9</p>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
          <div className="text-center space-y-3">
            <p className="font-serif text-4xl font-bold text-accent">50+</p>
            <p className="text-muted-foreground">Awards Won</p>
          </div>
          <div className="text-center space-y-3">
            <p className="font-serif text-4xl font-bold text-accent">100%</p>
            <p className="text-muted-foreground">Satisfaction Guarantee</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
