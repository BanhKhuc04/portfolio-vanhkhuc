export interface BlogPost {
  id: string
  slug: string
  titleEn: string
  titleVi: string
  summaryEn: string
  summaryVi: string
  contentEn: string
  contentVi: string
  published: boolean
  publishedAt?: string
  imageUrl?: string
  createdAt?: string
}
