import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { recordActivity } from '@/lib/services/activity'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const seoData = await prisma.sEOMetadata.findMany()
    return NextResponse.json(seoData)
  } catch (error) {
    console.error('Failed to fetch SEO metadata:', error)
    return NextResponse.json({ error: 'Failed to fetch SEO metadata' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, page, titleEn, titleVi, descriptionEn, descriptionVi, keywords, ogImage } = data

    if (!page) return NextResponse.json({ error: 'Page identifier is required' }, { status: 400 })

    const seoRecord = await prisma.sEOMetadata.upsert({
      where: { page },
      update: {
        titleEn,
        titleVi,
        descriptionEn,
        descriptionVi,
        keywords: keywords || [],
        ogImage
      },
      create: {
        page,
        titleEn,
        titleVi,
        descriptionEn,
        descriptionVi,
        keywords: keywords || [],
        ogImage
      }
    })

    await recordActivity('UPDATE_SEO', seoRecord.page, `Updated SEO metadata for page: /${seoRecord.page}`)
    revalidatePath('/', 'layout')

    return NextResponse.json(seoRecord)
  } catch (error) {
    console.error('SEO update failed:', error)
    return NextResponse.json({ error: 'Failed to update SEO metadata' }, { status: 500 })
  }
}
