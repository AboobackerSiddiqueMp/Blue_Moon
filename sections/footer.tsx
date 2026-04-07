'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const FooterSection = () => {
  const footerLinks = {
    Shop: [
      { label: 'Fragrances', href: '#' },
      { label: 'Collections', href: '#' },
      { label: 'New Arrivals', href: '#' },
      { label: 'Gift Sets', href: '#' },
    ],
    Support: [
      { label: 'Contact Us', href: '#' },
      { label: 'Shipping Info', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
    Company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Blog', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  }

  const socialLinks = [
    { icon: '𝕏', label: 'Twitter', href: '#' },
    { icon: '𝕱', label: 'Facebook', href: '#' },
    { icon: '◆', label: 'Instagram', href: '#' },
    { icon: '▶', label: 'YouTube', href: '#' },
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="relative py-20 px-6 bg-secondary/50 border-t border-muted">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-5 gap-12 mb-16"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link href="#" className="font-serif text-2xl font-bold text-accent block">
              Blue Moon
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Essence of the night. Experience luxury and mystery in every spray.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ scale: 1.1, color: '#3b82f6' }}
                  className="w-10 h-10 flex items-center justify-center rounded-full glass text-foreground hover:text-accent transition-colors"
                  title={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={itemVariants} className="space-y-4">
              <h3 className="font-semibold text-foreground">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5 }}
                      className="text-muted-foreground hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          className="glass p-8 rounded-lg mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold">Subscribe to Our Newsletter</h3>
              <p className="text-muted-foreground">
                Get exclusive offers and early access to new releases.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-background border border-muted rounded-full px-6 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-accent text-background rounded-full font-semibold whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-muted"
        >
          <p className="text-muted-foreground text-sm">
            © 2024 Blue Moon Fragrances. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="text-muted-foreground hover:text-accent transition-colors text-sm"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="text-muted-foreground hover:text-accent transition-colors text-sm"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="text-muted-foreground hover:text-accent transition-colors text-sm"
            >
              Sitemap
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default FooterSection
