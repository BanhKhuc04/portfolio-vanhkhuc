"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Hammer } from 'lucide-react'

export function LiveStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-muted/60 border border-border backdrop-blur-lg shadow-xl hover:bg-muted transition-colors group cursor-default"
    >
      <div className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </div>
      
      <div className="flex items-center gap-2">
        <Hammer size={14} className="text-primary group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-semibold tracking-wide text-foreground/90">
          Currently Building: <span className="text-primary">Portfolio HQ v1.0</span>
        </span>
      </div>
    </motion.div>
  )
}

