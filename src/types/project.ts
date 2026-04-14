export interface Project {
  id: string
  titleEn: string
  titleVi: string
  descriptionEn: string
  descriptionVi: string
  featured: boolean
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
  createdAt?: string
}
