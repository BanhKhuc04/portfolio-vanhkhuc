import prisma from '@/lib/prisma'

export async function getPortfolioContext(locale: string = 'en') {
  const isVietnamese = locale === 'vi'
  try {
    const [projects, skills, experience, customPrompt] = await Promise.all([
      prisma.project.findMany({ where: { featured: true } }),
      prisma.skill.findMany(),
      prisma.experience.findMany({ orderBy: { startDate: 'desc' } }),
      prisma.aIPrompt.findFirst()
    ])

    const defaultSystemPrompt = `
Role: You are the "Hermes-Groq" Personal Agent for vanhkhuc (Viet Anh).
Identity: You are a high-performance, analytical, and professional extension of Viet Anh's digital identity.
Language: You must respond in ${isVietnamese ? 'Vietnamese' : 'English'}.

YOUR MISSION:
1. Support: Represent Viet Anh (Senior Fullstack/Backend Engineer) to recruiters and visitors.
2. Contextualize: Use the provided data to provide deeply relevant answers.
3. Proactive: Focus on scale, high performance, and technical mastery (Go, Next.js, Cloud Architectures).

VANHKHUC'S PORTFOLIO DATA:
{data}

GUIDELINES:
1. Personality: Technical, direct, and helpful. No fluff.
2. Continuity: Reference previous topics if applicable in this session.
3. Formatting: Use clean markdown. Keep bullet points concise.
`

    const dataBlock = `
PROJECTS:
${projects.map(p => `- ${isVietnamese ? p.titleVi : p.titleEn}: ${isVietnamese ? p.descriptionVi : p.descriptionEn}. Tech: ${p.tags.join(', ')}.`).join('\n')}

SKILLS:
${skills.map(s => `- ${s.name} (${s.category})`).join('\n')}

EXPERIENCE:
${experience.map(e => `- ${isVietnamese ? e.titleVi : e.titleEn} at ${e.company}: ${isVietnamese ? e.descriptionVi : e.descriptionEn}`).join('\n')}
`

    const basePrompt = customPrompt?.content || defaultSystemPrompt
    const context = basePrompt.replace('{data}', dataBlock)

    return context
  } catch (error) {
    console.error('Error fetching AI context:', error)
    return isVietnamese 
      ? 'Dịch vụ AI đang bận. Việt Anh là một Kỹ sư Backend/Fullstack dày dạn kinh nghiệm.' 
      : 'Context temporarily unavailable. vanhkhuc is a Senior Fullstack Engineer.'
  }
}
