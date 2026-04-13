import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { headers } from 'next/headers'

interface Props {
  params: Promise<{ code: string }>
}

export default async function RedirectPage({ params }: Props) {
  const { code } = await params

  const link = await prisma.shortLink.findUnique({
    where: { shortCode: code }
  })

  if (!link) {
    redirect('/')
  }

  // Record analytics (Background Task)
  try {
    const head = await headers()
    const userAgent = head.get('user-agent')
    const xff = head.get('x-forwarded-for')
    
    // Naive analytics tracking
    await prisma.$transaction([
      prisma.linkAnalytics.create({
        data: {
          linkId: link.id,
          userAgent,
          ipHash: xff ? btoa(xff).slice(0, 10) : 'unknown'
        }
      }),
      prisma.shortLink.update({
        where: { id: link.id },
        data: { clicks: { increment: 1 } }
      })
    ])
  } catch (error) {
    console.error('Analytics recording failed:', error)
  }

  redirect(link.originalUrl)
}
