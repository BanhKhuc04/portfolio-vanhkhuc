"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Loader2, Edit2, Trash2, X, FileText, Plus } from 'lucide-react'
import { MediaUpload } from '@/components/admin/MediaUpload'
import type { BlogPost } from '@/types'

interface Props {
  blogPosts: BlogPost[]
  loading: boolean
  fetchAll: () => void
  showSuccess: (msg: string) => void
}

export function BlogTab({ blogPosts, loading, fetchAll, showSuccess }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [form, setForm] = useState({
    slug: '', titleVi: '', titleEn: '', summaryVi: '', summaryEn: '', contentVi: '', contentEn: '', published: false, imageUrl: ''
  })

  const filteredBlogs = blogPosts.filter(b => 
    b.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.titleVi.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function openCreate() {
    setEditingBlog(null)
    setForm({ slug: '', titleVi: '', titleEn: '', summaryVi: '', summaryEn: '', contentVi: '', contentEn: '', published: false, imageUrl: '' })
    setIsModalOpen(true)
  }

  function openEdit(b: BlogPost) {
    setEditingBlog(b)
    setForm({ 
      slug: b.slug, titleVi: b.titleVi, titleEn: b.titleEn, summaryVi: b.summaryVi, summaryEn: b.summaryEn, 
      contentVi: b.contentVi, contentEn: b.contentEn, published: b.published, imageUrl: b.imageUrl || ''
    })
    setIsModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = { ...form, ...(editingBlog ? { id: editingBlog.id } : {}) }
      const res = await fetch('/api/admin/blog', { 
        method: editingBlog ? 'PUT' : 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      })
      if (res.ok) { 
        showSuccess(editingBlog ? 'Blog updated!' : 'Blog created!')
        setIsModalOpen(false)
        fetchAll() 
      }
    } catch (err) { console.error(err) } 
    finally { setIsSubmitting(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xóa bài viết này?')) return
    try { 
      await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' })
      showSuccess('Blog deleted')
      fetchAll() 
    } catch (err) { console.error(err) }
  }

  async function togglePublish(b: BlogPost) {
    try {
      await fetch('/api/admin/blog', { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ id: b.id, published: !b.published }) 
      })
      showSuccess(b.published ? 'Unpublished' : 'Published!')
      fetchAll()
    } catch (err) { console.error(err) }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={openCreate} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"><Plus size={18} /> New Post</button>
      </div>

      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
        <Search size={18} className="text-slate-500" />
        <input placeholder="Search blog posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none flex-1 text-sm" />
      </div>

      <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest bg-white/[0.02]">
              <th className="px-8 py-6">Post</th>
              <th className="px-8 py-6">Slug</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-500"><Loader2 className="animate-spin mx-auto mb-2" /> Loading...</td></tr>
            : filteredBlogs.length === 0 ? <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-500 italic">{searchQuery ? 'No matching posts' : 'No blog posts yet. Write your first one!'}</td></tr>
            : filteredBlogs.map((post) => (
              <tr key={post.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center font-bold text-xs text-emerald-400"><FileText size={18} /></div>
                    <div><p className="font-bold">{post.titleVi}</p><p className="text-xs text-slate-500">{post.titleEn}</p></div>
                  </div>
                </td>
                <td className="px-8 py-6 text-slate-400 text-xs font-mono">/{post.slug}</td>
                <td className="px-8 py-6">
                  <button onClick={() => togglePublish(post)} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all hover:scale-105 ${post.published ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>{post.published ? "Published" : "Draft"}</button>
                </td>
                <td className="px-8 py-6"><div className="flex justify-end gap-2">
                  <button onClick={() => openEdit(post)} className="p-2 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden relative shadow-2xl my-8">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors z-10"><X size={20} /></button>
              <form onSubmit={handleSubmit} className="p-10 space-y-6">
                <h2 className="text-2xl font-bold font-heading">{editingBlog ? 'Edit Blog Post' : 'New Blog Post'}</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Slug (URL)</label><input required placeholder="my-awesome-post" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all font-mono text-sm" /></div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (Vietnamese)</label><input required value={form.titleVi} onChange={e => setForm({...form, titleVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                      <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (English)</label><input required value={form.titleEn} onChange={e => setForm({...form, titleEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                    </div>
                  </div>
                  <MediaUpload label="Blog Featured Image" currentImageUrl={form.imageUrl} onUploadComplete={(url) => setForm({...form, imageUrl: url})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Summary (Vietnamese)</label><textarea required rows={2} value={form.summaryVi} onChange={e => setForm({...form, summaryVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Summary (English)</label><textarea required rows={2} value={form.summaryEn} onChange={e => setForm({...form, summaryEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                </div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Content (Vietnamese)</label><textarea rows={6} value={form.contentVi} onChange={e => setForm({...form, contentVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none font-mono text-sm" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Content (English)</label><textarea rows={6} value={form.contentEn} onChange={e => setForm({...form, contentEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none font-mono text-sm" /></div>
                <div className="flex items-center gap-2 py-2"><input type="checkbox" id="published" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="w-4 h-4 rounded" /><label htmlFor="published" className="text-sm font-medium">Publish immediately</label></div>
                <button disabled={isSubmitting} className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">{isSubmitting ? <Loader2 className="animate-spin" /> : <FileText size={18} />}{editingBlog ? 'Update Post' : 'Create Post'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
