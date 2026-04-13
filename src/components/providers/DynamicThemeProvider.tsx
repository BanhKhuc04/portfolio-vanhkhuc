"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

interface ThemeSettings {
  primaryColor: string
  radius: string
}

const ThemeContext = createContext<{ 
  theme: ThemeSettings, 
  setTheme: (t: ThemeSettings) => void,
  refreshTheme: () => Promise<void>
} | null>(null)

export function DynamicThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeSettings>({
    primaryColor: "oklch(0.5 0.2 260)",
    radius: "0.75rem"
  })

  const refreshTheme = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/theme')
      if (res.ok) {
        const data = await res.json()
        setThemeState({
          primaryColor: data.primaryColor || "oklch(0.5 0.2 260)",
          radius: data.radius || "0.75rem"
        })
      }
    } catch (err) {
      console.error('Failed to load dynamic theme:', err)
    }
  }, [])

  useEffect(() => {
    refreshTheme()
  }, [refreshTheme])

  // Apply CSS variables to root
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--primary', theme.primaryColor)
    root.style.setProperty('--radius', theme.radius)
    // Update ring for accessibility/focus states
    root.style.setProperty('--ring', theme.primaryColor)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState, refreshTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within DynamicThemeProvider')
  return context
}
