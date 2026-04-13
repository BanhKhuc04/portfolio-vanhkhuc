"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/providers/LanguageProvider"

export function Navbar() {
  const { locale, setLocale, t, setTheme, resolvedTheme } = useLanguage()

  const navItems = [
    { name: t('nav.about'), href: "/#about" },
    { name: t('nav.projects'), href: "/#projects" },
    { name: t('nav.skills'), href: "/#skills" },
    { name: t('nav.journey'), href: "/#journey" },
    { name: t('nav.blog'), href: "/blog" },
    { name: t('nav.contact'), href: "/#contact" },
  ]

  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 py-4",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
             <span className="text-primary-foreground font-bold text-xl relative z-10">K4</span>
          </div>
          <span className="font-heading font-bold text-xl tracking-tighter hidden sm:block">
            vanhkhuc.dev
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 pl-6 border-l border-border">
            {/* Language Toggle */}
            <div className="flex items-center bg-muted rounded-full p-1">
              <button
                onClick={() => setLocale('vi')}
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold transition-all",
                  locale === 'vi' ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
                )}
              >
                VI
              </button>
              <button
                onClick={() => setLocale('en')}
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold transition-all",
                  locale === 'en' ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
                )}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-muted hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </button>

            <Link
              href="#contact"
              className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {t('nav.hire')}
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-bold tracking-tight hover:text-primary transition-colors flex justify-between items-center group"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={14} className="rotate-45" />
                  </div>
                </Link>
              ))}
              
              <Link
                href="#contact"
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.hire')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
