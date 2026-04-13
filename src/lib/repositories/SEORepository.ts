import prisma from '@/lib/prisma'

export interface SEOData {
  titleEn: string
  titleVi: string
  descriptionEn: string
  descriptionVi: string
  keywords: string[]
  ogImage?: string
}

export const SEORepository = {
  async getByPage(page: string): Promise<SEOData | null> {
    try {
      const data = await prisma.sEOMetadata.findUnique({
        where: { page }
      })
      if (!data) return null
      return {
        ...data,
        ogImage: data.ogImage ?? undefined
      }
    } catch (error) {
      console.error(`Failed to fetch SEO for page: ${page}`, error)
      return null
    }
  }
}
