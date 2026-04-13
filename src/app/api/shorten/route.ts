import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { nanoid } from 'nanoid'

export async function POST(req: Request) {
  try {
    const { originalUrl, customCode } = await req.json()

    if (!originalUrl) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const shortCode = customCode || nanoid(6)

    // Check if code exists
    const existing = await prisma.shortLink.findUnique({
      where: { shortCode }
    })

    if (existing) {
      return NextResponse.json({ error: 'Short code already in use' }, { status: 400 })
    }

    const link = await prisma.shortLink.create({
      data: {
        originalUrl,
        shortCode
      }
    })

    return NextResponse.json(link)
  } catch (error) {
    console.error('Shorten error:', error)
    return NextResponse.json({ error: 'Failed to shorten URL' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const links = await prisma.shortLink.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    })
    return NextResponse.json(links)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 })
  }
}
