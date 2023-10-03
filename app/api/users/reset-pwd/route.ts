import { connectDB, resetPwdHtml } from '@/lib/utils'
import { User } from '@/lib/models'
import crypto from 'crypto'
import sgMail from '@sendgrid/mail'
import { NextRequest, NextResponse } from 'next/server'

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { email, origin, userAgent } = await req.json()

    const user = await User.findOne({ email }, 'email')

    if (!user)
      return new Response('This email is not registered to Crossify!', {
        status: 403,
      })

    const token = await new Promise<string>((resolve, reject) => {
      crypto.randomBytes(32, (err, buffer) => {
        if (err) reject(err)
        resolve(buffer.toString('hex'))
      })
    })

    user.pwdResetToken = token
    user.pwdResetExpiration = Date.now() + 1000 * 60 * 60 // 1 hour in ms
    await user.save()

    const actionUrl = `${origin}/new-pwd?pwdResetToken=${token}`
    const msg = {
      from: 'no-reply@crossify.xyz',
      to: user.email,
      subject: 'Crossify <> Forgot Password!',
      html: resetPwdHtml({
        originUrl: origin,
        productName: 'Crossify',
        userAgent,
        actionUrl,
        expireTime: '1 hour',
        supportMail: 'info@crossify.xyz',
      }),
    }
    await sgMail.send(msg)

    return new Response('Please check your E-mail inbox / spam!', {
      status: 200,
    })
  } catch {
    return new Response('Something went wrong.', { status: 500 })
  }
}
