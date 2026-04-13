"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects as staticProjects, Project } from '@/lib/data'
import { useLanguage } from '@/providers/LanguageProvider'

interface ProjectsGridProps {
  initialProjects?: Project[]
}

export function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
  const { t } = useLanguage()
  
  // Use DB projects if provided, otherwise fallback to static
  const projectsToDisplay = initialProjects || staticProjects

  const localizedProjects = projectsToDisplay.map(project => {
    const tTitle = t(`projects.items.${project.id}.title`)
    const tTag = t(`projects.items.${project.id}.tag`)
    const tDesc = t(`projects.items.${project.id}.description`)

    return {
      ...project,
      // If t() returns the key (meaning not found), use the DB/Static value
      title: tTitle.includes('projects.items') ? project.title : tTitle,
      tag: tTag.includes('projects.items') ? project.tag : tTag,
      description: tDesc.includes('projects.items') ? project.description : tDesc,
    }
  })

  return (
    <section id="projects" className="py-24 px-4 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest"
          >
            {t('projects.label')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold tracking-tighter"
          >
            {t('projects.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-2xl"
          >
            {t('projects.description')}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          {localizedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
