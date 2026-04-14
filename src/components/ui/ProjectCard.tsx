"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/lib/data'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface ProjectCardProps {
  project: Project
  className?: string
  index: number
}

export function ProjectCard({ project, className, index }: ProjectCardProps) {
  return (
    <Link 
      href={`/projects/${project.id || project.title.toLowerCase()}`}
      className={cn(
        "block",
        project.featured ? "md:col-span-8 h-[400px]" : "md:col-span-4 h-[400px]",
        className
      )}
    >
      <ScrollReveal 
        variant={index % 2 === 0 ? "fadeUp" : "scaleUp"} 
        delay={0.1 * (index % 3)}
        className="h-full"
        width="100%"
      >
        <div className="group relative flex flex-col h-full overflow-hidden rounded-[2.5rem] border border-border bg-card/80 backdrop-blur-xl transition-all hover:bg-card hover:border-primary/20 p-8">
          
          {/* Background Image Layer */}
          {project.imageUrl && (
            <div className="absolute inset-0 z-0">
               <img 
                 src={project.imageUrl} 
                 alt={project.title} 
                 className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700"
               />
               <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/20 to-slate-950/80" />
            </div>
          )}

          {/* Background Glow */}
          <div className={cn(
            "absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl transition-opacity group-hover:opacity-60",
            project.featured ? "bg-primary/20 opacity-40 text-primary" : "bg-primary/5 opacity-0 text-primary"
          )} />

          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                  {project.tag}
                </span>
                <h3 className={cn(
                  "font-heading font-bold text-foreground",
                  project.featured ? "text-3xl" : "text-xl"
                )}>
                  {project.title}
                </h3>
              </div>
              <div className="rounded-full bg-muted p-2 text-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground transform group-hover:rotate-45">
                <ArrowUpRight size={20} />
              </div>
            </div>

            {/* Description */}
            <p className={cn(
              "text-muted-foreground leading-relaxed transition-colors group-hover:text-foreground",
              project.featured ? "text-lg max-w-lg" : "text-sm"
            )}>
              {project.description}
            </p>

            {/* Footer / Stat */}
            <div className="mt-auto pt-8 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border group-hover:border-primary/20 transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {project.stat || "Real-time"}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Link>
  )
}
