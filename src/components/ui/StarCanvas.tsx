"use client"

import React, { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinklePhase: number
}

export function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let stars: Star[] = []
    let animationFrameId: number

    const initStars = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      stars = []
      const starCount = Math.floor((canvas.width * canvas.height) / 8000)
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.7 + 0.1,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
        })
      }
    }

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Only draw stars if we're in dark mode (optional check but nice)
      const isDark = document.documentElement.classList.contains('dark') || 
                     (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      
      if (!isDark) {
        animationFrameId = requestAnimationFrame(draw)
        return
      }

      stars.forEach(star => {
        const twinkle = Math.sin(timestamp * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7
        const alpha = star.opacity * twinkle

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()

        if (star.size > 1.2) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(165, 180, 252, ${alpha * 0.2})`
          ctx.fill()
        }
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      initStars()
    }

    initStars()
    animationFrameId = requestAnimationFrame(draw)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: 0.8 }}
    />
  )
}
