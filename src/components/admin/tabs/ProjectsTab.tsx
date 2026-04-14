"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Loader2, Edit2, Trash2, X, Folder, Plus } from 'lucide-react'
import { MediaUpload } from '@/components/admin/MediaUpload'
import type { Project } from '@/types'

interface Props {
  projects: Project[]
  loading: boolean
  fetchAll: () => void
  showSuccess: (msg: string) => void
}

export function ProjectsTab({ projects, loading, fetchAll, showSuccess }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [form, setForm] = useState({
    titleVi: '', titleEn: '', descriptionVi: '', descriptionEn: '',
    tags: '', liveUrl: '', githubUrl: '', featured: false, imageUrl: ''
  })

  const filteredProjects = projects.filter(p => 
    p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.titleVi.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function openCreate() {
    setEditingProject(null)
    setForm({ titleVi: '', titleEn: '', descriptionVi: '', descriptionEn: '', tags: '', liveUrl: '', githubUrl: '', featured: false, imageUrl: '' })
    setIsModalOpen(true)
  }

  function openEdit(p: Project) {
    setEditingProject(p)
    setForm({ 
      titleVi: p.titleVi, titleEn: p.titleEn, descriptionVi: p.descriptionVi, descriptionEn: p.descriptionEn, 
      tags: p.tags.join(', '), liveUrl: p.liveUrl || '', githubUrl: p.githubUrl || '', featured: p.featured, imageUrl: p.imageUrl || ''
    })
    setIsModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = { 
        ...form, 
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), 
        ...(editingProject ? { id: editingProject.id } : {}) 
      }
      const res = await fetch('/api/admin/projects', { 
        method: editingProject ? 'PUT' : 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      })
      if (res.ok) { 
        showSuccess(editingProject ? 'Project updated!' : 'Project created!')
        setIsModalOpen(false)
        fetchAll() 
      }
    } catch (err) { console.error(err) } 
    finally { setIsSubmitting(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xóa project này?')) return
    try { 
      await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' })
      showSuccess('Project deleted')
      fetchAll() 
    } catch (err) { console.error(err) }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={openCreate} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"><Plus size={18} /> New Project</button>
      </div>

      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
        <Search size={18} className="text-slate-500" />
        <input placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none flex-1 text-sm" />
      </div>
      
      <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest bg-white/[0.02]">
              <th className="px-8 py-6">Project</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6">Tags</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-500"><Loader2 className="animate-spin mx-auto mb-2" /> Loading...</td></tr>
            : filteredProjects.length === 0 ? <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-500 italic">{searchQuery ? 'No matching projects' : 'No projects yet. Create your first one!'}</td></tr>
            : filteredProjects.map((project) => (
              <tr key={project.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-bold text-xs text-primary">{project.titleEn.substring(0, 2).toUpperCase()}</div>
                    <div><p className="font-bold">{project.titleVi}</p><p className="text-xs text-slate-500">{project.titleEn}</p></div>
                  </div>
                </td>
                <td className="px-8 py-6"><span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${project.featured ? "bg-primary/20 text-primary border border-primary/20" : "bg-slate-500/10 text-slate-500"}`}>{project.featured ? "Featured" : "Regular"}</span></td>
                <td className="px-8 py-6"><div className="flex gap-1 flex-wrap">{project.tags.slice(0, 3).map(tag => <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-slate-400">{tag}</span>)}</div></td>
                <td className="px-8 py-6"><div className="flex justify-end gap-2">
                  <button onClick={() => openEdit(project)} className="p-2 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(project.id)} className="p-2 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden relative shadow-2xl my-auto">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors z-10"><X size={20} /></button>
              <form onSubmit={handleSubmit} className="p-10 space-y-6">
                <h2 className="text-2xl font-bold font-heading">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (Vietnamese)</label><input required value={form.titleVi} onChange={e => setForm({...form, titleVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (English)</label><input required value={form.titleEn} onChange={e => setForm({...form, titleEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                </div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description (Vietnamese)</label><textarea required rows={3} value={form.descriptionVi} onChange={e => setForm({...form, descriptionVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description (English)</label><textarea required rows={3} value={form.descriptionEn} onChange={e => setForm({...form, descriptionEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Tags (comma separated)</label><input placeholder="Next.js, Tailwind, Prisma" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                    <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Live URL</label><input value={form.liveUrl} onChange={e => setForm({...form, liveUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                    <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">GitHub URL</label><input value={form.githubUrl} onChange={e => setForm({...form, githubUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                  </div>
                  <MediaUpload label="Project Thumbnail" currentImageUrl={form.imageUrl} onUploadComplete={(url) => setForm({...form, imageUrl: url})} />
                </div>
                <div className="flex items-center gap-2 py-2"><input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="w-4 h-4 rounded" /><label htmlFor="featured" className="text-sm font-medium">Featured on Homepage</label></div>
                <button disabled={isSubmitting} className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">{isSubmitting ? <Loader2 className="animate-spin" /> : <Folder size={18} />}{editingProject ? 'Update Project' : 'Create Project'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
