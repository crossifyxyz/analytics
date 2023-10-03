import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

const initialState = {
  geckoSearchValue: [] as { value: string; label: string }[],
  indicatorSortPorps: {
    sortBy: 'market_cap',
    desc: true,
    perPage: 50,
    page: 1,
  },
  editingTrackedGeckoCoins: false,
  selectedGeckoCoins: [] as string[],
}

export const compSlice = createSlice({
  name: 'comp',
  initialState,
  reducers: {
    setComp: (state, action: PayloadAction<typeof initialState | {}>) => {
      return (state = {
        ...state,
        ...action.payload,
      })
    },
    setIndicatorSortPorps: (
      state,
      action: PayloadAction<typeof initialState.indicatorSortPorps | {}>
    ) => {
      state.indicatorSortPorps = {
        ...state.indicatorSortPorps,
        ...action.payload,
      }
    },
    toggleToSelectedGeckoCoins: (state, action: PayloadAction<string>) => {
      if (!state.selectedGeckoCoins.includes(action.payload))
        state.selectedGeckoCoins.push(action.payload)
      else
        state.selectedGeckoCoins = removeItem(
          state.selectedGeckoCoins,
          action.payload
        )
    },
  },
})

const { actions, reducer } = compSlice
// Action creators are generated for each case reducer function
export const { setComp, setIndicatorSortPorps, toggleToSelectedGeckoCoins } =
  actions

export default reducer
