import { NextResponse } from 'next/server'

export async function GET() {
  const response = NextResponse.json(
    {
      message: 'Successfully signed out!',
    },
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }
  )

  response.cookies.delete('jwt')

  return response
}
