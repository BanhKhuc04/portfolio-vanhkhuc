"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  ArrowUpRight, 
  Plus, 
  Folder, 
  Edit2, 
  Trash2, 
  Search,
  X,
  Loader2,
  CheckCircle2,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  BookOpen,
  BarChart3,
  Wrench,
  Briefcase,
  AlertCircle,
  MessageSquare,
  Bot,
  History,
  Zap,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import { MediaUpload } from '@/components/ui/MediaUpload'

// ==========================================
// TYPES
// ==========================================
interface Project {
  id: string
  titleEn: string
  titleVi: string
  descriptionEn: string
  descriptionVi: string
  featured: boolean
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
}

interface BlogPost {
  id: string
  slug: string
  titleEn: string
  titleVi: string
  summaryEn: string
  summaryVi: string
  contentEn: string
  contentVi: string
  published: boolean
  publishedAt?: string
  imageUrl?: string
}

interface Skill {
  id: string
  name: string
  icon?: string
  category: string
  level: number
}

interface Experience {
  id: string
  titleEn: string
  titleVi: string
  company: string
  descriptionEn: string
  descriptionVi: string
  startDate: string
  endDate?: string
}

interface SEOMetadata {
  id: string
  page: string
  titleEn: string
  titleVi: string
  descriptionEn: string
  descriptionVi: string
  keywords: string[]
  ogImage?: string
}

interface ChatMessage {
  id: string
  role: string
  content: string
  createdAt: string
}

interface ChatSession {
  id: string
  messages: ChatMessage[]
  createdAt: string
}

interface ActivityLog {
  id: string
  action: string
  target: string
  details?: string
  createdAt: string
}

interface ChatAnalytics {
  totalSessions: number
  totalMessages: number
  avgMessagesPerSession: string
  topicStats: Record<string, number>
  recentUserQueries: string[]
}

interface DashStats {
  projects: number
  blogs: number
  publishedBlogs: number
  skills: number
  experiences: number
  aiSessions: number
  aiMessages: number
}

