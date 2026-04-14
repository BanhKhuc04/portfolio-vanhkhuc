"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Edit2, Trash2, X, Wrench, Plus } from 'lucide-react'
import type { Skill } from '@/types/admin'

interface Props {
  skills: Skill[]
  loading: boolean
  fetchAll: () => void
  showSuccess: (msg: string) => void
}

export function SkillsTab({ skills, loading, fetchAll, showSuccess }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [form, setForm] = useState({ name: '', icon: '', category: 'Frontend', level: 80 })

  const skillsByCategory = skills.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {} as Record<string, Skill[]>)

  function openCreate() {
    setEditingSkill(null)
    setForm({ name: '', icon: '', category: 'Frontend', level: 80 })
    setIsModalOpen(true)
  }

  function openEdit(s: Skill) {
    setEditingSkill(s)
    setForm({ name: s.name, icon: s.icon || '', category: s.category, level: s.level })
    setIsModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = { ...form, level: Number(form.level), ...(editingSkill ? { id: editingSkill.id } : {}) }
      const res = await fetch('/api/admin/skills', { 
        method: editingSkill ? 'PUT' : 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      })
      if (res.ok) { 
        showSuccess(editingSkill ? 'Skill updated!' : 'Skill added!')
        setIsModalOpen(false)
        fetchAll() 
      }
    } catch (err) { console.error(err) } 
    finally { setIsSubmitting(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xóa skill này?')) return
    try { 
      await fetch(`/api/admin/skills?id=${id}`, { method: 'DELETE' })
      showSuccess('Skill deleted')
      fetchAll() 
    } catch (err) { console.error(err) }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end pr-4">
        <button onClick={openCreate} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"><Plus size={18} /> Add Skill</button>
      </div>

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
                      <button onClick={() => openEdit(skill)} className="p-1.5 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(skill.id)} className="p-1.5 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"><Trash2 size={14} /></button>
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

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-lg overflow-hidden relative shadow-2xl my-auto">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors z-10"><X size={20} /></button>
              <form onSubmit={handleSubmit} className="p-10 space-y-6">
                <h2 className="text-2xl font-bold font-heading">{editingSkill ? 'Edit Skill' : 'Add Skill'}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Name</label><input required placeholder="React" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" /></div>
                  <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Icon (emoji)</label><input placeholder="⚛️" value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-center text-xl" /></div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-white">
                    <option value="Frontend" className="bg-slate-900">Frontend & UI</option>
                    <option value="Backend" className="bg-slate-900">Backend & Core</option>
                    <option value="DevOps" className="bg-slate-900">DevOps & Tools</option>
                    <option value="Other" className="bg-slate-900">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Proficiency: {form.level}%</label>
                  <input type="range" min="0" max="100" value={form.level} onChange={e => setForm({...form, level: parseInt(e.target.value)})} className="w-full accent-primary" />
                </div>
                <button disabled={isSubmitting} className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">{isSubmitting ? <Loader2 className="animate-spin" /> : <Wrench size={18} />}{editingSkill ? 'Update Skill' : 'Add Skill'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
