"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, Folder, FileText, Wrench, Briefcase, 
  Search, MessageSquare, History, Settings, LogOut, Loader2, CheckCircle2 
} from 'lucide-react'
import Link from 'next/link'

import type { Project, BlogPost, Skill, Experience, SEOMetadata, ChatSession, ActivityLog, ChatAnalytics, DashStats } from '@/types/admin'

import { AuthGate } from '@/components/admin/AuthGate'
import { DashboardTab } from '@/components/admin/tabs/DashboardTab'
import { ProjectsTab } from '@/components/admin/tabs/ProjectsTab'
import { BlogTab } from '@/components/admin/tabs/BlogTab'
import { SkillsTab } from '@/components/admin/tabs/SkillsTab'
import { ExperienceTab } from '@/components/admin/tabs/ExperienceTab'
import { SeoTab } from '@/components/admin/tabs/SeoTab'
import { SettingsTab } from '@/components/admin/tabs/SettingsTab'
import { AiLogsTab } from '@/components/admin/tabs/AiLogsTab'
import { ActivityTab } from '@/components/admin/tabs/ActivityTab'

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  // Core Data State
  const [projects, setProjects] = useState<Project[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [seoRecords, setSeoRecords] = useState<SEOMetadata[]>([])
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])
  const [chatAnalytics, setChatAnalytics] = useState<ChatAnalytics | null>(null)
  const [stats, setStats] = useState<DashStats>({ projects: 0, blogs: 0, publishedBlogs: 0, skills: 0, experiences: 0, aiSessions: 0, aiMessages: 0 })
  const [loading, setLoading] = useState(true)

  // Settings State
  const [aiPrompt, setAiPrompt] = useState('')
  const [themeForm, setThemeForm] = useState({ primaryColor: "oklch(0.5 0.2 260)", radius: "0.75rem" })
  
  // Global UI State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  // Check auth
  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await fetch('/api/admin/auth')
        setAuthenticated(res.ok)
      } catch {
        setAuthenticated(false)
      } finally {
        setAuthChecked(true)
      }
    }
    verifyAuth()
  }, [])

  const fetchAll = useCallback(async () => {
    if (!authenticated) return
    setLoading(true)
    try {
      const [projRes, blogRes, skillRes, expRes, statsRes, seoRes, chatRes, promptRes, activityRes, analyticsRes] = await Promise.all([
        fetch('/api/admin/projects'), fetch('/api/admin/blog'), fetch('/api/admin/skills'), fetch('/api/admin/experience'),
        fetch('/api/admin/stats'), fetch('/api/admin/seo'), fetch('/api/admin/chat-logs'), fetch('/api/admin/prompt'),
        fetch('/api/admin/activity'), fetch('/api/admin/chat-analytics')
      ])
      const [projData, blogData, skillData, expData, statsData, seoData, chatData, promptData, activityData, analyticsData] = await Promise.all([
        projRes.json(), blogRes.json(), skillRes.json(), expRes.json(), statsRes.json(), seoRes.json(), chatRes.json(), promptRes.json(), activityRes.json(), analyticsRes.json()
      ])
      
      setProjects(Array.isArray(projData) ? projData : [])
      setBlogPosts(Array.isArray(blogData) ? blogData : [])
      setSkills(Array.isArray(skillData) ? skillData : [])
      setExperiences(Array.isArray(expData) ? expData : [])
      setSeoRecords(Array.isArray(seoData) ? seoData : [])
      setChatSessions(Array.isArray(chatData) ? chatData : [])
      setActivityLogs(Array.isArray(activityData) ? activityData : [])
      setChatAnalytics(analyticsData)
      setStats(statsData)
      setAiPrompt(promptData.content || '')

      const themeRes = await fetch('/api/admin/theme')
      if (themeRes.ok) {
        const tData = await themeRes.json()
        setThemeForm({ primaryColor: tData.primaryColor, radius: tData.radius })
      }
    } catch (err: any) {
      console.error('Fetch failed:', err)
      if (err.message?.includes('401') || err.status === 401) handleLogout()
    } finally {
      setLoading(false)
    }
  }, [authenticated])

  useEffect(() => { fetchAll() }, [fetchAll])

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    setAuthenticated(false)
  }

  function showSuccess(msg: string) {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  async function handleSyncInitialData() {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/admin/sync', { method: 'POST' })
      if (res.ok) { showSuccess('Initial data synchronized!'); fetchAll() }
    } catch (err) { console.error(err) } finally { setIsSubmitting(false) }
  }

  async function handleThemeUpdate(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/admin/theme', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(themeForm) })
      if (!res.ok) throw new Error('Failed to update theme')
      showSuccess('Cập nhật giao diện thành công!')
      window.location.reload()
    } catch (err) { console.error(err) } finally { setIsSubmitting(false) }
  }

  async function handlePromptSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/admin/prompt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: aiPrompt }) })
      if (res.ok) showSuccess('AI Prompt updated successfully!')
    } catch (err) { console.error(err) } finally { setIsSubmitting(false) }
  }

  async function handleExportData() {
    try {
      const res = await fetch('/api/admin/backup')
      const data = await res.json()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      showSuccess('Data exported successfully!')
    } catch (err) { console.error(err) }
  }

  async function handleImportData(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!confirm('WARNING: This will wipe ALL current data and replace it with the backup. Proceed?')) return

    setIsSubmitting(true)
    try {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const content = event.target?.result as string
        const res = await fetch('/api/admin/backup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: content })
        if (res.ok) {
          showSuccess('Data restored successfully! Reloading...')
          setTimeout(() => window.location.reload(), 1500)
        }
      }
      reader.readAsText(file)
    } catch (err) { console.error(err) } finally { setIsSubmitting(false) }
  }

  if (!authChecked) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>
  if (!authenticated) return <AuthGate onAuth={() => setAuthenticated(true)} />

  const sidebarItems = [
    { id: 'dashboard', name: "Dashboard", icon: LayoutDashboard },
    { id: 'projects', name: "Projects", icon: Folder, count: stats.projects },
    { id: 'blog', name: "Blog Posts", icon: FileText, count: stats.blogs },
    { id: 'skills', name: "Skills", icon: Wrench, count: stats.skills },
    { id: 'experience', name: "Experience", icon: Briefcase, count: stats.experiences },
    { id: 'seo', name: "SEO Settings", icon: Search },
    { id: 'ai_logs', name: "AI Conversations", icon: MessageSquare, count: chatSessions.length },
    { id: 'activity', name: "Activity Logs", icon: History, count: activityLogs.length },
    { id: 'settings', name: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside className="w-64 border-r border-white/5 bg-black/20 backdrop-blur-xl p-6 flex flex-col gap-8 fixed h-full z-40">
        <div className="flex items-center gap-3 px-2">
          <Link href="/" className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-xs">VK</Link>
          <span className="font-heading font-bold text-lg tracking-tighter">Admin HQ</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id ? 'bg-primary/20 text-primary border border-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.name}
              {item.count !== undefined && <span className="ml-auto text-xs bg-white/10 px-2 py-0.5 rounded-full">{item.count}</span>}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all">
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      <main className="flex-1 ml-64 p-10 overflow-y-auto min-h-screen relative">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold font-heading capitalize">{activeTab.replace('_', ' ')} Overview</h1>
            <p className="text-slate-400">Managing the professional digital ecosystem.</p>
          </div>
        </header>

        <AnimatePresence>
          {successMsg && (
            <motion.div initial={{ opacity: 0, y: -20, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium backdrop-blur-xl shadow-2xl">
              <CheckCircle2 size={18} /> {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === 'dashboard' && <DashboardTab stats={stats} loading={loading} isSubmitting={isSubmitting} onSync={handleSyncInitialData} />}
        {activeTab === 'projects' && <ProjectsTab projects={projects} loading={loading} fetchAll={fetchAll} showSuccess={showSuccess} />}
        {activeTab === 'blog' && <BlogTab blogPosts={blogPosts} loading={loading} fetchAll={fetchAll} showSuccess={showSuccess} />}
        {activeTab === 'skills' && <SkillsTab skills={skills} loading={loading} fetchAll={fetchAll} showSuccess={showSuccess} />}
        {activeTab === 'experience' && <ExperienceTab experiences={experiences} loading={loading} fetchAll={fetchAll} showSuccess={showSuccess} />}
        {activeTab === 'seo' && <SeoTab seoRecords={seoRecords} loading={loading} fetchAll={fetchAll} showSuccess={showSuccess} />}
        {activeTab === 'ai_logs' && <AiLogsTab chatSessions={chatSessions} chatAnalytics={chatAnalytics} loading={loading} fetchAll={fetchAll} showSuccess={showSuccess} />}
        {activeTab === 'activity' && <ActivityTab activityLogs={activityLogs} />}
        {activeTab === 'settings' && (
          <SettingsTab 
            aiPrompt={aiPrompt} setAiPrompt={setAiPrompt} 
            themeForm={themeForm} setThemeForm={setThemeForm}
            isSubmitting={isSubmitting} onPromptSubmit={handlePromptSubmit} onThemeUpdate={handleThemeUpdate}
            onSync={handleSyncInitialData} onExport={handleExportData} onImport={handleImportData} onLogout={handleLogout}
          />
        )}
      </main>
    </div>
  )
}
