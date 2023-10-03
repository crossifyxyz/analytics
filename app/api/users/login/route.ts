import { NextRequest, NextResponse } from 'next/server'
import { User } from '@/lib/models'
import { connectDB } from '@/lib/utils'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { email, password } = await req.json()

    const doc = await User.findOne(
      { email },
      'id role email name surname password phone'
    )

    if (!doc) {
      return NextResponse.json(
        { emailIsRegistered: false },
        {
          status: 404,
          headers: { 'content-type': 'application/json' },
        }
      )
    }

    const { id, role, name, surname, email: userEmail, phone } = doc

    // Check password
    const isMatch = await bcrypt.compare(password, doc.password)

    if (!isMatch) {
      return NextResponse.json(
        { passwordIsMatch: false },
        {
          status: 403,
          headers: { 'content-type': 'application/json' },
        }
      )
    }

    const expiresIn = 60 * 60 * 24 * 7 // 1 week in seconds
    // Create JWT Payload
    const payload = {
      id,
      role,
    }
    // Sign token
    const token = await new Promise<string | undefined>((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.SESSION_SECRET as string,
        {
          expiresIn,
        },
        (err, token) => {
          if (err) reject(err)
          resolve(token)
        }
      )
    })

    const response = NextResponse.json(
      {
        id,
        role,
        email: userEmail,
        name,
        surname,
        phone,
      },
      { status: 200, headers: { 'content-type': 'application/json' } }
    )

    response.cookies.set({ name: 'jwt', value: token!, path: '/' })

    return response
  } catch {
    return new Response('Failed to perform user check!', { status: 500 })
  }
}
