import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "@/providers/LanguageProvider"
import { LayoutContent } from "./LayoutContent"

import { SEORepository } from "@/lib/repositories/SEORepository"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await SEORepository.getByPage('home')
  
  // Base configuration
  const defaultTitle = "vanhkhuc.dev — Backend & Fullstack Engineer"
  const defaultDesc = "Senior Backend / Fullstack Engineer building high-performance, scalable digital ecosystems with clean architecture."
  
  return {
    metadataBase: new URL('https://vanhkhuc.dev'),
    title: {
      default: seo?.titleEn || defaultTitle,
      template: "%s | vanhkhuc.dev"
    },
    description: seo?.descriptionEn || defaultDesc,
    keywords: seo?.keywords || ["Backend Engineer", "Fullstack Developer", "Next.js", "Go", "Node.js"],
    authors: [{ name: "vanhkhuc", url: "https://vanhkhuc.dev" }],
    creator: "vanhkhuc",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://vanhkhuc.dev",
      siteName: "vanhkhuc.dev",
      title: seo?.titleEn || defaultTitle,
      description: seo?.descriptionEn || defaultDesc,
      images: [
        {
          url: seo?.ogImage || "/og-image.png",
          width: 1200,
          height: 630,
          alt: "vanhkhuc.dev Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.titleEn || defaultTitle,
      description: seo?.descriptionEn || defaultDesc,
      images: [seo?.ogImage || "/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

import { RecruiterChat } from "@/components/ui/RecruiterChat"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LanguageProvider>
      <LayoutContent>
        {children}
        <RecruiterChat />
      </LayoutContent>
    </LanguageProvider>
  )
}
