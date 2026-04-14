import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { recordActivity } from '@/lib/services/activity'

export async function GET() {
  try {
    const prompt = await prisma.aIPrompt.findFirst()
    return NextResponse.json({ content: prompt?.content || '' })
  } catch (error) {
    console.error('Failed to fetch prompt:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  try {
    const { content } = await req.json()
    
    // UPSERT logic: only one system prompt should exist
    const prompt = await prisma.aIPrompt.findFirst()
    
    if (prompt) {
      await prisma.aIPrompt.update({
        where: { id: prompt.id },
        data: { content }
      })
    } else {
      await prisma.aIPrompt.create({
        data: { content }
      })
    }

    await recordActivity('UPDATE_AI_PROMPT', 'System Prompt', `Updated AI Recruiter system prompt template`)
    
    // Recalculate context cache if necessary
    revalidatePath('/')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to save prompt:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
