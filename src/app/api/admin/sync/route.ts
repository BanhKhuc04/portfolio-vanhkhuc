import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { projects as mockProjects, skillCategories, journey } from '@/lib/data'
import { dictionaries } from '@/lib/dictionaries'

export async function POST() {
  try {
    // 1. Sync Projects
    for (const project of mockProjects) {
       const titleVi = dictionaries['vi'].projects.items[project.id as keyof typeof dictionaries['vi']['projects']['items']]?.title || project.title
       const titleEn = dictionaries['en'].projects.items[project.id as keyof typeof dictionaries['en']['projects']['items']]?.title || project.title
       const descVi = dictionaries['vi'].projects.items[project.id as keyof typeof dictionaries['vi']['projects']['items']]?.description || project.description
       const descEn = dictionaries['en'].projects.items[project.id as keyof typeof dictionaries['en']['projects']['items']]?.description || project.description

       await prisma.project.upsert({
         where: { id: project.id },
         update: {
           titleEn, titleVi,
           descriptionEn: descEn,
           descriptionVi: descVi,
           featured: project.featured || false,
           tags: [project.tag],
           imageUrl: project.imageUrl,
           liveUrl: project.liveUrl,
           githubUrl: project.githubUrl
         },
         create: {
           id: project.id,
           titleEn, titleVi,
           descriptionEn: descEn,
           descriptionVi: descVi,
           featured: project.featured || false,
           tags: [project.tag],
           imageUrl: project.imageUrl,
           liveUrl: project.liveUrl,
           githubUrl: project.githubUrl
         }
       })
    }

    // 2. Sync Skills
    for (const category of skillCategories) {
      for (const skillName of category.skills) {
        await prisma.skill.upsert({
          where: { id: `skill-${skillName.toLowerCase().replace(/\s+/g, '-')}` },
          update: { name: skillName, category: category.title, level: 85 },
          create: {
            id: `skill-${skillName.toLowerCase().replace(/\s+/g, '-')}`,
            name: skillName,
            category: category.title,
            level: 85
          }
        })
      }
    }

    // 3. Sync Experience (Journey)
    for (let i = 0; i < journey.length; i++) {
      const item = journey[i]
      const id = `exp-${i}`
      
      // Attempt to extract dates from year string (e.g., "2024 - 2026")
      const years = item.year.split(' - ')
      const startYear = parseInt(years[0]) || 2020
      const endYear = years[1] === 'Present' ? null : (parseInt(years[1]) || null)
      
      await prisma.experience.upsert({
        where: { id },
        update: {
          titleEn: item.title,
          titleVi: item.title, // Falling back to same title as mock data doesn't have VI journey yet
          company: item.company,
          descriptionEn: item.description,
          descriptionVi: item.description,
          startDate: new Date(startYear, 0, 1),
          endDate: endYear ? new Date(endYear, 11, 31) : null
        },
        create: {
          id,
          titleEn: item.title,
          titleVi: item.title,
          company: item.company,
          descriptionEn: item.description,
          descriptionVi: item.description,
          startDate: new Date(startYear, 0, 1),
          endDate: endYear ? new Date(endYear, 11, 31) : null
        }
      })
    }

    return NextResponse.json({ success: true, message: 'All entities synced successfully' })
  } catch (error) {
    console.error('Unified Sync failed:', error)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}
