import 'server-only'
import prisma from '@/lib/db/prisma'
import { projects as mockProjects, ProjectDisplay } from '@/content/data'
import { dictionaries, Locale } from '@/lib/i18n/dictionaries'

/**
 * ProjectRepository handles data fetching for projects.
 * Attempts to use Prisma (Supabase) but falls back to mock data if connection fails.
 */
export const ProjectRepository = {
  /**
   * Get all projects localized for a specific locale
   */
  async getAll(locale: Locale): Promise<ProjectDisplay[]> {
    try {
      // Attempt to fetch from Prisma
      const dbProjects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
      })

      if (dbProjects.length > 0) {
        return dbProjects.map(p => ({
          id: p.id,
          title: locale === 'vi' ? p.titleVi : p.titleEn,
          tag: p.tags[0] || 'Project',
          description: locale === 'vi' ? p.descriptionVi : p.descriptionEn,
          imageUrl: p.imageUrl ?? undefined,
          stat: "Real-time", // Mocking stats for now
          href: p.liveUrl || '#',
          color: "from-primary/20 to-accent/20", // Default color
          featured: p.featured
        }))
      }
    } catch (error) {
      console.warn('Prisma fetch failed, falling back to mock data:', error)
    }

    // Fallback to localized mock data
    return mockProjects.map(project => ({
      ...project,
      title: dictionaries[locale].projects.items[project.id as keyof typeof dictionaries['en']['projects']['items']]?.title || project.title,
      tag: dictionaries[locale].projects.items[project.id as keyof typeof dictionaries['en']['projects']['items']]?.tag || project.tag,
      description: dictionaries[locale].projects.items[project.id as keyof typeof dictionaries['en']['projects']['items']]?.description || project.description,
    }))
  },

  /**
   * Get a single project by ID localized
   */
  async getById(id: string, locale: Locale): Promise<ProjectDisplay | null> {
    try {
      const p = await prisma.project.findUnique({
        where: { id }
      })

      if (p) {
        return {
          id: p.id,
          title: locale === 'vi' ? p.titleVi : p.titleEn,
          tag: p.tags[0] || 'Project',
          description: locale === 'vi' ? p.descriptionVi : p.descriptionEn,
          imageUrl: p.imageUrl ?? undefined,
          stat: "Real-time",
          href: p.liveUrl || '#',
          color: "from-primary/20 to-accent/20",
          featured: p.featured
        }
      }
    } catch (error) {
      console.warn('Prisma lookup failed, falling back to mock data:', error)
    }

    // Fallback to mock projects
    const project = mockProjects.find(p => p.id === id)
    if (!project) return null

    return {
      ...project,
      title: dictionaries[locale].projects.items[id as keyof typeof dictionaries['en']['projects']['items']]?.title || project.title,
      tag: dictionaries[locale].projects.items[id as keyof typeof dictionaries['en']['projects']['items']]?.tag || project.tag,
      description: dictionaries[locale].projects.items[id as keyof typeof dictionaries['en']['projects']['items']]?.description || project.description,
    }
  }
}
