export function postSignup(userData: {
  email: string
  name?: string
  surname?: string
  phone?: string
  password: string
}) {
  return fetch(`/api/users/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
}

export async function postLogin(userData: { email: string; password: string }) {
  return await fetch(`/api/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
}

export function postResetPwd({
  email,
  origin,
  userAgent,
}: {
  email: string
  origin: string
  userAgent: string
}) {
  return fetch('/api/users/reset-pwd', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, origin, userAgent }),
  })
}

export function postNewPwd({
  pwdResetToken,
  password,
}: {
  pwdResetToken: any
  password: string
}) {
  return fetch('/api/users/new-pwd', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pwdResetToken, password }),
  })
}

export function putUserField({
  actionType,
  id,
  field,
  value,
}: {
  actionType: string
  id: string
  field: string
  value: string
}) {
  return fetch(`/api/users?id=${id}&action=${actionType}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      [field]: value,
    }),
  })
}

export function getUserFields({
  id,
  fields,
}: {
  id: string
  fields: string[]
}) {
  return fetch(`/api/users?id=${id}&fields=${fields.join('%20')}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function getSignout() {
  return fetch(`/api/users/signout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
