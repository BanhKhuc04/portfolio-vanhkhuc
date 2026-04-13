"use client"

import React, { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  variant?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleUp'
  delay?: number
  duration?: number
  className?: string
  width?: "fit-content" | "100%"
  once?: boolean
}

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  },
  fadeRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }
}

export function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.8,
  className,
  width = "fit-content",
  once = true
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  return (
    <div 
      ref={ref} 
      style={{ position: "relative", width, overflow: "visible" }} 
      className={className}
    >
      <motion.div
        variants={variants[variant]}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1] // Custom smooth cinematic cubic-bezier
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
