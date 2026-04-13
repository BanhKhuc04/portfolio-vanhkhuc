import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    let theme = await prisma.themeConfig.findFirst()
    
    // Create default if not exists
    if (!theme) {
      theme = await prisma.themeConfig.create({
        data: {
          primaryColor: "oklch(0.5 0.2 260)",
          radius: "0.75rem"
        }
      })
    }
    
    return NextResponse.json(theme)
  } catch (error) {
    console.error('Failed to fetch theme:', error)
    return NextResponse.json({ error: 'Failed to fetch theme' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { primaryColor, radius } = data

    const theme = await prisma.themeConfig.findFirst()
    
    let updatedTheme
    if (theme) {
      updatedTheme = await prisma.themeConfig.update({
        where: { id: theme.id },
        data: { primaryColor, radius }
      })
    } else {
      updatedTheme = await prisma.themeConfig.create({
        data: { primaryColor, radius }
      })
    }

    return NextResponse.json(updatedTheme)
  } catch (error) {
    console.error('Theme update failed:', error)
    return NextResponse.json({ error: 'Failed to update theme' }, { status: 500 })
  }
}
