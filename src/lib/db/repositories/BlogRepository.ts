import 'server-only'
import prisma from '@/lib/db/prisma'
import { dictionaries, Locale } from '@/lib/i18n/dictionaries'

export interface BlogPost {
  id: string
  slug: string
  title: string
  summary: string
  content?: string
  date: string
  category: string
  readTime: string
  image?: string
}

// Internal mock data maintained as fallback
const mockPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "building-scalable-saas-2026",
    title: "Building Scalable SaaS in 2026",
    summary: "A deep dive into modern backend architectures, gRPC, and the shift towards reactive ecosystems.",
    date: "2026-04-10",
    category: "Architecture",
    readTime: "12 min"
  },
  {
    id: "post-2",
    slug: "mastering-nextjs-15-app-router",
    title: "Mastering Next.js 15 App Router",
    summary: "How to leverage the latest React 19 features and Turbopack for lightning-fast delivery.",
    date: "2026-04-05",
    category: "Frontend",
    readTime: "8 min"
  }
]

export const BlogRepository = {
  async getAll(locale: Locale): Promise<BlogPost[]> {
    try {
      const dbPosts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { publishedAt: 'desc' }
      })

      if (dbPosts.length > 0) {
        return dbPosts.map(p => ({
          id: p.id,
          slug: p.slug,
          title: locale === 'vi' ? p.titleVi : p.titleEn,
          summary: locale === 'vi' ? p.summaryVi : p.summaryEn,
          date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : 'Draft',
          category: "Engineering", 
          readTime: "5 min"
        }))
      }
    } catch (error) {
      console.warn('Prisma blog fetch failed, falling back to mock:', error)
    }

    return mockPosts.map(post => ({
      ...post,
      title: locale === 'vi' ? `[VI] ${post.title}` : post.title,
      summary: locale === 'vi' ? `Một cái nhìn sâu sắc về... ${post.summary}` : post.summary,
    }))
  },

  async getBySlug(slug: string, locale: Locale): Promise<BlogPost | null> {
    try {
      const p = await prisma.blogPost.findUnique({
        where: { slug }
      })

      if (p) {
        return {
          id: p.id,
          slug: p.slug,
          title: locale === 'vi' ? p.titleVi : p.titleEn,
          summary: locale === 'vi' ? p.summaryVi : p.summaryEn,
          content: locale === 'vi' ? p.contentVi : p.contentEn,
          date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : 'Draft',
          category: "Engineering",
          readTime: "5 min"
        }
      }
    } catch (error) {
       console.warn('Prisma slug lookup failed, falling back to mock:', error)
    }

    const post = mockPosts.find(p => p.slug === slug)
    if (!post) return null

    return {
      ...post,
      title: locale === 'vi' ? `[VI] ${post.title}` : post.title,
    }
  }
}
