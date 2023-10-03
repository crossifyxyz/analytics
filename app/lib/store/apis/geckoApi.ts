import {
  PATCH_ADD_USER_TRACKED_GECKO_COINS,
  PATCH_PULL_USER_TRACKED_GECKO_COINS,
} from '@/lib'
import { mainApi } from './main'

// Define a service using a base URL and expected endpoints
export const geckoApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    // SEARCH RESULTS
    getGeckoSearch: builder.query<GeckoMarketResult[], { ids?: string[] }>({
      query: ({ ids }) =>
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc`,
    }),
    // INDICATORS
    getGeckoMarkets: builder.query<
      GeckoMarketResult[],
      { ids?: string[]; perPage?: number; page?: number }
    >({
      query: ({ ids, perPage, page }) =>
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${(
          ids ?? []
        ).join('%2C')}&order=market_cap_desc&per_page=${perPage ?? 50}&page=${
          page ?? 1
        }&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C`,
      providesTags: ['GeckoMarketResult'],
      keepUnusedDataFor: 60 * 60 * 1, // 1 minutes
    }),
    // USER TRACKED GECKO COINS
    patchUserTrackedGeckoCoins: builder.mutation<
      string[],
      { id: string; type: 'add' | 'pull'; selectedGeckoCoins: string[] }
    >({
      query: ({ id, type, selectedGeckoCoins }) => ({
        url: `${window.origin}/api/users?id=${id}&action=${
          type === 'add'
            ? PATCH_ADD_USER_TRACKED_GECKO_COINS
            : PATCH_PULL_USER_TRACKED_GECKO_COINS
        }`,
        method: 'PATCH',
        body: {
          trackedGeckoCoins: selectedGeckoCoins,
        },
      }),
      invalidatesTags: ['GeckoMarketResult'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetGeckoSearchQuery,
  useGetGeckoMarketsQuery,
  usePatchUserTrackedGeckoCoinsMutation,
} = geckoApi
