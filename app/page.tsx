'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Navbar from '@/components/navbar'
import ScrollProgress from '@/components/scroll-progress'
import CustomCursor from '@/components/custom-cursor'
import PageIntro from '@/components/page-intro'
import SectionDivider from '@/components/section-divider'
import HeroSection from '@/sections/hero'
import FragranceNotesSection from '@/sections/fragrance-notes'
import ProductShowcase from '@/sections/product-showcase'
import BrandCollection from '@/sections/brand-collection'
import FooterSection from '@/sections/footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative bg-background text-foreground overflow-hidden cursor-none">
      <ScrollProgress />
      <CustomCursor />

      <AnimatePresence>
        {showIntro && <PageIntro />}
      </AnimatePresence>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-background z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      <HeroSection />
      <SectionDivider text="Fragrance Notes" />
      <FragranceNotesSection />
      <SectionDivider text="Product" />
      <ProductShowcase />
      <SectionDivider text="The Collection" />
      <BrandCollection />
      <FooterSection />

      <div className="fixed inset-0 noise opacity-5 pointer-events-none" />
    </div>
  )
}
