import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const sessions = await prisma.chatSession.findMany({
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50 // pagination limit to prevent OOM
    })
    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Failed to fetch chat logs:', error)
    return NextResponse.json({ error: 'Failed to fetch chat logs' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('sessionId')
    const clearAll = searchParams.get('clearAll') === 'true'

    if (clearAll) {
      // First delete all messages due to FK constraints if not using cascade
      await prisma.chatMessage.deleteMany({})
      await prisma.chatSession.deleteMany({})
      return NextResponse.json({ message: 'All logs cleared' })
    }

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    // Delete messages first
    await prisma.chatMessage.deleteMany({ where: { sessionId } })
    await prisma.chatSession.delete({ where: { id: sessionId } })
    
    return NextResponse.json({ message: 'Session deleted' })
  } catch (error) {
    console.error('Failed to delete chat session:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
