"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { StarCanvas } from '@/components/ui/StarCanvas'
import { LiveStatus } from '@/components/ui/LiveStatus'
import { ChevronDown, ArrowRight, Code, Cpu, Globe } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'

import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Smooth scroll parallax transitions
  const yNormal = useTransform(scrollYProgress, [0, 1], [0, 200])
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, 400])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  const springConfig = { damping: 15, stiffness: 100 }
  const yNormalSmooth = useSpring(yNormal, springConfig)
  const ySlowSmooth = useSpring(ySlow, springConfig)

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <StarCanvas />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background z-10" />
      </div>

      {/* Abstract Decorative Elements (Parallax) */}
      <motion.div 
        style={{ y: ySlowSmooth, rotate: 12 }}
        className="absolute top-[10%] right-[10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0"
      />
      <motion.div 
        style={{ y: yNormalSmooth, rotate: -8 }}
        className="absolute bottom-[20%] left-[5%] w-96 h-96 bg-accent/5 rounded-full blur-3xl z-0"
      />

      {/* Content Container */}
      <div className="container relative z-20 px-4 flex flex-col items-center text-center">
        <motion.div
           style={{ opacity, scale }}
           className="space-y-8"
        >
          {/* Live Status */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="mb-4">
              <LiveStatus />
            </div>
          </ScrollReveal>

          {/* Main Headline */}
          <ScrollReveal variant="fadeUp" delay={0.4} duration={1}>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-bold tracking-tighter leading-[0.85]">
              {t('hero.engineering')} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary/80 to-accent">
                {t('hero.ecosystems')}
              </span>
            </h1>
          </ScrollReveal>

          {/* Subheadline */}
          <ScrollReveal variant="fadeUp" delay={0.6}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed transition-all">
              {t('hero.subheadline')}
            </p>
          </ScrollReveal>

          {/* CTA Group */}
          <ScrollReveal variant="fadeUp" delay={0.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="#projects"
                className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-all hover:scale-105"
              >
                {t('hero.viewProjects')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#contact"
                className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full border border-border font-semibold hover:bg-secondary/80 transition-all"
              >
                {t('hero.getInTouch')}
              </Link>
            </div>
          </ScrollReveal>

          {/* Tech Stack Pills (Small) */}
          <ScrollReveal variant="fadeUp" delay={1}>
            <div className="flex flex-wrap justify-center gap-6 pt-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Globe size={18} />
                Next.js
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Cpu size={18} />
                Node.js
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Code size={18} />
                TypeScript
              </div>
            </div>
          </ScrollReveal>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Scroll</span>
        <ChevronDown size={20} className="text-primary" />
      </motion.div>
    </section>
  )
}
