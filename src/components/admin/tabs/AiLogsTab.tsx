"use client"
import React, { useState } from 'react'
import { Zap, MessageSquare, Loader2, Trash2, ShieldAlert } from 'lucide-react'
import type { ChatSession, ChatAnalytics } from '@/types'

interface Props {
  chatSessions: ChatSession[]
  chatAnalytics: ChatAnalytics | null
  loading: boolean
  fetchAll: () => Promise<void>
  showSuccess: (msg: string) => void
}

export function AiLogsTab({ chatSessions, chatAnalytics, loading, fetchAll, showSuccess }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this conversation?')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/chat-logs?sessionId=${id}`, { method: 'DELETE' })
      if (res.ok) {
        showSuccess('Conversation deleted')
        fetchAll()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setDeletingId(null)
    }
  }

  const handleClearAll = async () => {
    if (!confirm('CRITICAL: This will wipe ALL AI conversation history. Proceed?')) return
    try {
      const res = await fetch('/api/admin/chat-logs?clearAll=true', { method: 'DELETE' })
      if (res.ok) {
        showSuccess('All conversation logs cleared')
        fetchAll()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-3xl border border-white/10">
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldAlert size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Management Console</span>
        </div>
        <button 
          onClick={handleClearAll}
          className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
        >
          <Trash2 size={14} /> Clear All History
        </button>
      </div>

      {chatAnalytics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-primary/10 border border-primary/20 col-span-2 shadow-[0_0_30px_rgba(var(--primary),0.05)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary rounded-lg text-primary-foreground shadow-lg shadow-primary/20"><Zap size={20} /></div>
              <h3 className="text-xl font-bold">Intelligence Insights</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div><p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Total Impact</p><p className="text-2xl font-bold">{chatAnalytics.totalMessages} MSGS</p></div>
              <div><p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Retention</p><p className="text-2xl font-bold">{chatAnalytics.avgMessagesPerSession} AVG</p></div>
              <div className="col-span-2">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Frequent Topics</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(chatAnalytics.topicStats).map(([topic, count]) => (
                    <span key={topic} className="px-3 py-1 bg-white/5 rounded-full text-xs border border-white/10 flex items-center gap-2">
                      {topic} <span className="text-primary font-bold">{count}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Hot Queries</h4>
            <ul className="space-y-3">
              {chatAnalytics.recentUserQueries.map((q, i) => (
                <li key={i} className="text-xs text-slate-300 italic border-l-2 border-primary/30 pl-3 py-1 line-clamp-2">"{q}"</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-500"><Loader2 className="animate-spin mr-2" /> Loading Conversations...</div>
      ) : chatSessions.length === 0 ? (
        <div className="rounded-3xl bg-white/5 border border-white/10 p-20 text-center text-slate-500 italic">No conversations logged yet.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {chatSessions.map((session) => (
            <div key={session.id} className="group p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col h-[500px] hover:border-white/20 transition-colors">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform"><MessageSquare size={18} /></div>
                  <div>
                    <p className="font-bold text-sm">Session {session.id.substring(0, 8)}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{new Date(session.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-400">{session.messages.length} messages</span>
                  <button 
                    onClick={() => handleDelete(session.id)}
                    disabled={deletingId === session.id}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                  >
                    {deletingId === session.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                {session.messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-white/5 text-slate-300 border border-white/5 rounded-tl-none font-medium'
                    }`}>
                      {msg.content}
                    </div>
                    <span className="text-[9px] text-slate-600 mt-1 uppercase font-bold tracking-tight">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
