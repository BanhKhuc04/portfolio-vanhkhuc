import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { recordActivity } from '@/lib/utils/activity'
import { revalidatePath } from 'next/cache'

/**
 * Admin API for Experience management
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

    const exp = await prisma.experience.create({
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

    await recordActivity('CREATE_EXPERIENCE', exp.company, `Added experience: ${exp.titleEn}`)
    revalidatePath('/')

    return NextResponse.json(exp)
  } catch (error) {
    console.error('Experience creation failed:', error)
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, titleEn, titleVi, company, descriptionEn, descriptionVi, startDate, endDate } = data

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

    const exp = await prisma.experience.update({
      where: { id },
      data: {
        ...(titleEn && { titleEn }),
        ...(titleVi && { titleVi }),
        ...(company && { company }),
        ...(descriptionEn && { descriptionEn }),
        ...(descriptionVi && { descriptionVi }),
        ...(startDate && { startDate: new Date(startDate) }),
        endDate: endDate ? new Date(endDate) : null
      }
    })

    await recordActivity('UPDATE_EXPERIENCE', exp.company, `Updated experience: ${exp.titleEn}`)
    revalidatePath('/')

    return NextResponse.json(exp)
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

    const exp = await prisma.experience.delete({ where: { id } })

    await recordActivity('DELETE_EXPERIENCE', exp.company, `Deleted experience ID: ${id}`)
    revalidatePath('/')

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
