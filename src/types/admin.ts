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

export interface Skill {
  id: string
  name: string
  icon?: string
  category: string
  level: number
}

export interface Experience {
  id: string
  titleEn: string
  titleVi: string
  company: string
  descriptionEn: string
  descriptionVi: string
  startDate: string
  endDate?: string
}

export interface SEOMetadata {
  id: string
  page: string
  titleEn: string
  titleVi: string
  descriptionEn: string
  descriptionVi: string
  keywords: string[]
  ogImage?: string
}

export interface ChatMessage {
  id: string
  role: string
  content: string
  createdAt: string
}

export interface ChatSession {
  id: string
  messages: ChatMessage[]
  createdAt: string
}

export interface ActivityLog {
  id: string
  action: string
  target: string
  details?: string
  createdAt: string
}

export interface ChatAnalytics {
  totalSessions: number
  totalMessages: number
  avgMessagesPerSession: string
  topicStats: Record<string, number>
  recentUserQueries: string[]
}

export interface DashStats {
  projects: number
  blogs: number
  publishedBlogs: number
  skills: number
  experiences: number
  aiSessions: number
  aiMessages: number
}
