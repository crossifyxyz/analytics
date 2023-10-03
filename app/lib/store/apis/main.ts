import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['GeckoMarketResult'],
  endpoints: (build) => ({
    // BREAK
  }),
})

export const mainPersistApi = createApi({
  reducerPath: 'mainPersistApi',
  baseQuery: fetchBaseQuery(),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (build) => ({
    // BREAK
  }),
})
