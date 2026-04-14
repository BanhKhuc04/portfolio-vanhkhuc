import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json({ messages: [] })
    }

    const messages = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: 50,
    })

    // Convert to UIMessage format for compatibility with useChat initialMessages
    const uiMessages = messages.map(m => ({
      id: m.id,
      role: m.role as 'user' | 'assistant',
      content: m.content,
      createdAt: m.createdAt,
    }))

    return NextResponse.json({ messages: uiMessages })
  } catch (error) {
    console.error('Error fetching chat history:', error)
    return NextResponse.json({ messages: [] }, { status: 500 })
  }
}
