"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Locale, dictionaries } from '@/lib/dictionaries'

type Theme = 'light' | 'dark' | 'system'

interface AppContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (path: string) => any
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('vi')
  const [theme, setThemeState] = useState<Theme>('dark')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark')

  // Load saved preferences
  useEffect(() => {
    const savedLocale = localStorage.getItem('vk-locale') as Locale
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'vi')) {
      setLocaleState(savedLocale)
    }

    const savedTheme = localStorage.getItem('vk-theme') as Theme
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setThemeState(savedTheme)
    }
  }, [])

  // Apply theme to <html> element
  useEffect(() => {
    const root = document.documentElement

    function applyTheme(t: Theme) {
      if (t === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        root.classList.toggle('dark', prefersDark)
        setResolvedTheme(prefersDark ? 'dark' : 'light')
      } else {
        root.classList.toggle('dark', t === 'dark')
        setResolvedTheme(t)
      }
    }

    applyTheme(theme)

    // Listen for system preference changes
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = (e: MediaQueryListEvent) => {
        root.classList.toggle('dark', e.matches)
        setResolvedTheme(e.matches ? 'dark' : 'light')
      }
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
  }, [theme])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('vk-locale', newLocale)
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('vk-theme', newTheme)
  }

  const t = (path: string): any => {
    const keys = path.split('.')
    let result: any = dictionaries[locale]
    
    for (const key of keys) {
      if (result) {
        result = result[key]
      }
    }
    
    return result || path
  }

  return (
    <AppContext.Provider value={{ locale, setLocale, t, theme, setTheme, resolvedTheme }}>
      {children}
    </AppContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
