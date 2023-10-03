import { NextApiRequest as OriginalNextApiRequest } from 'next'

declare module 'next' {
  interface NextApiRequest extends OriginalNextApiRequest {
    auth: { id?: string; role?: string }
  }
}
