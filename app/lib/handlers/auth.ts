'use client'

import { resetAuth, resetUser, setAuth } from '@/lib/store'
import { getSignout, postLogin, postResetPwd, postSignup } from '@/lib'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

// SIGNUP
export async function handleSignup({
  values,
  setSubmitting,
  setFieldError,
  router,
  dispatch,
}: {
  values: {
    name?: string
    surname?: string
    phone?: string
    email: string
    password: string
  }
  setSubmitting: any
  setFieldError: any
  router: AppRouterInstance
  dispatch: Dispatch
}) {
  const { name, surname, phone, email, password } = values
  try {
    // HANDLE POST USER
    await postSignup({
      email,
      name,
      surname,
      phone,
      password,
    })
    // AUTO LOGIN
    await handleLogin({ email, password, dispatch })
    router.push('/')
  } catch (err: any) {
    if (err?.response?.data?.emailIsRegistered)
      setFieldError('email', 'This email is already registered to Crossify!')
  } finally {
    setSubmitting(false)
  }
}

// LOGIN
export async function handleLogin({
  email,
  password,
  setSubmitting,
  setFieldError,
  dispatch,
}: {
  email: string
  password: string
  setSubmitting?: any
  setFieldError?: any
  dispatch: Dispatch
}) {
  try {
    const res = await postLogin({ email, password })
    const {
      id,
      role,
      email: userEmail,
      name,
      surname,
      phone,
      emailIsRegistered,
      passwordIsMatch,
    } = await res.json()
    if (!res.ok) {
      if (emailIsRegistered === false)
        setFieldError?.('email', 'This email is not registered to Crossify!')
      if (passwordIsMatch === false)
        setFieldError?.('password', 'Password is incorrect!')
    } else
      dispatch(setAuth({ id, role, email: userEmail, name, surname, phone }))
  } finally {
    setSubmitting?.(false)
  }
}

// RESET PASSWORD
export async function handleForgotPwd({
  email,
  setSubmitting,
  setFieldError,
  setHelperText,
}: {
  email: string
  setSubmitting: any
  setFieldError: any
  setHelperText: any
}) {
  try {
    const res = await postResetPwd({
      email,
      origin: window.origin,
      userAgent: navigator.userAgent,
    })
    if (!res.ok) {
      setFieldError('email', await res.text())
    } else {
      setHelperText(await res.text())
    }
  } finally {
    setSubmitting(false)
  }
}

export async function handleSignout(dispatch: Dispatch) {
  const res = await getSignout()
  if (res.ok) {
    dispatch(resetAuth())
    dispatch(resetUser())
  }
}
