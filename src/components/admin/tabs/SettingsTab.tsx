"use client"
import React from 'react'
import { Bot, CheckCircle2, Loader2, Plus, LogOut, ArrowUpRight } from 'lucide-react'

interface Props {
  aiPrompt: string
  setAiPrompt: (p: string) => void
  themeForm: { primaryColor: string; radius: string }
  setThemeForm: (t: { primaryColor: string; radius: string }) => void
  isSubmitting: boolean
  onPromptSubmit: (e: React.FormEvent) => void
  onThemeUpdate: (e: React.FormEvent) => void
  onSync: () => void
  onExport: () => void
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void
  onLogout: () => void
}

export function SettingsTab({
  aiPrompt, setAiPrompt, themeForm, setThemeForm,
  isSubmitting, onPromptSubmit, onThemeUpdate,
  onSync, onExport, onImport, onLogout
}: Props) {
  return (
    <div className="space-y-6 pb-20">
      {/* AI Settings Section */}
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Bot size={20} className="text-primary" /> AI Recruiter Settings</h3>
        <form onSubmit={onPromptSubmit} className="space-y-6">
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
          <button onClick={onSync} disabled={isSubmitting} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all text-left flex flex-col gap-3 group">
            <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform"><CheckCircle2 size={24} /></div>
            <div><p className="font-bold text-sm">Sync Initial Data</p><p className="text-xs text-slate-500">Restore default demo data</p></div>
          </button>
          
          <button onClick={onExport} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all text-left flex flex-col gap-3 group">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 w-fit group-hover:scale-110 transition-transform"><ArrowUpRight size={24} /></div>
            <div><p className="font-bold text-sm">Export Data</p><p className="text-xs text-slate-500">Download JSON backup</p></div>
          </button>

          <label className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all text-left flex flex-col gap-3 group cursor-pointer">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 w-fit group-hover:scale-110 transition-transform"><Plus size={24} /></div>
            <div><p className="font-bold text-sm">Import Data</p><p className="text-xs text-slate-500">Restore from JSON file</p></div>
            <input type="file" accept=".json" onChange={onImport} className="hidden" />
          </label>

          <button onClick={onLogout} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-rose-500/30 transition-all text-left flex flex-col gap-3 group">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 w-fit group-hover:scale-110 transition-transform"><LogOut size={24} /></div>
            <div><p className="font-bold text-sm">Logout</p><p className="text-xs text-slate-500">End admin session</p></div>
          </button>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">🎨 Theme Configuration</h3>
        <form onSubmit={onThemeUpdate} className="space-y-6">
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
  )
}
