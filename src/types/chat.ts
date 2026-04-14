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

export interface ChatAnalytics {
  totalSessions: number
  totalMessages: number
  avgMessagesPerSession: string
  topicStats: Record<string, number>
  recentUserQueries: string[]
}
