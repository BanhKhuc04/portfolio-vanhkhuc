"use client"

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface MediaUploadProps {
  onUploadComplete: (url: string) => void
  currentImageUrl?: string
  label?: string
}

export function MediaUpload({ onUploadComplete, currentImageUrl, label = "Featured Image" }: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null)

  const handleUpload = async (file: File) => {
    if (!file) return
    
    // Create bucket if not exists is not possible with anon key, 
    // assuming user created 'media' bucket.
    
    setIsUploading(true)
    setError(null)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      // Upload to 'media' bucket
      const { data, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      setPreview(publicUrl)
      onUploadComplete(publicUrl)
    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleUpload(file)
  }, [])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
  }

  return (
    <div className="space-y-4">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
        {label}
      </label>

      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`relative group h-48 rounded-2xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center gap-3 ${
          isDragging ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-white/20 bg-white/5'
        }`}
      >
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div 
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full"
            >
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setPreview(null)
                    onUploadComplete('')
                  }}
                  className="p-2 rounded-full bg-rose-500 text-white hover:scale-110 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center p-6"
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="animate-spin text-primary" size={24} />
                  <span className="text-sm text-slate-400">Uploading...</span>
                </div>
              ) : (
                <>
                  <div className="p-3 rounded-xl bg-white/5 text-slate-400 mb-2 inline-block">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-medium text-slate-300">Click to upload or drag & drop</p>
                  <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WEBP (Max 5MB)</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <input 
          type="file" 
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={onFileChange}
          disabled={isUploading}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-rose-400 text-xs px-2"
          >
            <AlertCircle size={14} /> {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
