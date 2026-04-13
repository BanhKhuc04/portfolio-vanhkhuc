import prisma from '@/lib/prisma'

export async function getPortfolioContext() {
  try {
    const [projects, skills, experience, customPrompt] = await Promise.all([
      prisma.project.findMany({ where: { featured: true } }),
      prisma.skill.findMany(),
      prisma.experience.findMany({ orderBy: { startDate: 'desc' } }),
      prisma.aIPrompt.findFirst()
    ])

    const defaultSystemPrompt = `
Role: You are the AI Assistant for vanhkhuc (Viet Anh), a Senior Fullstack/Backend Engineer.
Your goal is to answer questions from recruiters and visitors about vanhkhuc's work, experience, and skills.

VANHKHUC'S PORTFOLIO DATA:
{data}

GUIDELINES:
1. Be professional, technical, yet friendly.
2. If asked about contact info, point them to the contact section or mention social links (GitHub: BanhKhuc04).
3. Always stay in character as vanhkhuc's personal AI agent.
4. Keep answers concise and highlight impact (metrics, scale, challenges solved).
5. If someone asks something unrelated to vanhkhuc or professional topics, politely steer them back.
`

    const dataBlock = `
PROJECTS:
${projects.map(p => `- ${p.titleEn}: ${p.descriptionEn}. Tech: ${p.tags.join(', ')}. Link: ${p.liveUrl}`).join('\n')}

SKILLS:
${skills.map(s => `- ${s.name} (${s.category})`).join('\n')}

EXPERIENCE:
${experience.map(e => `- ${e.titleEn} at ${e.company}: ${e.descriptionEn}`).join('\n')}
`

    const basePrompt = customPrompt?.content || defaultSystemPrompt
    const context = basePrompt.replace('{data}', dataBlock)

    return context
  } catch (error) {
    console.error('Error fetching AI context:', error)
    return 'Context temporarily unavailable. vanhkhuc is a Senior Fullstack Engineer.'
  }
}
