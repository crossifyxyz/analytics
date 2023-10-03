import { connectDB } from '@/lib/utils'
import { User } from '@/lib/models'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { pwdResetToken, password } = await req.json()

    const user = await User.findOne({
      pwdResetToken,
      pwdResetExpiration: { $gt: Date.now() },
    })

    if (!user)
      return new Response('Session expired! Try Again with a new Request', {
        status: 422,
      })

    const hash = await bcrypt.hash(password, 12)
    user.password = hash
    user.pwdResetToken = undefined
    user.pwdResetExpiration = undefined
    await user.save()
    return new Response('Password Updated successfully')
  } catch {
    return new Response('Something went wrong.', {
      status: 500,
    })
  }
}
