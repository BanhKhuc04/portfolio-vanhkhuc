import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * Admin Dashboard Stats — live counts from database
 */
export async function GET() {
  try {
    const [projectCount, blogCount, publishedBlogCount, skillCount, experienceCount, chatSessionCount, chatMessageCount] = await Promise.all([
      prisma.project.count(),
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.skill.count(),
      prisma.experience.count(),
      prisma.chatSession.count(),
      prisma.chatMessage.count()
    ])

    return NextResponse.json({
      projects: projectCount,
      blogs: blogCount,
      publishedBlogs: publishedBlogCount,
      skills: skillCount,
      experiences: experienceCount,
      aiSessions: chatSessionCount,
      aiMessages: chatMessageCount
    })
  } catch {
    return NextResponse.json({
      projects: 0,
      blogs: 0,
      publishedBlogs: 0,
      skills: 0,
      experiences: 0
    })
  }
}
