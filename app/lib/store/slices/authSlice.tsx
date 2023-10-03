import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState: {
  id: string
  role: 'user' | 'admin' | 'super' | string
  email: string
  name: string
  surname: string
  phone: string
} = {
  id: '',
  role: '',
  email: '',
  name: '',
  surname: '',
  phone: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<typeof initialState | {}>) => {
      return (state = {
        ...state,
        ...action.payload,
      })
    },
    resetAuth: (state) => {
      return (state = initialState)
    },
  },
})

const { actions, reducer } = authSlice
// Action creators are generated for each case reducer function
export const { setAuth, resetAuth } = actions

export default reducer
