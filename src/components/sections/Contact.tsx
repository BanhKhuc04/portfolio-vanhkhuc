"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Send, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/providers/LanguageProvider'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function Contact() {
  const { t } = useLanguage()

  const socialLinks = [
    { 
      icon: (props: any) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
      ), 
      href: "https://github.com/BanhKhuc04", 
      label: "GitHub" 
    },
    { 
      icon: (props: any) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
      ), 
      href: "#", 
      label: "LinkedIn" 
    },
    { 
      icon: (props: any) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
      ), 
      href: "#", 
      label: "Twitter" 
    },
    { icon: Mail, href: "mailto:hello@vanhkhuc.dev", label: "Email" },
  ]

  return (
    <section id="contact" className="py-24 px-4 bg-muted/30 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: CTA & Info */}
          <div className="space-y-8">
            <ScrollReveal variant="fadeRight">
              <div className="space-y-4">
                <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                  {t('contact.label')}
                </div>
                <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter leading-tight" 
                    dangerouslySetInnerHTML={{ __html: t('contact.title') }} />
                <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                  {t('contact.subheadline')}
                </p>
              </div>
            </ScrollReveal>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <ScrollReveal key={social.label} variant="scaleUp" delay={0.2 + (index * 0.1)} duration={0.6}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-background border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group block"
                    aria-label={social.label}
                  >
                    <social.icon size={20} className={cn("text-muted-foreground group-hover:text-primary transition-colors", typeof social.icon === 'function' ? 'w-5 h-5' : '')} />
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <ScrollReveal variant="fadeLeft">
            <div className="p-8 md:p-10 rounded-3xl bg-background border border-border shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-muted-foreground">{t('contact.name')}</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl bg-muted/30 border border-transparent focus:border-primary/50 focus:bg-background outline-none transition-all placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-muted-foreground">{t('contact.email')}</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-xl bg-muted/30 border border-transparent focus:border-primary/50 focus:bg-background outline-none transition-all placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-muted-foreground">{t('contact.message')}</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="..."
                    className="w-full px-5 py-4 rounded-xl bg-muted/30 border border-transparent focus:border-primary/50 focus:bg-background outline-none transition-all placeholder:text-muted-foreground/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group flex items-center justify-center gap-2 px-8 py-5 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-all active:scale-95"
                >
                  {t('contact.send')}
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
