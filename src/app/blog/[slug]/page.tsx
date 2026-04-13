import React from 'react'
import { BlogRepository } from '@/lib/repositories/BlogRepository'
import { Locale } from '@/lib/dictionaries'
import BlogPostClient from '@/components/ui/BlogPostClient'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const sParams = await searchParams
  const locale = (sParams.lang as Locale) || 'vi'
  const post = await BlogRepository.getBySlug(slug, locale)
  
  if (!post) return {}

  const title = post.title
  const desc = post.summary

  return {
    title: `${title} | vanhkhuc.dev`,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: [post.image || "/og-image.png"],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [post.image || "/og-image.png"],
    }
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lang?: string }>
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const sParams = await searchParams
  const locale = (sParams.lang as Locale) || 'vi'
  
  // Server-side fetching
  const post = await BlogRepository.getBySlug(slug, locale)
  
  if (!post) {
    notFound()
  }

  return (
    <BlogPostClient 
      post={post} 
      locale={locale}
    />
  )
}