// ==========================================
// AUTH GATE COMPONENT
// ==========================================
function AuthGate({ onAuth }: { onAuth: () => void }) {
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
        sessionStorage.setItem('vk-admin-auth', 'authenticated')
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

// ==========================================
// MAIN ADMIN DASHBOARD
// ==========================================
export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  // Data
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

  // Modals
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false)
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
  const [isExpModalOpen, setIsExpModalOpen] = useState(false)
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [editingExp, setEditingExp] = useState<Experience | null>(null)
  const [editingSeo, setEditingSeo] = useState<SEOMetadata | null>(null)

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // AI Prompt
  const [aiPrompt, setAiPrompt] = useState('')
  const [isPromptLoading, setIsPromptLoading] = useState(false)

  // Project form
  const [projectForm, setProjectForm] = useState({
    titleVi: '', titleEn: '', descriptionVi: '', descriptionEn: '',
    tags: '', liveUrl: '', githubUrl: '', featured: false, imageUrl: ''
  })

  // Blog form
  const [blogForm, setBlogForm] = useState({
    slug: '', titleVi: '', titleEn: '', summaryVi: '', summaryEn: '',
    contentVi: '', contentEn: '', published: false, imageUrl: ''
  })

  // Skill form
  const [skillForm, setSkillForm] = useState({
    name: '', icon: '', category: 'Frontend', level: 80
  })

  // Experience form
  const [expForm, setExpForm] = useState({
    titleVi: '', titleEn: '', company: '', descriptionVi: '', descriptionEn: '',
    startDate: '', endDate: ''
  })

  // SEO form
  const [seoForm, setSeoForm] = useState({
    page: '', titleEn: '', titleVi: '', descriptionEn: '', descriptionVi: '',
    keywords: '', ogImage: ''
  })

  // Theme state
  const [themeForm, setThemeForm] = useState({
    primaryColor: "oklch(0.5 0.2 260)",
    radius: "0.75rem"
  })

  // Check auth on mount
  useEffect(() => {
    const session = sessionStorage.getItem('vk-admin-auth')
    setAuthenticated(session === 'authenticated')
    setAuthChecked(true)
  }, [])

  // Fetch all data
  const fetchAll = useCallback(async () => {
    if (!authenticated) return
    setLoading(true)
    try {
      const [projRes, blogRes, skillRes, expRes, statsRes, seoRes, chatRes, promptRes, activityRes, analyticsRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/blog'),
        fetch('/api/admin/skills'),
        fetch('/api/admin/experience'),
        fetch('/api/admin/stats'),
        fetch('/api/admin/seo'),
        fetch('/api/admin/chat-logs'),
        fetch('/api/admin/prompt'),
        fetch('/api/admin/activity'),
        fetch('/api/admin/chat-analytics')
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

      // Initial theme fetch
      const themeRes = await fetch('/api/admin/theme')
      if (themeRes.ok) {
        const tData = await themeRes.json()
        setThemeForm({
          primaryColor: tData.primaryColor,
          radius: tData.radius
        })
      }
    } catch (err) {
      console.error('Fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }, [authenticated])

  useEffect(() => { fetchAll() }, [fetchAll])

  function handleLogout() {
    sessionStorage.removeItem('vk-admin-auth')
    setAuthenticated(false)
  }

  function showSuccess(msg: string) {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  // ==========================================
  // PROJECT CRUD
  // ==========================================
  function openProjectCreate() {
    setEditingProject(null)
    setProjectForm({ titleVi: '', titleEn: '', descriptionVi: '', descriptionEn: '', tags: '', liveUrl: '', githubUrl: '', featured: false, imageUrl: '' })
    setIsProjectModalOpen(true)
  }
  function openProjectEdit(p: Project) {
    setEditingProject(p)
    setProjectForm({ 
      titleVi: p.titleVi, 
      titleEn: p.titleEn, 
      descriptionVi: p.descriptionVi, 
      descriptionEn: p.descriptionEn, 
      tags: p.tags.join(', '), 
      liveUrl: p.liveUrl || '', 
      githubUrl: p.githubUrl || '', 
      featured: p.featured,
      imageUrl: p.imageUrl || ''
    })
    setIsProjectModalOpen(true)
  }
  async function handleProjectSubmit(e: React.FormEvent) {
    e.preventDefault(); setIsSubmitting(true)
    try {
      const payload = { ...projectForm, tags: projectForm.tags.split(',').map(t => t.trim()).filter(Boolean), ...(editingProject ? { id: editingProject.id } : {}) }
      const res = await fetch('/api/admin/projects', { method: editingProject ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) { showSuccess(editingProject ? 'Project updated!' : 'Project created!'); setIsProjectModalOpen(false); fetchAll() }
    } catch (err) { console.error(err) } finally { setIsSubmitting(false) }
  }
  async function handleProjectDelete(id: string) {
    if (!confirm('Xóa project này?')) return
    try { await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' }); showSuccess('Project deleted'); fetchAll() } catch (err) { console.error(err) }
  }

  // ==========================================
  // BLOG CRUD
  // ==========================================
  function openBlogCreate() {
    setEditingBlog(null)
    setBlogForm({ slug: '', titleVi: '', titleEn: '', summaryVi: '', summaryEn: '', contentVi: '', contentEn: '', published: false, imageUrl: '' })
    setIsBlogModalOpen(true)
  }
  function openBlogEdit(b: BlogPost) {
    setEditingBlog(b)
    setBlogForm({ 
      slug: b.slug, 
      titleVi: b.titleVi, 
      titleEn: b.titleEn, 
      summaryVi: b.summaryVi, 
      summaryEn: b.summaryEn, 
      contentVi: b.contentVi, 
      contentEn: b.contentEn, 
      published: b.published,
      imageUrl: b.imageUrl || ''
    })
    setIsBlogModalOpen(true)
  }
  async function handleBlogSubmit(e: React.FormEvent) {
    e.preventDefault(); setIsSubmitting(true)
    try {
      const payload = { ...blogForm, ...(editingBlog ? { id: editingBlog.id } : {}) }
      const res = await fetch('/api/admin/blog', { method: editingBlog ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) { showSuccess(editingBlog ? 'Blog updated!' : 'Blog created!'); setIsBlogModalOpen(false); fetchAll() }
    } catch (err) { console.error(err) } finally { setIsSubmitting(false) }
  }
  async function handleBlogDelete(id: string) {
    if (!confirm('Xóa bài viết này?')) return
    try { await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' }); showSuccess('Blog deleted'); fetchAll() } catch (err) { console.error(err) }
  }
  async function toggleBlogPublish(b: BlogPost) {
    try {
      await fetch('/api/admin/blog', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: b.id, published: !b.published }) })
      showSuccess(b.published ? 'Unpublished' : 'Published!'); fetchAll()
    } catch (err) { console.error(err) }
  }

  // ==========================================
  // SKILLS CRUD
  // ==========================================
  function openSkillCreate() {
    setEditingSkill(null)
    setSkillForm({ name: '', icon: '', category: 'Frontend', level: 80 })
    setIsSkillModalOpen(true)
  }
  function openSkillEdit(s: Skill) {
    setEditingSkill(s)
    setSkillForm({ name: s.name, icon: s.icon || '', category: s.category, level: s.level })
    setIsSkillModalOpen(true)
  }
  async function handleSkillSubmit(e: React.FormEvent) {
    e.preventDefault(); setIsSubmitting(true)
    try {
      const payload = { ...skillForm, level: Number(skillForm.level), ...(editingSkill ? { id: editingSkill.id } : {}) }
      const res = await fetch('/api/admin/skills', { method: editingSkill ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) { showSuccess(editingSkill ? 'Skill updated!' : 'Skill added!'); setIsSkillModalOpen(false); fetchAll() }
    } catch (err) { console.error(err) } finally { setIsSubmitting(false) }
  }
  async function handleSkillDelete(id: string) {
    if (!confirm('Xóa skill này?')) return
    try { await fetch(`/api/admin/skills?id=${id}`, { method: 'DELETE' }); showSuccess('Skill deleted'); fetchAll() } catch (err) { console.error(err) }
  }

  // ==========================================
  // EXPERIENCE CRUD
  // ==========================================
  function openExpCreate() {
    setEditingExp(null)
    setExpForm({ titleVi: '', titleEn: '', company: '', descriptionVi: '', descriptionEn: '', startDate: '', endDate: '' })
    setIsExpModalOpen(true)
  }
  function openExpEdit(exp: Experience) {
    setEditingExp(exp)
    setExpForm({
      titleVi: exp.titleVi, titleEn: exp.titleEn, company: exp.company,
      descriptionVi: exp.descriptionVi, descriptionEn: exp.descriptionEn,
      startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
      endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : ''
    })
    setIsExpModalOpen(true)
  }
  async function handleExpSubmit(e: React.FormEvent) {
    e.preventDefault(); setIsSubmitting(true)
    try {
      const payload = { ...expForm, endDate: expForm.endDate || null, ...(editingExp ? { id: editingExp.id } : {}) }
      const res = await fetch('/api/admin/experience', { method: editingExp ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) { showSuccess(editingExp ? 'Experience updated!' : 'Experience added!'); setIsExpModalOpen(false); fetchAll() }
    } catch (err) { console.error(err) } finally { setIsSubmitting(false) }
  }
  async function handleExpDelete(id: string) {
    if (!confirm('Xóa experience này?')) return
    try { await fetch(`/api/admin/experience?id=${id}`, { method: 'DELETE' }); showSuccess('Experience deleted'); fetchAll() } catch (err) { console.error(err) }
  }

  // ==========================================
  // SYNC
  // ==========================================
  async function handleSyncInitialData() {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/admin/sync', { method: 'POST' })
      if (res.ok) { showSuccess('Initial data synchronized!'); fetchAll() }
    } catch (err) { console.error(err) } finally { setIsSubmitting(false) }
  }

  // ==========================================
  // SEO CRUD
  // ==========================================
  function openSeoCreate() {
    setEditingSeo(null)
    setSeoForm({ page: '', titleEn: '', titleVi: '', descriptionEn: '', descriptionVi: '', keywords: '', ogImage: '' })
    setIsSeoModalOpen(true)
  }
  function openSeoEdit(s: SEOMetadata) {
    setEditingSeo(s)
    setSeoForm({
      page: s.page,
      titleEn: s.titleEn,
      titleVi: s.titleVi,
      descriptionEn: s.descriptionEn,
      descriptionVi: s.descriptionVi,
      keywords: s.keywords.join(', '),
      ogImage: s.ogImage || ''
    })
    setIsSeoModalOpen(true)
  }
  async function handleSeoSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...seoForm,
          keywords: seoForm.keywords.split(',').map(k => k.trim()).filter(Boolean)
        })
      })
      if (!res.ok) throw new Error('Failed to update SEO')
      showSuccess('Cập nhật SEO thành công!')
      setIsSeoModalOpen(false)
      fetchAll()
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleThemeUpdate(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/admin/theme', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(themeForm)
      })
      if (!res.ok) throw new Error('Failed to update theme')
      showSuccess('Cập nhật giao diện thành công!')
      // Force refresh for context
      window.location.reload()
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handlePromptSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/admin/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: aiPrompt })
      })
      if (res.ok) showSuccess('AI Prompt updated successfully!')
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
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
    } catch (err) {
      console.error(err)
    }
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
        const res = await fetch('/api/admin/backup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: content
        })
        if (res.ok) {
          showSuccess('Data restored successfully! Reloading...')
          setTimeout(() => window.location.reload(), 1500)
        }
      }
      reader.readAsText(file)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ==========================================
  // AUTH CHECK
  // ==========================================
  if (!authChecked) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>
  if (!authenticated) return <AuthGate onAuth={() => setAuthenticated(true)} />

  // ==========================================
  // SIDEBAR ITEMS
  // ==========================================
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

  const filteredProjects = projects.filter(p => p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) || p.titleVi.toLowerCase().includes(searchQuery.toLowerCase()))
  const filteredBlogs = blogPosts.filter(b => b.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) || b.titleVi.toLowerCase().includes(searchQuery.toLowerCase()))

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {} as Record<string, Skill[]>)

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 border-r border-white/5 bg-black/20 backdrop-blur-xl p-6 flex flex-col gap-8 fixed h-full z-40">
        <div className="flex items-center gap-3 px-2">
          <Link href="/" className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-xs">VK</Link>
          <span className="font-heading font-bold text-lg tracking-tighter">Admin HQ</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSearchQuery('') }}
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

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 ml-64 p-10 overflow-y-auto min-h-screen">

        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold font-heading capitalize">{activeTab} Overview</h1>
            <p className="text-slate-400">Managing the professional digital ecosystem.</p>
          </div>
          <div className="flex gap-3">
            {activeTab === 'projects' && <button onClick={openProjectCreate} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"><Plus size={18} /> New Project</button>}
            {activeTab === 'blog' && <button onClick={openBlogCreate} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"><Plus size={18} /> New Post</button>}
            {activeTab === 'skills' && <button onClick={openSkillCreate} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"><Plus size={18} /> Add Skill</button>}
            {activeTab === 'experience' && <button onClick={openExpCreate} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"><Plus size={18} /> Add Experience</button>}
            {activeTab === 'seo' && <button onClick={openSeoCreate} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"><Plus size={18} /> New Page SEO</button>}
          </div>
        </header>

        {/* Success Toast */}
        <AnimatePresence>
          {successMsg && (
            <motion.div initial={{ opacity: 0, y: -20, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium backdrop-blur-xl">
              <CheckCircle2 size={18} /> {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== DASHBOARD TAB ===== */}
        {activeTab === 'dashboard' && (
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
                <button onClick={handleSyncInitialData} disabled={isSubmitting} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold border border-white/10 transition-all flex items-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />} Sync Initial Data
                </button>
              </div>
            </div>
          </>
        )}

        {/* ===== PROJECTS TAB ===== */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
              <Search size={18} className="text-slate-500" />
              <input placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none flex-1 text-sm" />
            </div>
            <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
              <table className="w-full text-left">
                <thead><tr className="border-b border-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest bg-white/[0.02]">
                  <th className="px-8 py-6">Project</th><th className="px-8 py-6">Status</th><th className="px-8 py-6">Tags</th><th className="px-8 py-6 text-right">Actions</th>
                </tr></thead>
                <tbody>
                  {loading ? <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-500"><Loader2 className="animate-spin mx-auto mb-2" /> Loading...</td></tr>
                  : filteredProjects.length === 0 ? <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-500 italic">{searchQuery ? 'No matching projects' : 'No projects yet. Create your first one!'}</td></tr>
                  : filteredProjects.map((project) => (
                    <tr key={project.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      <td className="px-8 py-6"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-bold text-xs text-primary">{project.titleEn.substring(0, 2).toUpperCase()}</div><div><p className="font-bold">{project.titleVi}</p><p className="text-xs text-slate-500">{project.titleEn}</p></div></div></td>
                      <td className="px-8 py-6"><span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${project.featured ? "bg-primary/20 text-primary border border-primary/20" : "bg-slate-500/10 text-slate-500"}`}>{project.featured ? "Featured" : "Regular"}</span></td>
                      <td className="px-8 py-6"><div className="flex gap-1 flex-wrap">{project.tags.slice(0, 3).map(tag => <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-slate-400">{tag}</span>)}</div></td>
                      <td className="px-8 py-6"><div className="flex justify-end gap-2">
                        <button onClick={() => openProjectEdit(project)} className="p-2 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Edit2 size={16} /></button>
                        <button onClick={() => handleProjectDelete(project.id)} className="p-2 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== BLOG TAB ===== */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
              <Search size={18} className="text-slate-500" />
              <input placeholder="Search blog posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none flex-1 text-sm" />
            </div>
            <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
              <table className="w-full text-left">
                <thead><tr className="border-b border-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest bg-white/[0.02]">
                  <th className="px-8 py-6">Post</th><th className="px-8 py-6">Slug</th><th className="px-8 py-6">Status</th><th className="px-8 py-6 text-right">Actions</th>
                </tr></thead>
                <tbody>
                  {loading ? <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-500"><Loader2 className="animate-spin mx-auto mb-2" /> Loading...</td></tr>
                  : filteredBlogs.length === 0 ? <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-500 italic">{searchQuery ? 'No matching posts' : 'No blog posts yet. Write your first one!'}</td></tr>
                  : filteredBlogs.map((post) => (
                    <tr key={post.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      <td className="px-8 py-6"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center font-bold text-xs text-emerald-400"><FileText size={18} /></div><div><p className="font-bold">{post.titleVi}</p><p className="text-xs text-slate-500">{post.titleEn}</p></div></div></td>
                      <td className="px-8 py-6 text-slate-400 text-xs font-mono">/{post.slug}</td>
                      <td className="px-8 py-6"><button onClick={() => toggleBlogPublish(post)} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all hover:scale-105 ${post.published ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>{post.published ? "Published" : "Draft"}</button></td>
                      <td className="px-8 py-6"><div className="flex justify-end gap-2">
                        <button onClick={() => openBlogEdit(post)} className="p-2 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Edit2 size={16} /></button>
                        <button onClick={() => handleBlogDelete(post.id)} className="p-2 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== SKILLS TAB ===== */}
        {activeTab === 'skills' && (
          <div className="space-y-8">
            {loading ? (
              <div className="flex items-center justify-center py-20 text-slate-500"><Loader2 className="animate-spin mr-2" /> Loading...</div>
            ) : skills.length === 0 ? (
              <div className="rounded-3xl bg-white/5 border border-white/10 p-20 text-center text-slate-500 italic">No skills yet. Add your first one!</div>
            ) : (
              Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-300 flex items-center gap-2">
                    <Wrench size={18} className="text-primary" /> {category}
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-slate-500">{categorySkills.length}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {skill.icon && <span className="text-xl">{skill.icon}</span>}
                            <span className="font-bold">{skill.name}</span>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openSkillEdit(skill)} className="p-1.5 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Edit2 size={14} /></button>
                            <button onClick={() => handleSkillDelete(skill.id)} className="p-1.5 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2">
                          <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${skill.level}%` }} />
                        </div>
                        <p className="text-right text-xs text-slate-500 mt-1">{skill.level}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ===== EXPERIENCE TAB ===== */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-20 text-slate-500"><Loader2 className="animate-spin mr-2" /> Loading...</div>
            ) : experiences.length === 0 ? (
              <div className="rounded-3xl bg-white/5 border border-white/10 p-20 text-center text-slate-500 italic">No experiences yet. Add your first one!</div>
            ) : (
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mt-1">
                          <Briefcase size={20} className="text-cyan-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{exp.titleVi}</h4>
                          <p className="text-sm text-slate-500">{exp.titleEn}</p>
                          <p className="text-sm text-primary font-medium mt-1">{exp.company}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(exp.startDate).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                            {' — '}
                            {exp.endDate ? new Date(exp.endDate).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }) : 'Hiện tại'}
                          </p>
                          <p className="text-sm text-slate-400 mt-3 leading-relaxed">{exp.descriptionVi}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openExpEdit(exp)} className="p-2 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Edit2 size={16} /></button>
                        <button onClick={() => handleExpDelete(exp.id)} className="p-2 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      {/* ===== SETTINGS TAB ===== */}
      {activeTab === 'settings' && (
        <div className="space-y-6 pb-20">
          {/* AI Settings Section */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Bot size={20} className="text-primary" /> AI Recruiter Settings</h3>
            <form onSubmit={handlePromptSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">System Prompt Template</label>
                <div className="text-[10px] text-slate-500 mb-2 px-1 italic">Use {'{data}'} as a placeholder for projects, skills, and experience data.</div>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={12}
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl p-6 text-sm font-mono text-slate-300 focus:border-primary outline-none transition-all resize-y"
                  placeholder="Enter system prompt instructions..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                  Save AI Configuration
                </button>
              </div>
            </form>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button onClick={handleSyncInitialData} disabled={isSubmitting} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all text-left flex flex-col gap-3 group">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform"><CheckCircle2 size={24} /></div>
                <div><p className="font-bold text-sm">Sync Initial Data</p><p className="text-xs text-slate-500">Restore default demo data</p></div>
              </button>
              
              <button onClick={handleExportData} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all text-left flex flex-col gap-3 group">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 w-fit group-hover:scale-110 transition-transform"><ArrowUpRight size={24} /></div>
                <div><p className="font-bold text-sm">Export Data</p><p className="text-xs text-slate-500">Download JSON backup</p></div>
              </button>

              <label className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all text-left flex flex-col gap-3 group cursor-pointer">
                <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 w-fit group-hover:scale-110 transition-transform"><Plus size={24} /></div>
                <div><p className="font-bold text-sm">Import Data</p><p className="text-xs text-slate-500">Restore from JSON file</p></div>
                <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
              </label>

              <button onClick={handleLogout} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-rose-500/30 transition-all text-left flex flex-col gap-3 group">
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 w-fit group-hover:scale-110 transition-transform"><LogOut size={24} /></div>
                <div><p className="font-bold text-sm">Logout</p><p className="text-xs text-slate-500">End admin session</p></div>
              </button>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">🎨 Theme Configuration</h3>
            <form onSubmit={handleThemeUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Primary Color (OKLCH or Color Code)</label>
                  <div className="flex gap-2">
                    <input 
                      value={themeForm.primaryColor} 
                      onChange={e => setThemeForm({...themeForm, primaryColor: e.target.value})} 
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all font-mono" 
                      placeholder="oklch(0.5 0.2 260)"
                    />
                    <div 
                      className="w-12 h-12 rounded-xl border border-white/10" 
                      style={{ backgroundColor: themeForm.primaryColor }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Global Border Radius (px, rem, etc.)</label>
                  <input 
                    value={themeForm.radius} 
                    onChange={e => setThemeForm({...themeForm, radius: e.target.value})} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all font-mono" 
                    placeholder="0.75rem"
                  />
                </div>
              </div>
              <button disabled={isSubmitting} className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />} Save Theme Settings
              </button>
            </form>
          </div>
        </div>
      )}

        {/* ===== AI LOGS TAB ===== */}
        {activeTab === 'ai_logs' && (
          <div className="space-y-6">
            {/* AI Insights Card */}
            {chatAnalytics && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 rounded-3xl bg-primary/10 border border-primary/20 col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary rounded-lg text-primary-foreground"><Zap size={20} /></div>
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
                  <div key={session.id} className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col h-[500px]">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary"><MessageSquare size={18} /></div>
                        <div>
                          <p className="font-bold text-sm">Session {session.id.substring(0, 8)}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest">{new Date(session.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-400">{session.messages.length} messages</span>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                      {session.messages.map((msg) => (
                        <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                          <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                            msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-white/5 text-slate-300 border border-white/5 rounded-tl-none'
                          }`}>
                            {msg.content}
                          </div>
                          <span className="text-[9px] text-slate-600 mt-1 uppercase">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      {/* ===== ACTIVITY LOGS TAB ===== */}
      {activeTab === 'activity' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
            <table className="w-full text-left">
              <thead><tr className="border-b border-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest bg-white/[0.02]">
                <th className="px-8 py-6">Timestamp</th><th className="px-8 py-6">Action</th><th className="px-8 py-6">Target</th><th className="px-8 py-6">Details</th>
              </tr></thead>
              <tbody>
                {activityLogs.length === 0 ? <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-500 italic">No activity logs recorded yet.</td></tr>
                : activityLogs.map((log) => (
                  <tr key={log.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6"><div className="flex items-center gap-2 text-slate-400 text-xs"><Clock size={12} /> {new Date(log.createdAt).toLocaleString()}</div></td>
                    <td className="px-8 py-6">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        log.action.includes('CREATE') ? 'bg-emerald-500/10 text-emerald-400' :
                        log.action.includes('UPDATE') ? 'bg-amber-500/10 text-amber-400' :
                        'bg-rose-500/10 text-rose-400'
                      }`}>
                        {log.action.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-bold text-sm">{log.target}</td>
                    <td className="px-8 py-6 text-slate-500 text-xs">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== SEO TAB ===== */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
            <table className="w-full text-left">
              <thead><tr className="border-b border-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest bg-white/[0.02]">
                <th className="px-8 py-6">Page</th><th className="px-8 py-6">SEO Title (EN)</th><th className="px-8 py-6">Keywords</th><th className="px-8 py-6 text-right">Actions</th>
              </tr></thead>
              <tbody>
                {loading ? <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-500"><Loader2 className="animate-spin mx-auto mb-2" /> Loading...</td></tr>
                : seoRecords.length === 0 ? <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-500 italic">No SEO metadata yet. Create one!</td></tr>
                : seoRecords.map((seo) => (
                  <tr key={seo.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center font-bold text-xs text-orange-400">/{seo.page.substring(0,2)}</div><div><p className="font-bold">/{seo.page}</p><p className="text-xs text-slate-500">ID: {seo.id.substring(0,8)}</p></div></div></td>
                    <td className="px-8 py-6"><p className="text-sm line-clamp-1">{seo.titleEn}</p></td>
                    <td className="px-8 py-6"><div className="flex gap-1 flex-wrap">{seo.keywords.slice(0,3).map(k => <span key={k} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-slate-400">{k}</span>)}</div></td>
                    <td className="px-8 py-6 text-right"><button onClick={() => openSeoEdit(seo)} className="p-2 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Edit2 size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== SEO MODAL ===== */}
      <AnimatePresence>
        {isSeoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden relative shadow-2xl my-auto">
              <button onClick={() => setIsSeoModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors z-10"><X size={20} /></button>
              <form onSubmit={handleSeoSubmit} className="p-10 space-y-6">
                <h2 className="text-2xl font-bold font-heading">{editingSeo ? 'Edit Page SEO' : 'New Page SEO'}</h2>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Page Identifier (e.g. 'home', 'projects')</label><input required disabled={!!editingSeo} value={seoForm.page} onChange={e => setSeoForm({...seoForm, page: e.target.value.toLowerCase()})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all font-mono" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (Vietnamese)</label><input required value={seoForm.titleVi} onChange={e => setSeoForm({...seoForm, titleVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                    <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (English)</label><input required value={seoForm.titleEn} onChange={e => setSeoForm({...seoForm, titleEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                  </div>
                  <MediaUpload label="OG Image (1200x630)" currentImageUrl={seoForm.ogImage} onUploadComplete={(url) => setSeoForm({...seoForm, ogImage: url})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description (Vietnamese)</label><textarea required rows={3} value={seoForm.descriptionVi} onChange={e => setSeoForm({...seoForm, descriptionVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description (English)</label><textarea required rows={3} value={seoForm.descriptionEn} onChange={e => setSeoForm({...seoForm, descriptionEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                </div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Keywords (comma separated)</label><input placeholder="portfolio, nextjs, systems engineer" value={seoForm.keywords} onChange={e => setSeoForm({...seoForm, keywords: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                <button disabled={isSubmitting} className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">{isSubmitting ? <Loader2 className="animate-spin" /> : <Search size={18} />}{editingSeo ? 'Update SEO' : 'Create SEO'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </main>

      {/* ===== PROJECT MODAL ===== */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden relative shadow-2xl my-auto">
              <button onClick={() => setIsProjectModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors z-10"><X size={20} /></button>
              <form onSubmit={handleProjectSubmit} className="p-10 space-y-6">
                <h2 className="text-2xl font-bold font-heading">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (Vietnamese)</label><input required value={projectForm.titleVi} onChange={e => setProjectForm({...projectForm, titleVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (English)</label><input required value={projectForm.titleEn} onChange={e => setProjectForm({...projectForm, titleEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                </div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description (Vietnamese)</label><textarea required rows={3} value={projectForm.descriptionVi} onChange={e => setProjectForm({...projectForm, descriptionVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description (English)</label><textarea required rows={3} value={projectForm.descriptionEn} onChange={e => setProjectForm({...projectForm, descriptionEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Tags (comma separated)</label><input placeholder="Next.js, Tailwind, Prisma" value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                    <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Live URL</label><input value={projectForm.liveUrl} onChange={e => setProjectForm({...projectForm, liveUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                    <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">GitHub URL</label><input value={projectForm.githubUrl} onChange={e => setProjectForm({...projectForm, githubUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                  </div>
                  <MediaUpload 
                    label="Project Thumbnail" 
                    currentImageUrl={projectForm.imageUrl} 
                    onUploadComplete={(url) => setProjectForm({...projectForm, imageUrl: url})} 
                  />
                </div>
                <div className="flex items-center gap-2 py-2"><input type="checkbox" id="featured" checked={projectForm.featured} onChange={e => setProjectForm({...projectForm, featured: e.target.checked})} className="w-4 h-4 rounded" /><label htmlFor="featured" className="text-sm font-medium">Featured on Homepage</label></div>
                <button disabled={isSubmitting} className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">{isSubmitting ? <Loader2 className="animate-spin" /> : <Folder size={18} />}{editingProject ? 'Update Project' : 'Create Project'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===== BLOG MODAL ===== */}
      <AnimatePresence>
        {isBlogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden relative shadow-2xl my-8">
              <button onClick={() => setIsBlogModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors z-10"><X size={20} /></button>
              <form onSubmit={handleBlogSubmit} className="p-10 space-y-6">
                <h2 className="text-2xl font-bold font-heading">{editingBlog ? 'Edit Blog Post' : 'New Blog Post'}</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Slug (URL)</label><input required placeholder="my-awesome-post" value={blogForm.slug} onChange={e => setBlogForm({...blogForm, slug: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all font-mono text-sm" /></div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (Vietnamese)</label><input required value={blogForm.titleVi} onChange={e => setBlogForm({...blogForm, titleVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                      <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (English)</label><input required value={blogForm.titleEn} onChange={e => setBlogForm({...blogForm, titleEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                    </div>
                  </div>
                  <MediaUpload 
                    label="Blog Featured Image" 
                    currentImageUrl={blogForm.imageUrl} 
                    onUploadComplete={(url) => setBlogForm({...blogForm, imageUrl: url})} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Summary (Vietnamese)</label><textarea required rows={2} value={blogForm.summaryVi} onChange={e => setBlogForm({...blogForm, summaryVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Summary (English)</label><textarea required rows={2} value={blogForm.summaryEn} onChange={e => setBlogForm({...blogForm, summaryEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                </div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Content (Vietnamese)</label><textarea rows={6} value={blogForm.contentVi} onChange={e => setBlogForm({...blogForm, contentVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none font-mono text-sm" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Content (English)</label><textarea rows={6} value={blogForm.contentEn} onChange={e => setBlogForm({...blogForm, contentEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none font-mono text-sm" /></div>
                <div className="flex items-center gap-2 py-2"><input type="checkbox" id="published" checked={blogForm.published} onChange={e => setBlogForm({...blogForm, published: e.target.checked})} className="w-4 h-4 rounded" /><label htmlFor="published" className="text-sm font-medium">Publish immediately</label></div>
                <button disabled={isSubmitting} className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">{isSubmitting ? <Loader2 className="animate-spin" /> : <FileText size={18} />}{editingBlog ? 'Update Post' : 'Create Post'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===== SKILL MODAL ===== */}
      <AnimatePresence>
        {isSkillModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-lg overflow-hidden relative shadow-2xl my-auto">
              <button onClick={() => setIsSkillModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors z-10"><X size={20} /></button>
              <form onSubmit={handleSkillSubmit} className="p-10 space-y-6">
                <h2 className="text-2xl font-bold font-heading">{editingSkill ? 'Edit Skill' : 'Add Skill'}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Name</label><input required placeholder="React" value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Icon (emoji)</label><input placeholder="⚛️" value={skillForm.icon} onChange={e => setSkillForm({...skillForm, icon: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-center text-xl" /></div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Category</label>
                  <select value={skillForm.category} onChange={e => setSkillForm({...skillForm, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-white">
                    <option value="Frontend" className="bg-slate-900">Frontend & UI</option>
                    <option value="Backend" className="bg-slate-900">Backend & Core</option>
                    <option value="DevOps" className="bg-slate-900">DevOps & Tools</option>
                    <option value="Other" className="bg-slate-900">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Proficiency: {skillForm.level}%</label>
                  <input type="range" min="0" max="100" value={skillForm.level} onChange={e => setSkillForm({...skillForm, level: parseInt(e.target.value)})} className="w-full accent-primary" />
                </div>
                <button disabled={isSubmitting} className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">{isSubmitting ? <Loader2 className="animate-spin" /> : <Wrench size={18} />}{editingSkill ? 'Update Skill' : 'Add Skill'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===== EXPERIENCE MODAL ===== */}
      <AnimatePresence>
        {isExpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden relative shadow-2xl my-auto">
              <button onClick={() => setIsExpModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors z-10"><X size={20} /></button>
              <form onSubmit={handleExpSubmit} className="p-10 space-y-6">
                <h2 className="text-2xl font-bold font-heading">{editingExp ? 'Edit Experience' : 'Add Experience'}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (Vietnamese)</label><input required placeholder="Senior Backend Developer" value={expForm.titleVi} onChange={e => setExpForm({...expForm, titleVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (English)</label><input required placeholder="Senior Backend Developer" value={expForm.titleEn} onChange={e => setExpForm({...expForm, titleEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                </div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Company</label><input required placeholder="TechNova Solutions" value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description (Vietnamese)</label><textarea required rows={3} value={expForm.descriptionVi} onChange={e => setExpForm({...expForm, descriptionVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description (English)</label><textarea required rows={3} value={expForm.descriptionEn} onChange={e => setExpForm({...expForm, descriptionEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Start Date</label><input required type="date" value={expForm.startDate} onChange={e => setExpForm({...expForm, startDate: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all [color-scheme:dark]" /></div>
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">End Date (empty = Present)</label><input type="date" value={expForm.endDate} onChange={e => setExpForm({...expForm, endDate: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all [color-scheme:dark]" /></div>
                </div>
                <button disabled={isSubmitting} className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">{isSubmitting ? <Loader2 className="animate-spin" /> : <Briefcase size={18} />}{editingExp ? 'Update Experience' : 'Add Experience'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
