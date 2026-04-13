"use client"

import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, Clock, Share2 } from 'lucide-react'
import Link from 'next/link'
import { BlogPost } from '@/lib/repositories/BlogRepository'
import { Locale } from '@/lib/dictionaries'

interface BlogPostClientProps {
  post: BlogPost
  locale: Locale
}

export default function BlogPostClient({ post, locale }: BlogPostClientProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-[0%]"
        style={{ scaleX }}
      />

      {/* Simplified Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border py-4 px-6 flex items-center justify-between">
        <Link 
          href="/blog"
          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          {locale === 'vi' ? 'Quay lại Blog' : 'Back to Blog'}
        </Link>
        <div className="flex gap-4">
           <button className="p-2 hover:text-primary transition-colors"><Share2 size={18} /></button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-3xl mx-auto space-y-12">
         {/* Article Header */}
         <header className="space-y-6">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex items-center gap-4 text-xs font-bold text-primary uppercase tracking-widest"
            >
               <span>{post.category}</span>
               <span className="w-1 h-1 rounded-full bg-border" />
               <span className="text-muted-foreground flex items-center gap-1"><Clock size={14} /> {post.readTime} read</span>
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-6xl font-heading font-bold tracking-tighter leading-[1.1]"
            >
               {post.title}
            </motion.h1>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="flex items-center gap-3 pt-4"
            >
               <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">K4</div>
               <div>
                  <p className="text-sm font-bold">vanhkhuc</p>
                  <p className="text-xs text-muted-foreground">{post.date}</p>
               </div>
            </motion.div>
         </header>

         {/* Article Content */}
         <article className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary">
            <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6 py-2">
               {post.summary}
            </p>
            
            <div className="h-8 shadow-sm" />
            
            {post.content ? (
              <div className="whitespace-pre-wrap leading-relaxed">
                {post.content}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground italic">
                <p>{locale === 'vi' ? 'Nội dung đang được cập nhật...' : 'Content coming soon...'}</p>
              </div>
            )}
         </article>

         {/* Footer / CTA */}
         <footer className="pt-20 border-t border-border mt-20">
            <div className="p-10 rounded-[2.5rem] bg-linear-to-br from-primary/10 to-accent/5 border border-primary/20 text-center space-y-6">
               <h3 className="text-3xl font-heading font-bold tracking-tighter">Enjoyed the read?</h3>
               <p className="text-muted-foreground max-w-md mx-auto">
                  Subscribe to my newsletter for more deep-dives into modern architecture and engineering.
               </p>
               <div className="flex flex-col sm:flex-row gap-2 justify-center pt-4">
                  <input 
                     type="email" 
                     placeholder="john@example.com"
                     className="px-6 py-4 rounded-2xl bg-background border border-border focus:border-primary outline-none transition-all"
                  />
                  <button className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-all">
                     Join the Lab
                  </button>
               </div>
            </div>
         </footer>
      </main>
    </div>
  )
}
