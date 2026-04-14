import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

/**
 * FULL BACKUP API — Export/Import entire portfolio data
 */

export async function GET() {
  try {
    const [projects, blogs, skills, experiences, seo, prompts] = await Promise.all([
      prisma.project.findMany(),
      prisma.blogPost.findMany(),
      prisma.skill.findMany(),
      prisma.experience.findMany(),
      prisma.sEOMetadata.findMany(),
      prisma.aIPrompt.findMany()
    ])

    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      data: {
        projects,
        blogs,
        skills,
        experiences,
        seo,
        prompts
      }
    }

    return NextResponse.json(backupData)
  } catch (error) {
    console.error('Backup export failed:', error)
    return NextResponse.json({ error: 'Failed to export data' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const backup = await req.json()
    const { data } = backup

    if (!data) throw new Error('Invalid backup format')

    // TRANSACTIONAL RESTORE: Wipe and replace
    await prisma.$transaction([
      prisma.project.deleteMany(),
      prisma.blogPost.deleteMany(),
      prisma.skill.deleteMany(),
      prisma.experience.deleteMany(),
      prisma.sEOMetadata.deleteMany(),
      prisma.aIPrompt.deleteMany(),

      // Seed new data
      prisma.project.createMany({ data: data.projects }),
      prisma.blogPost.createMany({ data: data.blogs }),
      prisma.skill.createMany({ data: data.skills }),
      prisma.experience.createMany({ 
        data: data.experiences.map((e: any) => ({
          ...e,
          startDate: new Date(e.startDate),
          endDate: e.endDate ? new Date(e.endDate) : null
        })) 
      }),
      prisma.sEOMetadata.createMany({ data: data.seo }),
      prisma.aIPrompt.createMany({ data: data.prompts })
    ])

    return NextResponse.json({ success: true, message: 'Data restored successfully' })
  } catch (error) {
    console.error('Backup import failed:', error)
    return NextResponse.json({ error: 'Failed to restore data' }, { status: 500 })
  }
}
