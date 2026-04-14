"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { AlertCircle, RefreshCcw, Home } from "lucide-react"
import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service like Sentry or Logtail
    console.error("Global Error Captured:", error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-orange-500" />
        
        <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={40} className="text-rose-500" />
        </div>
        
        <h2 className="text-3xl font-bold font-heading mb-2">System Fault</h2>
        <p className="text-slate-400 text-sm mb-6">
          An unexpected error occurred while processing your request. Our automated systems have logged this incident.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 rounded-xl bg-black/50 text-left overflow-x-auto border border-rose-500/20">
            <p className="text-xs font-mono text-rose-400">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-bold text-sm flex items-center justify-center gap-2 group"
          >
            <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all font-bold text-sm flex items-center justify-center gap-2"
          >
            <Home size={16} />
            Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
