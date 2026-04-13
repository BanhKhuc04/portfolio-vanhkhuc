import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { recordActivity } from '@/lib/utils/activity'

/**
 * Admin API for Blog Posts management
 */

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(posts)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { slug, titleEn, titleVi, summaryEn, summaryVi, contentEn, contentVi, published, imageUrl } = data

    const post = await prisma.blogPost.create({
      data: {
        slug,
        titleEn,
        titleVi,
        summaryEn,
        summaryVi,
        contentEn: contentEn || '',
        contentVi: contentVi || '',
        imageUrl: imageUrl || null,
        published: published || false,
        publishedAt: published ? new Date() : null
      }
    })

    await recordActivity('CREATE_BLOG', post.titleEn, `Created blog post: /blog/${post.slug}`)

    return NextResponse.json(post)
  } catch (error) {
    console.error('Blog post creation failed:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

    // Handle published state change
    if (updateData.published !== undefined) {
      updateData.publishedAt = updateData.published ? new Date() : null
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData
    })

    await recordActivity('UPDATE_BLOG', post.titleEn, `Updated blog post: /blog/${post.slug}`)

    return NextResponse.json(post)
  } catch (error) {
    console.error('Blog post update failed:', error)
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

    const post = await prisma.blogPost.delete({ where: { id } })

    await recordActivity('DELETE_BLOG', post.titleEn, `Deleted blog post ID: ${id}`)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}
