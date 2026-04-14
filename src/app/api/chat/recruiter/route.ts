import { createGroq } from '@ai-sdk/groq'
import { streamText, convertToModelMessages } from 'ai'
import { getPortfolioContext } from '@/features/chat/context'
import prisma from '@/lib/db/prisma'

export const runtime = 'nodejs'

// Groq Engine Configuration
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

// Basic In-Memory Rate Limiter
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 20
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>()

function isRateLimited(identifier: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || record.expiresAt < now) {
    rateLimitMap.set(identifier, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (record.count >= MAX_REQUESTS) {
    return true
  }

  record.count += 1
  return false
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous'
    const body = await req.json()
    
    // Detect locale from headers or body
    const locale = req.headers.get('x-portfolio-locale') || body.locale || 'en'

    const uiMessages = body.messages ?? []

    // Apply Rate Limiting
    const rateLimitId = `ip_${ip}`
    if (isRateLimited(rateLimitId)) {
      console.warn(`[RATE LIMIT TRIGGERED] - Identifier: ${rateLimitId}`)
      return new Response('Too many requests. Fast as Groq is, please wait a minute.', { status: 429 })
    }

    const context = await getPortfolioContext(locale)
    const sessionId = body.sessionId || 'anonymous'

    // Fetch previous messages for this session
    const history = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: 20,
    })

    const historyMessages = history.map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content
    }))

    const lastMessage = uiMessages[uiMessages.length - 1]
    let lastUserText = ''
    if (lastMessage?.role === 'user') {
      if (lastMessage.parts) {
        lastUserText = lastMessage.parts
          .filter((p: { type: string }) => p.type === 'text')
          .map((p: { text?: string }) => p.text ?? '')
          .join('')
      } else if (lastMessage.content) {
        lastUserText = lastMessage.content
      }
    }

    const currentModelMessages = await convertToModelMessages(uiMessages)
    const combinedMessages = [...historyMessages, ...currentModelMessages]

    // Log user message to DB
    if (lastUserText) {
      prisma.chatSession.upsert({
        where: { id: sessionId },
        update: {},
        create: { id: sessionId }
      }).then(() => {
        return prisma.chatMessage.create({
          data: {
            sessionId,
            role: 'user',
            content: lastUserText
          }
        })
      }).catch((err: unknown) => console.error('Failed to log message:', err))
    }

    // Stream AI Response via Groq
    const modelId = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
    const result = streamText({
      model: groq(modelId),
      system: context,
      messages: combinedMessages,
      temperature: 0.6,
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

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat error:', error)
    return new Response('Error connecting to Groq AI service', { status: 500 })
  }
}
