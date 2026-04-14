"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, X, Bot, User, Loader2, Minimize2 } from 'lucide-react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import type { UIMessage } from 'ai'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/providers/LanguageProvider'

/** Helper: extract plain text from a UIMessage's parts array */
function getMessageText(message: UIMessage): string {
  if (!message.parts) return ''
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

export function RecruiterChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { locale } = useLanguage()

  // Initialize persistent session ID
  useEffect(() => {
    let id = localStorage.getItem('hermes_session_id')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('hermes_session_id', id)
    }
    setSessionId(id)

    // Fetch initial messages for history persistence
    fetch(`/api/chat/history?sessionId=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages)
        }
      })
      .catch(err => console.error('Failed to load chat history:', err))
  }, [])

  const {
    messages,
    setMessages,
    sendMessage,
    status,
    error,
  } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat/recruiter',
      body: {
        sessionId: sessionId || '',
        locale: locale,
      },
      headers: {
        'x-portfolio-locale': locale,
      }
    }),
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  const onSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() || isLoading) return

    sendMessage({ text: input })
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
            "relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500",
            isOpen 
              ? "bg-slate-900 text-white border border-white/10" 
              : "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)]"
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
            className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[70vh] z-50 overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/80 backdrop-blur-3xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                  <Bot size={22} className={cn(isLoading && "animate-pulse")} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-tight uppercase">Hermes Engine</h3>
                    <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[8px] text-cyan-400 font-bold uppercase tracking-widest">
                      Groq Speed
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full", isLoading ? "bg-amber-500 animate-pulse" : "bg-emerald-500")} />
                    <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                      {isLoading ? (locale === 'vi' ? 'Đang suy nghĩ...' : 'Synthesizing...') : (locale === 'vi' ? 'Đang trực tuyến' : 'Live Extension')}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-all hover:rotate-90 p-2 hover:bg-white/5 rounded-full">
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
                    <p className="text-xs text-slate-400 max-w-[200px]">{"Ask me about Viet Anh's tech stack, projects, or professional experience."}</p>
                  </div>
                </div>
              )}

              {messages.map((m) => {
                const text = getMessageText(m)
                if (!text) return null

                return (
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
                      "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
                      m.role === 'user' 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-white/5 text-slate-200 border border-white/5 rounded-tl-none"
                    )}>
                      {text}
                    </div>
                  </div>
                )
              })}
              
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
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-3.5 pr-14 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 bottom-2 w-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="mt-3 text-[10px] text-center text-slate-500 font-medium">
                Powered by Groq &amp; Llama 3.3
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
