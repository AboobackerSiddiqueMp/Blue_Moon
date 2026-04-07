'use client'

import { motion } from 'framer-motion'

const SectionDivider = ({ text }: { text?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative py-12 px-6 flex items-center justify-center gap-4"
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 60 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-px bg-gradient-to-r from-transparent to-accent"
      />

      {text && (
        <span className="text-muted-foreground text-sm uppercase tracking-widest font-semibold">
          {text}
        </span>
      )}

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 60 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-px bg-gradient-to-l from-transparent to-accent"
      />
    </motion.div>
  )
}

export default SectionDivider
