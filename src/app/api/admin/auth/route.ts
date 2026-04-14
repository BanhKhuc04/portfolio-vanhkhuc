import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY || 'vk-os-secure-fallback-key-for-dev'
  return new TextEncoder().encode(secret)
}

// Check session
export async function GET(request: NextRequest) {
  const token = request.cookies.get('vk_admin_session')?.value
  
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  try {
    await jwtVerify(token, getJwtSecretKey())
    return NextResponse.json({ authenticated: true })
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}

// Login
export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      return NextResponse.json(
        { error: 'Admin password not configured' },
        { status: 500 }
      )
    }

    if (password === adminPassword) {
      const token = await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('12h')
        .sign(getJwtSecretKey())

      const cookieStore = await cookies()
      cookieStore.set({
        name: 'vk_admin_session',
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 12 // 12 hours
      })

      return NextResponse.json({ authenticated: true })
    }

    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

// Logout
export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('vk_admin_session')
  return NextResponse.json({ success: true })
}
