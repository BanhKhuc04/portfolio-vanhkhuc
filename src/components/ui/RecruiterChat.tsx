// @ts-nocheck
"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, X, Bot, User, Loader2, Minimize2 } from 'lucide-react'
import { useChat } from '@ai-sdk/react'
import { cn } from '@/lib/utils'

export function RecruiterChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  
  // @ts-ignore - useChat type mismatch in AI SDK v4
  const chatProps = useChat({
    api: '/api/chat/recruiter',
    body: { sessionId },
    onResponse: (response) => {
      const newSessionId = response.headers.get('x-chat-session-id')
      if (newSessionId && !sessionId) {
        setSessionId(newSessionId)
      }
    }
  }) as any
  
  const { messages, input, handleInputChange, setInput, append, isLoading, error } = chatProps
  
  const onSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input?.trim() || isLoading) return
    
    append({
      role: 'user',
      content: input
    })
    setInput('')
  }

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors",
            isOpen ? "bg-slate-800 text-white" : "bg-primary text-primary-foreground"
          )}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <Minimize2 size={24} />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageSquare size={24} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Pulse Effect */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
          )}
        </motion.button>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[70vh] z-50 overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">AI Recruiter Agent</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Online & Training Ready</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <div className="p-4 rounded-full bg-white/5">
                    <Bot size={32} className="text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white">How can I help you today?</p>
                    <p className="text-xs text-slate-400 max-w-[200px]">Ask me about Viet Anh's tech stack, projects, or professional experience.</p>
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={cn(
                    "flex gap-3",
                    m.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] border",
                    m.role === 'user' ? "bg-slate-800 border-white/10" : "bg-primary/20 border-primary/20 text-primary"
                  )}>
                    {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                    m.role === 'user' 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-white/5 text-slate-200 border border-white/5 rounded-tl-none"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/20 text-primary flex items-center justify-center">
                    <Loader2 size={14} className="animate-spin" />
                  </div>
                  <div className="bg-white/5 text-slate-400 rounded-2xl rounded-tl-none px-4 py-3 text-sm flex gap-1 items-center">
                    Thinking<span className="animate-bounce">.</span><span className="animate-bounce delay-75">.</span><span className="animate-bounce delay-150">.</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center">
                  Something went wrong. Please try again.
                </div>
              )}
            </div>

            {/* Input Area */}
            <form 
              onSubmit={onSend}
              className="p-6 border-t border-white/5 bg-white/5"
            >
              <div className="relative">
                <input
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      onSend()
                    }
                  }}
                  placeholder="Type your question..."
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-3.5 pr-14 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input?.trim()}
                  className="absolute right-2 top-2 bottom-2 w-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="mt-3 text-[10px] text-center text-slate-500 font-medium">
                Powered by Gemini 1.5 & Vercel AI
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
