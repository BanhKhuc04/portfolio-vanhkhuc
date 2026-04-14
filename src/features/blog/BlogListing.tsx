"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { BlogPost } from '@/lib/db/repositories/BlogRepository'
import { Locale } from '@/lib/i18n/dictionaries'

interface BlogListingClientProps {
  posts: BlogPost[]
  locale: Locale
  translations: any
}

export default function BlogListingClient({ posts, locale, translations }: BlogListingClientProps) {
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
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest"
          >
            Developer Blog
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-bold tracking-tighter"
          >
            Thoughts & <span className="text-primary">Insights.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
             {locale === 'vi' ? 'Chia sẻ về kỹ thuật, kiến trúc phần mềm và những gì tôi học được.' : 'Sharing technical deep-dives, software architecture, and lessons learned along the way.'}
          </motion.p>
        </div>

        {/* Posts List */}
        <div className="space-y-12 pt-8">
          {posts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-border last:border-0 hover:bg-muted/10 p-6 rounded-3xl transition-all"
            >
               <div className="md:col-span-1 space-y-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">{post.category}</span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                     <Calendar size={14} />
                     {post.date}
                  </div>
               </div>
               
               <div className="md:col-span-3 space-y-4">
                  <Link href={`/blog/${post.slug}`}>
                     <h2 className="text-3xl md:text-4xl font-heading font-bold group-hover:text-primary transition-colors cursor-pointer">
                        {post.title}
                     </h2>
                  </Link>
                  <p className="text-muted-foreground text-lg leading-relaxed line-clamp-2">
                     {post.summary}
                  </p>
                  <div className="flex items-center justify-between pt-4">
                     <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime} read</span>
                     </div>
                     <Link 
                       href={`/blog/${post.slug}`}
                       className="flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2"
                     >
                        Read More <ArrowRight size={18} />
                     </Link>
                  </div>
               </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
