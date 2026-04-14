"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Project } from '@/content/data'
import { Locale } from '@/lib/i18n/dictionaries'

interface ProjectDetailClientProps {
  project: Project
  locale: Locale
  translations: any
}

export default function ProjectDetailClient({ project, locale, translations }: ProjectDetailClientProps) {
  const router = useRouter()
  const t = (key: string) => {
    const keys = key.split('.')
    let current = translations
    for (const k of keys) {
      if (!current) return key
      current = current[k]
    }
    return current || key
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Top Bar (Simplified Navbar) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border py-4 px-6 flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          {t('nav.projects')}
        </button>
        <span className="font-heading font-bold text-lg tracking-tighter">{project.title}</span>
        <div className="flex gap-4">
           {project.githubUrl && (
             <a href={project.githubUrl} target="_blank" className="hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
             </a>
           )}
           {project.liveUrl && (
             <a href={project.liveUrl} target="_blank" className="hover:text-primary transition-colors"><Globe size={20} /></a>
           )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
              {project.tag}
            </div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-heading font-bold tracking-tighter leading-tight"
            >
              {project.title}
            </motion.h1>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-xl">
              {project.description}
            </p>
            
            <div className="flex gap-6 pt-4">
               {project.liveUrl && (
                 <a href={project.liveUrl} target="_blank" className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-all flex items-center gap-2">
                   {t('projects.live')} <ExternalLink size={18} />
                 </a>
               )}
               <button className="px-8 py-4 bg-muted text-foreground border border-border rounded-full font-bold hover:bg-muted/80 transition-all">
                 Case Study
               </button>
            </div>
          </div>

          <div className={`aspect-video rounded-[2.5rem] bg-linear-to-br ${project.color || 'from-primary/20 to-accent/20'} border border-border flex items-center justify-center p-12 overflow-hidden shadow-2xl group`}>
             <motion.div 
               whileHover={{ scale: 1.05, rotate: -2 }}
               className="text-[12rem] md:text-[16rem] font-heading font-bold opacity-10 select-none"
             >
               {project.title.substring(0, 2)}
             </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Details Grid */}
      <section className="bg-muted/30 py-24 px-6 border-t border-border">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
               <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Challenge</h4>
               <p className="text-muted-foreground">Detailed description of the problem this project solved. Optimized for performance and scalability in modern environments.</p>
            </div>
            <div className="space-y-4">
               <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Solution</h4>
               <p className="text-muted-foreground">How I used specific technologies to achieve the production-ready goals of this professional ecosystem.</p>
            </div>
            <div className="space-y-4">
               <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Impact</h4>
               <p className="text-muted-foreground">{project.stat || "Optimized for high-performance and seamless user experiences."}</p>
            </div>
         </div>
      </section>
    </div>
  )
}
