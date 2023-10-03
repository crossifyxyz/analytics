import jwt from 'jsonwebtoken'
import { type NextRequest } from 'next/server'

export default async function serverAuth(
  req: NextRequest,
  role?: 'user' | 'admin' | 'super'
) {
  const cookies = req.cookies.get('jwt')
  const token = cookies?.value ?? ''
  try {
    // VERIFY COOKIE
    const data = <
      {
        id?: string
        role?: string
      }
    >jwt.verify(token, process.env.SESSION_SECRET || '')
    // CHECK ROLE IF GIVEN
    if (!!role && data.role !== role) throw Error
    // MATCH ID
    if (data.id !== req.nextUrl.searchParams.get('id')) throw Error

    return undefined
  } catch {
    // FAIL
    return new Response('Auth Failed!', {
      status: 403,
    })
  }
}
