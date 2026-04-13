"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/providers/LanguageProvider'
import { Briefcase } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function JourneyTimeline() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Fetch localized items from dictionary
  const journeyItems = (t('journey.items') || []) as any[]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end 80%"]
  })

  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section id="journey" className="relative py-24 pb-32 md:pb-24 px-4 bg-background overflow-hidden" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 space-y-4 text-center">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
              {t('journey.label')}
            </div>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter">
              {t('journey.title')}
            </h2>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <div className="relative space-y-12">
          {/* Static Background Line */}
          <div className="absolute left-[19px] md:left-1/2 top-4 bottom-0 w-[2px] bg-muted-foreground/10 md:-translate-x-1/2" />
          
          {/* Animated "Growing" Line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-[19px] md:left-1/2 top-4 bottom-0 w-[2px] bg-primary md:-translate-x-1/2 z-0 hidden md:block"
          />

          {journeyItems.map((item: any, index: number) => (
            <ScrollReveal
              key={`${item.role}-${index}`}
              variant={index % 2 === 0 ? "fadeLeft" : "fadeRight"}
              delay={0.1}
              width="100%"
            >
              <div className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Dot and Icon */}
                <div className="absolute left-[19px] md:left-1/2 top-0 -translate-x-1/2 z-10">
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                    viewport={{ once: true }}
                    className="w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)] ring-4 ring-background"
                  >
                    <Briefcase size={18} />
                  </motion.div>
                </div>

                {/* Content Panel */}
                <div className="w-full md:w-[calc(50%-40px)] ml-12 md:ml-0">
                  <div className="p-8 rounded-[2rem] bg-muted/20 border border-border/50 hover:border-primary/30 transition-all group hover:bg-muted/30">
                    <span className="text-xs font-black text-primary tracking-[0.2em] uppercase mb-3 block">
                      {item.period}
                    </span>
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {item.role}
                    </h3>
                    <p className="text-sm font-bold text-muted-foreground mb-4">
                      {item.company}
                    </p>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

