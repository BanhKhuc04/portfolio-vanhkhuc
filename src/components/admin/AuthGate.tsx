"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Loader2, Eye, EyeOff } from 'lucide-react'

export function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (res.ok) {
        onAuth()
      } else {
        setError('Mật khẩu không đúng')
        setPassword('')
      }
    } catch {
      setError('Lỗi kết nối server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <Lock size={32} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">Admin Panel</h1>
          <p className="text-slate-400 text-sm mt-1">vanhkhuc.dev — Command Center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
              autoComplete="current-password"
              className="w-full px-5 py-4 pr-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-center text-lg tracking-widest"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Lock size={18} />}
            {loading ? 'Đang xác thực...' : 'Truy cập'}
          </button>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-rose-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  )
}
