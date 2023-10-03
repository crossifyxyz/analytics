import { connectDB, serverAuth } from '@/lib/utils'
import { User } from '@/lib/models'
import {
  PUT_USER_NAME,
  PUT_USER_PHONE,
  PUT_USER_SURNAME,
  PATCH_ADD_USER_TRACKED_GECKO_COINS,
  PATCH_PULL_USER_TRACKED_GECKO_COINS,
} from '@/lib'
import { NextRequest, NextResponse } from 'next/server'

const status500 = new Response('Something went wrong.', {
  status: 500,
})

const status405 = new Response('req_query_actionType_not_supported', {
  status: 405,
})

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const searchParams = req.nextUrl.searchParams,
      _id = searchParams.get('id'),
      fields = searchParams.get('fields')

    const queryRes = await User.findOne({ _id }, fields).lean()
    return NextResponse.json(queryRes)
  } catch {
    return status500
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB()

    const auth = await serverAuth(req)
    if (!!auth) return auth

    const searchParams = req.nextUrl.searchParams,
      _id = searchParams.get('id'),
      action = searchParams.get('action'),
      { name, surname, phone } = await req.json()

    switch (action) {
      case PUT_USER_NAME:
        const putNameRes = <{ name: string } | {}>(
          await User.findOneAndUpdate(
            { _id },
            { name },
            { new: true, projection: 'name' }
          ).lean()
        )
        return NextResponse.json(putNameRes)
      case PUT_USER_SURNAME:
        const putSurnameRes = <{ surname: string } | {}>(
          await User.findOneAndUpdate(
            { _id },
            { surname },
            { new: true, projection: 'surname' }
          ).lean()
        )
        return NextResponse.json(putSurnameRes)
      case PUT_USER_PHONE:
        const putPhoneRes = <{ phone: string } | {}>(
          await User.findOneAndUpdate(
            { _id },
            { phone },
            { new: true, projection: 'phone' }
          )
        )
        return NextResponse.json(putPhoneRes)
      default:
        return status405
    }
  } catch {
    return status500
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB()

    const auth = await serverAuth(req)
    if (!!auth) return auth

    const searchParams = req.nextUrl.searchParams,
      _id = searchParams.get('id'),
      action = searchParams.get('action'),
      body = await req.json(),
      { trackedGeckoCoins } = body

    switch (action) {
      case PATCH_ADD_USER_TRACKED_GECKO_COINS:
        const addRes = <[]>(
            await User.findOneAndUpdate(
              { _id },
              {
                $addToSet: { trackedGeckoCoins: { $each: trackedGeckoCoins } },
              },
              { new: true, projection: 'trackedGeckoCoins' }
            ).lean()
          )?.trackedGeckoCoins ?? []
        return NextResponse.json(addRes)

      case PATCH_PULL_USER_TRACKED_GECKO_COINS:
        const pullRes =
          <[]>(
            (
              await User.findOneAndUpdate(
                { _id },
                { $pull: { trackedGeckoCoins: { $in: trackedGeckoCoins } } },
                { new: true, projection: 'trackedGeckoCoins' }
              ).lean()
            )?.trackedGeckoCoins
          ) ?? []
        return NextResponse.json(pullRes)
      default:
        return status405
    }
  } catch {
    return status500
  }
}
