'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link2, Copy, Check, BarChart3, Rocket, Globe, Zap } from 'lucide-react'

export default function SaaSPage() {
  const [url, setUrl] = useState('')
  const [customCode, setCustomCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [shortLink, setShortLink] = useState<{ shortCode: string; originalUrl: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [links, setLinks] = useState<any[]>([])

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/shorten')
      const data = await res.json()
      if (Array.isArray(data)) setLinks(data)
    } catch (e) {
      console.error(e)
    }
  }

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        body: JSON.stringify({ originalUrl: url, customCode })
      })
      const data = await res.json()
      if (data.shortCode) {
        setShortLink(data)
        setUrl('')
        setCustomCode('')
        fetchLinks()
      } else {
        alert(data.error || 'Something went wrong')
      }
    } catch (e) {
      alert('Failed to connect to API')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!shortLink) return
    const fullUrl = `${window.location.origin}/${shortLink.shortCode}`
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-purple-500/10 to-transparent blur-3xl opacity-50" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm mb-8"
          >
            <Zap className="w-4 h-4 text-purple-400" />
            <span>SaaS Demo Ecosystem by vanhkhuc.dev</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter"
          >
            V-SHORT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">PRO</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Premium URL shortening with real-time analytics. Built to demonstrate fullstack architecture, dynamic routing, and high-performance scaling.
          </motion.p>

          {/* Shorten Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <form onSubmit={handleShorten} className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-grow">
                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="url" 
                  required
                  placeholder="Paste your long URL here..."
                  className="w-full bg-transparent border-none py-4 px-12 outline-none focus:ring-0 text-lg"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <input 
                type="text"
                placeholder="Custom alias (optional)"
                className="bg-white/5 border-none py-4 px-6 outline-none focus:ring-0 text-gray-300 w-full md:w-48"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? 'Shortening...' : (
                  <>
                    Shorten <Rocket className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Result Card */}
          {shortLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg mx-auto mt-8 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-left"
            >
              <p className="text-sm text-purple-300 mb-2">Success! Your link is ready:</p>
              <div className="flex items-center justify-between bg-black/50 p-3 rounded-lg border border-white/10">
                <span className="font-mono text-lg">
                  {window.location.origin}/{shortLink.shortCode}
                </span>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Analytics Section Preview */}
      <section className="container mx-auto px-6 py-20 border-t border-white/10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Recent Links</h2>
            <p className="text-gray-400">Manage your shortened URLs and track performance in real-time.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <p className="text-xs text-gray-500 uppercase font-bold">Total Clicks</p>
              <p className="text-2xl font-bold">{links.reduce((acc, curr) => acc + curr.clicks, 0)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {links.map((link) => (
            <div key={link.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-lg">/{link.shortCode}</span>
                  <span className="text-xs text-gray-500 truncate max-w-[200px] md:max-w-sm">→ {link.originalUrl}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> {link.clicks} clicks</span>
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> Global Tracking</span>
                </div>
              </div>
              <button className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors font-bold">
                View Details
              </button>
            </div>
          ))}

          {links.length === 0 && (
            <div className="text-center py-20 text-gray-600">
              No links shortened yet. Start above.
            </div>
          )}
        </div>
      </section>

      {/* Product Features */}
      <section className="container mx-auto px-6 py-20 bg-white/5 rounded-3xl mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 text-purple-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Granular Analytics</h3>
            <p className="text-gray-400 text-sm">Track user agents, timestamps, and referral sources for every single click.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 text-pink-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Edge Speed</h3>
            <p className="text-gray-400 text-sm">Lightning fast redirections powered by optimized dynamic server components.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 text-blue-400">
              <Link2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Custom Aliases</h3>
            <p className="text-gray-400 text-sm">Choose your own short URLs to build brand trust and improve CTR.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
