import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  trackedGeckoCoins: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<typeof initialState | {}>) => {
      return (state = {
        ...state,
        ...action.payload,
      })
    },
    resetUser: (state) => {
      return (state = initialState)
    },
  },
})

const { actions, reducer } = userSlice
// Action creators are generated for each case reducer function
export const { setUser, resetUser } = actions

export default reducer
