import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { recordActivity } from '@/lib/utils/activity'
import { revalidatePath } from 'next/cache'

/**
 * Admin API for Skills management
 */

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }]
    })
    return NextResponse.json(skills)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, icon, category, level } = data

    const skill = await prisma.skill.create({
      data: {
        name,
        icon: icon || null,
        category,
        level: level || 0
      }
    })

    await recordActivity('CREATE_SKILL', skill.name, `Added skill: ${skill.name} (${skill.category})`)
    revalidatePath('/')

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Skill creation failed:', error)
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

    const skill = await prisma.skill.update({
      where: { id },
      data: updateData
    })

    await recordActivity('UPDATE_SKILL', skill.name, `Updated skill: ${skill.name}`)
    revalidatePath('/')

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Skill update failed:', error)
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

    const skill = await prisma.skill.delete({ where: { id } })

    await recordActivity('DELETE_SKILL', skill.name, `Deleted skill: ${skill.name}`)
    revalidatePath('/')

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
  }
}
