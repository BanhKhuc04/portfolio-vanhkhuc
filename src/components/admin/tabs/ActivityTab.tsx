"use client"
import React from 'react'
import { Clock } from 'lucide-react'
import type { ActivityLog } from '@/types'

interface Props {
  activityLogs: ActivityLog[]
}

export function ActivityTab({ activityLogs }: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest bg-white/[0.02]">
              <th className="px-8 py-6">Timestamp</th><th className="px-8 py-6">Action</th><th className="px-8 py-6">Target</th><th className="px-8 py-6">Details</th>
            </tr>
          </thead>
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
  )
}
