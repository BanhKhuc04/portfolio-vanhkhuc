import prisma from '@/lib/db/prisma'

export async function recordActivity(action: string, target: string, details?: string) {
  try {
    await prisma.activityLog.create({
      data: {
        action,
        target,
        details
      }
    })
  } catch (error) {
    console.error('Failed to record activity:', error)
  }
}
