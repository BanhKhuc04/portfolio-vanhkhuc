import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * Admin API for Experience / Timeline management
 */

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { startDate: 'desc' }
    })
    return NextResponse.json(experiences)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { titleEn, titleVi, company, descriptionEn, descriptionVi, startDate, endDate } = data

    const experience = await prisma.experience.create({
      data: {
        titleEn,
        titleVi,
        company,
        descriptionEn,
        descriptionVi,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null
      }
    })

    return NextResponse.json(experience)
  } catch (error) {
    console.error('Experience creation failed:', error)
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, startDate, endDate, ...rest } = data

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

    const updateData: any = { ...rest }
    if (startDate) updateData.startDate = new Date(startDate)
    if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : null

    const experience = await prisma.experience.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(experience)
  } catch (error) {
    console.error('Experience update failed:', error)
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

    await prisma.experience.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
