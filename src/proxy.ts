import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY || 'vk-os-secure-fallback-key-for-dev'
  return new TextEncoder().encode(secret)
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect API routes — the admin page has its own AuthGate UI
  const isAdminApi = pathname.startsWith('/api/admin')
  const isAuthApi = pathname === '/api/admin/auth'

  if (isAdminApi && !isAuthApi) {
    const token = request.cookies.get('vk_admin_session')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
      await jwtVerify(token, getJwtSecretKey())
      return NextResponse.next()
    } catch {
      return NextResponse.json({ error: 'Invalid Session' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/admin/:path*'
  ]
}

