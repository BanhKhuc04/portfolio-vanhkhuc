import React from 'react'
import { ProjectRepository } from '@/lib/db/repositories/ProjectRepository'
import { dictionaries, Locale } from '@/lib/i18n/dictionaries'
import ProjectDetailClient from '@/features/projects/ProjectDetail'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ lang?: string }>
}

export default async function ProjectPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const sParams = await searchParams
  const locale = (sParams.lang as Locale) || 'vi'
  
  // Server-side fetching (Protected from browser bundling)
  const project = await ProjectRepository.getById(id, locale)
  
  if (!project) {
    notFound()
  }

  return (
    <ProjectDetailClient 
      project={project} 
      locale={locale} 
      translations={dictionaries[locale]} 
    />
  )
}
