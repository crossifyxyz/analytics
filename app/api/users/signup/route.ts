import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/utils'
import { User } from '@/lib/models'
import bcrypt from 'bcryptjs'

const status500 = new Response('Something went wrong.', {
  status: 500,
})

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { name, surname, email, phone, password } = await req.json()

    const user = await User.findOne({ email }, 'email')
    if (!!user) {
      return NextResponse.json(
        { emailIsRegistered: true },
        {
          status: 403,
        }
      )
    }

    const hash = await bcrypt.hash(password, 12)
    const newUser = new User({
      name,
      surname,
      email,
      phone,
      password: hash,
    })

    const savedUser = await newUser.save()
    return NextResponse.json(savedUser)
  } catch {
    return status500
  }
}
