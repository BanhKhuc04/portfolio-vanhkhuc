import React from 'react'
import { BlogRepository } from '@/lib/db/repositories/BlogRepository'
import { dictionaries, Locale } from '@/lib/i18n/dictionaries'
import BlogListingClient from '@/features/blog/BlogListing'
import { SEORepository } from '@/lib/db/repositories/SEORepository'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await SEORepository.getByPage('blog')
  return {
    title: seo?.titleEn || "Blog | vanhkhuc.dev",
    description: seo?.descriptionEn || "Thoughts on systems, AI, and software engineering.",
    keywords: seo?.keywords || ["Tech Blog", "Software Engineering", "Systems"],
    openGraph: {
      title: seo?.titleEn,
      description: seo?.descriptionEn,
      images: [seo?.ogImage || "/og-image.png"]
    }
  }
}

interface PageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function BlogPage({ searchParams }: PageProps) {
  const sParams = await searchParams
  const locale = (sParams.lang as Locale) || 'vi'
  
  // Server-side fetching
  const posts = await BlogRepository.getAll(locale)
  
  return (
    <BlogListingClient 
      posts={posts} 
      locale={locale} 
      translations={dictionaries[locale]} 
    />
  )
}
