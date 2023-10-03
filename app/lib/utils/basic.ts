export const arrToObj = ({
  arr,
  key,
  exclude,
}: {
  arr: { [key: string | number]: any }[]
  key: string | number
  exclude?: (string | number)[]
}) =>
  arr.reduce((prev, curr) => {
    const obj: { [key: string | number]: unknown } = {}
    Object.keys(curr)
      .map((m) => !(exclude ?? []).includes(m) && m)
      .forEach((key) => key && (obj[key] = curr[key]))
    return Object.assign(prev, {
      [curr[key]]: obj,
    })
  }, {})

export const checkType = ({
  subject,
  type,
}: {
  subject: any
  type: 'object' | 'array' | 'string' | 'number'
}) => typeof subject === type

export function capitalizeFirstLetter(x: string) {
  return x.charAt(0).toUpperCase() + x.slice(1)
}

export const currentUnixTime = () => Math.floor(new Date().getTime() / 1000)

export function intlDateFormat(date: number) {
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date * 1000)
}

export function arrayUnique(array: []) {
  let a = array.concat()
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1)
    }
  }

  return a
}
