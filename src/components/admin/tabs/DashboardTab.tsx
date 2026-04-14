"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Folder, FileText, BookOpen, Wrench, Briefcase, MessageSquare, CheckCircle2, BarChart3, Loader2 } from 'lucide-react'
import type { DashStats } from '@/types'

interface Props {
  stats: DashStats
  loading: boolean
  isSubmitting: boolean
  onSync: () => void
}

export function DashboardTab({ stats, loading, isSubmitting, onSync }: Props) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-12">
        {[
          { label: "Projects", value: stats.projects, icon: Folder, color: "text-blue-500" },
          { label: "Blog Posts", value: stats.blogs, icon: FileText, color: "text-emerald-500" },
          { label: "Published", value: stats.publishedBlogs, icon: BookOpen, color: "text-orange-500" },
          { label: "Skills", value: stats.skills, icon: Wrench, color: "text-violet-500" },
          { label: "Experience", value: stats.experiences, icon: Briefcase, color: "text-cyan-500" },
          { label: "AI Sessions", value: stats.aiSessions, icon: MessageSquare, color: "text-rose-500" },
          { label: "AI Messages", value: stats.aiMessages, icon: CheckCircle2, color: "text-amber-500" },
        ].map((stat) => (
          <motion.div key={stat.label} whileHover={{ y: -5 }} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-slate-900 ${stat.color}`}><stat.icon size={24} /></div>
              <ArrowUpRight size={20} className="text-slate-600" />
            </div>
            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            <h3 className="text-3xl font-bold">{loading ? '...' : stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><BarChart3 size={20} /> Database Health</h3>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-12 border-2 border-dashed border-white/5 rounded-3xl">
          <div className="text-slate-500">Connectivity Status: <span className="text-emerald-500 font-bold uppercase">Live (Supabase)</span> | Region: Tokyo</div>
          <button onClick={onSync} disabled={isSubmitting} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold border border-white/10 transition-all flex items-center gap-2">
            {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />} Sync Initial Data
          </button>
        </div>
      </div>
    </>
  )
}
