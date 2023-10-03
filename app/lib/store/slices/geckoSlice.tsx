import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState: {} = {}

export const geckoSlice = createSlice({
  name: 'gecko',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {},
    setUserLoading: (state, action: PayloadAction<boolean>) => {},
  },
})

const { actions, reducer } = geckoSlice
// Action creators are generated for each case reducer function
export const {} = actions

export default reducer
