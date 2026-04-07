'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

const PageIntro = () => {
  useEffect(() => {
    // Disable scroll during intro
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      document.body.style.overflow = 'unset'
    }, 2000)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'unset'
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
    exit: {
      opacity: 0,
      y: -100,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
    >
      <motion.div variants={itemVariants} className="space-y-4 text-center">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-gradient">Blue Moon</h1>
        <p className="text-xl md:text-2xl text-muted-foreground">Essence of the Night</p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="absolute bottom-10 flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ delay: i * 0.1, duration: 0.8, repeat: Infinity }}
            className="w-2 h-2 bg-accent rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default PageIntro
