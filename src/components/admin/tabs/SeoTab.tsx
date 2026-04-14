"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Edit2, X, Search, Plus } from 'lucide-react'
import { MediaUpload } from '@/components/admin/MediaUpload'
import type { SEOMetadata } from '@/types'

interface Props {
  seoRecords: SEOMetadata[]
  loading: boolean
  fetchAll: () => void
  showSuccess: (msg: string) => void
}

export function SeoTab({ seoRecords, loading, fetchAll, showSuccess }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSeo, setEditingSeo] = useState<SEOMetadata | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [form, setForm] = useState({
    page: '', titleEn: '', titleVi: '', descriptionEn: '', descriptionVi: '', keywords: '', ogImage: ''
  })

  function openCreate() {
    setEditingSeo(null)
    setForm({ page: '', titleEn: '', titleVi: '', descriptionEn: '', descriptionVi: '', keywords: '', ogImage: '' })
    setIsModalOpen(true)
  }

  function openEdit(s: SEOMetadata) {
    setEditingSeo(s)
    setForm({
      page: s.page, titleEn: s.titleEn, titleVi: s.titleVi,
      descriptionEn: s.descriptionEn, descriptionVi: s.descriptionVi,
      keywords: s.keywords.join(', '), ogImage: s.ogImage || ''
    })
    setIsModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = { ...form, keywords: form.keywords.split(',').map(k => k.trim()).filter(Boolean) }
      const res = await fetch('/api/admin/seo', { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      })
      if (res.ok) { 
        showSuccess('Cập nhật SEO thành công!')
        setIsModalOpen(false)
        fetchAll() 
      }
    } catch (err) { console.error(err) } 
    finally { setIsSubmitting(false) }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end pr-4">
        <button onClick={openCreate} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"><Plus size={18} /> New Page SEO</button>
      </div>

      <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest bg-white/[0.02]">
              <th className="px-8 py-6">Page</th><th className="px-8 py-6">SEO Title (EN)</th><th className="px-8 py-6">Keywords</th><th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-500"><Loader2 className="animate-spin mx-auto mb-2" /> Loading...</td></tr>
            : seoRecords.length === 0 ? <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-500 italic">No SEO metadata yet. Create one!</td></tr>
            : seoRecords.map((seo) => (
              <tr key={seo.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center font-bold text-xs text-orange-400">/{seo.page.substring(0,2)}</div>
                    <div><p className="font-bold">/{seo.page}</p><p className="text-xs text-slate-500">ID: {seo.id.substring(0,8)}</p></div>
                  </div>
                </td>
                <td className="px-8 py-6"><p className="text-sm line-clamp-1">{seo.titleEn}</p></td>
                <td className="px-8 py-6"><div className="flex gap-1 flex-wrap">{seo.keywords.slice(0,3).map(k => <span key={k} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-slate-400">{k}</span>)}</div></td>
                <td className="px-8 py-6 text-right"><button onClick={() => openEdit(seo)} className="p-2 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Edit2 size={16} /></button></td>
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
                <h2 className="text-2xl font-bold font-heading">{editingSeo ? 'Edit Page SEO' : 'New Page SEO'}</h2>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Page Identifier (e.g. 'home', 'projects')</label><input required disabled={!!editingSeo} value={form.page} onChange={e => setForm({...form, page: e.target.value.toLowerCase()})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all font-mono" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (Vietnamese)</label><input required value={form.titleVi} onChange={e => setForm({...form, titleVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                    <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (English)</label><input required value={form.titleEn} onChange={e => setForm({...form, titleEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                  </div>
                  <MediaUpload label="OG Image (1200x630)" currentImageUrl={form.ogImage} onUploadComplete={(url) => setForm({...form, ogImage: url})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description (Vietnamese)</label><textarea required rows={3} value={form.descriptionVi} onChange={e => setForm({...form, descriptionVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description (English)</label><textarea required rows={3} value={form.descriptionEn} onChange={e => setForm({...form, descriptionEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                </div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Keywords (comma separated)</label><input placeholder="portfolio, nextjs, systems engineer" value={form.keywords} onChange={e => setForm({...form, keywords: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                <button disabled={isSubmitting} className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">{isSubmitting ? <Loader2 className="animate-spin" /> : <Search size={18} />}{editingSeo ? 'Update SEO' : 'Create SEO'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
