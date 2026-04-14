"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Edit2, Trash2, X, Briefcase, Plus } from 'lucide-react'
import type { Experience } from '@/types/admin'

interface Props {
  experiences: Experience[]
  loading: boolean
  fetchAll: () => void
  showSuccess: (msg: string) => void
}

export function ExperienceTab({ experiences, loading, fetchAll, showSuccess }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExp, setEditingExp] = useState<Experience | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [form, setForm] = useState({
    titleVi: '', titleEn: '', company: '', descriptionVi: '', descriptionEn: '', startDate: '', endDate: ''
  })

  function openCreate() {
    setEditingExp(null)
    setForm({ titleVi: '', titleEn: '', company: '', descriptionVi: '', descriptionEn: '', startDate: '', endDate: '' })
    setIsModalOpen(true)
  }

  function openEdit(exp: Experience) {
    setEditingExp(exp)
    setForm({
      titleVi: exp.titleVi, titleEn: exp.titleEn, company: exp.company,
      descriptionVi: exp.descriptionVi, descriptionEn: exp.descriptionEn,
      startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
      endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : ''
    })
    setIsModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = { ...form, endDate: form.endDate || null, ...(editingExp ? { id: editingExp.id } : {}) }
      const res = await fetch('/api/admin/experience', { 
        method: editingExp ? 'PUT' : 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      })
      if (res.ok) { 
        showSuccess(editingExp ? 'Experience updated!' : 'Experience added!')
        setIsModalOpen(false)
        fetchAll() 
      }
    } catch (err) { console.error(err) } 
    finally { setIsSubmitting(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xóa experience này?')) return
    try { 
      await fetch(`/api/admin/experience?id=${id}`, { method: 'DELETE' })
      showSuccess('Experience deleted')
      fetchAll() 
    } catch (err) { console.error(err) }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end pr-4">
        <button onClick={openCreate} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"><Plus size={18} /> Add Experience</button>
      </div>

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
                  <button onClick={() => openEdit(exp)} className="p-2 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(exp.id)} className="p-2 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden relative shadow-2xl my-auto">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors z-10"><X size={20} /></button>
              <form onSubmit={handleSubmit} className="p-10 space-y-6">
                <h2 className="text-2xl font-bold font-heading">{editingExp ? 'Edit Experience' : 'Add Experience'}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (Vietnamese)</label><input required placeholder="Senior Backend Developer" value={form.titleVi} onChange={e => setForm({...form, titleVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title (English)</label><input required placeholder="Senior Backend Developer" value={form.titleEn} onChange={e => setForm({...form, titleEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                </div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Company</label><input required placeholder="TechNova Solutions" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description (Vietnamese)</label><textarea required rows={3} value={form.descriptionVi} onChange={e => setForm({...form, descriptionVi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description (English)</label><textarea required rows={3} value={form.descriptionEn} onChange={e => setForm({...form, descriptionEn: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Start Date</label><input required type="date" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all [color-scheme:dark]" /></div>
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">End Date (empty = Present)</label><input type="date" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all [color-scheme:dark]" /></div>
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
