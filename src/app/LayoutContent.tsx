"use client"

import React from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"
import { Inter, Outfit } from "next/font/google"
import { usePathname } from 'next/navigation'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

import { DynamicThemeProvider } from '@/providers/DynamicThemeProvider'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { locale } = useLanguage()
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <DynamicThemeProvider>
          {!isAdmin && <Navbar />}
          <main className={isAdmin ? 'flex-1' : 'flex-1 pt-20'}>
            {children}
          </main>
          {!isAdmin && <Footer />}
        </DynamicThemeProvider>
      </body>
    </html>
  )
}

