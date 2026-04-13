"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { skillCategories } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/providers/LanguageProvider'

import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function SkillsShowcase() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="py-24 px-4 bg-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 space-y-4 text-center">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
              {t('skills.label')}
            </div>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter">
              {t('skills.title')}
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.3}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('skills.description')}
            </p>
          </ScrollReveal>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <ScrollReveal
              key={category.title}
              variant={catIndex % 2 === 0 ? "fadeUp" : "scaleUp"}
              delay={0.15 + (catIndex * 0.1)}
              className="h-full"
              width="100%"
            >
              <div className="bg-background rounded-[2rem] p-8 border border-border shadow-sm hover:shadow-md transition-all h-full group">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                   <span className="h-2 w-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                   {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.5,
                        delay: (catIndex * 0.1) + (skillIndex * 0.03),
                        ease: "easeOut"
                      }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: "var(--primary-color)",
                        color: "white" 
                      }}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-default",
                        "bg-muted/50 border-transparent hover:border-primary/30"
                      )}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
