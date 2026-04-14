import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { recordActivity } from '@/lib/utils/activity'
import { revalidatePath } from 'next/cache'

/**
 * Admin API for Projects management
 */

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { titleEn, titleVi, descriptionEn, descriptionVi, githubUrl, liveUrl, tags, featured } = data

    const project = await prisma.project.create({
      data: {
        titleEn,
        titleVi,
        descriptionEn,
        descriptionVi,
        githubUrl,
        liveUrl,
        tags: tags || [],
        featured: featured || false
      }
    })

    await recordActivity('CREATE_PROJECT', project.titleEn, `Created project ID: ${project.id}`)
    revalidatePath('/')
    revalidatePath('/projects')

    return NextResponse.json(project)
  } catch (error) {
    console.error('Project creation failed:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

    const project = await prisma.project.update({
      where: { id },
      data: updateData
    })

    await recordActivity('UPDATE_PROJECT', project.titleEn, `Updated project ID: ${id}`)
    revalidatePath('/')
    revalidatePath('/projects')
    revalidatePath(`/projects/${id}`)

    return NextResponse.json(project)
  } catch (error) {
    console.error('Project update failed:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

    const project = await prisma.project.delete({
      where: { id }
    })

    await recordActivity('DELETE_PROJECT', project.titleEn, `Deleted project ID: ${id}`)
    revalidatePath('/')
    revalidatePath('/projects')

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
