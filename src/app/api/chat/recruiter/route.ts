import { google } from '@ai-sdk/google'
import { streamText } from 'ai'
import { getPortfolioContext } from '@/lib/ai/context'
import prisma from '@/lib/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { messages, sessionId: clientSessionId } = await req.json()
    const context = await getPortfolioContext()
    const lastMessage = messages[messages.length - 1]

    // 1. Get or Create Session
    let sessionId = clientSessionId
    if (!sessionId) {
      const session = await prisma.chatSession.create({ data: {} })
      sessionId = session.id
    }

    // 2. Log User Message
    if (lastMessage && lastMessage.role === 'user') {
      await prisma.chatMessage.create({
        data: {
          sessionId,
          role: 'user',
          content: lastMessage.content
        }
      })
    }

    // 3. Stream AI Response and Log on finish
    const result = streamText({
      model: google('gemini-1.5-flash'),
      system: context,
      messages,
      temperature: 0.7,
      onFinish: async ({ text }) => {
        try {
          await prisma.chatMessage.create({
            data: {
              sessionId,
              role: 'assistant',
              content: text
            }
          })
        } catch (dbErr) {
          console.error('Failed to log AI response:', dbErr)
        }
      }
    })

    return (result as any).toDataStreamResponse({
      headers: { 'X-Chat-Session-Id': sessionId }
    })
  } catch (error) {
    console.error('Chat error:', error)
    return new Response('Error connecting to AI service', { status: 500 })
  }
}
