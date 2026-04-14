import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

export async function GET() {
  try {
    const [totalSessions, totalMessages, recentMessages] = await Promise.all([
      prisma.chatSession.count(),
      prisma.chatMessage.count(),
      prisma.chatMessage.findMany({
        where: { role: 'user' },
        orderBy: { createdAt: 'desc' },
        take: 20
      })
    ])

    // Simple topic extraction from recent messages (naive)
    const keywords = ['next.js', 'react', 'node', 'experience', 'projects', 'github', 'skills', 'backend', 'frontend']
    const topicStats: Record<string, number> = {}
    
    recentMessages.forEach(msg => {
      const content = msg.content.toLowerCase()
      keywords.forEach(kw => {
        if (content.includes(kw)) {
          topicStats[kw] = (topicStats[kw] || 0) + 1
        }
      })
    })

    return NextResponse.json({
      totalSessions,
      totalMessages,
      avgMessagesPerSession: totalSessions > 0 ? (totalMessages / totalSessions).toFixed(1) : 0,
      topicStats,
      recentUserQueries: recentMessages.map(m => m.content).slice(0, 5)
    })
  } catch (error) {
    console.error('Failed to fetch chat analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
