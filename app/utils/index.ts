import { format } from 'date-fns'

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(date: Date) {
  return {
    daily: format(date, 'd MMM'),
    weekly: format(date, 'd MMM'),
    monthly: format(date, 'MMM yyy'),
  }
}

export async function sleep(ms = 1000) {
  return await new Promise(function (resolve) {
    setTimeout(resolve, ms)
  })
}

export function getAvatarFallback(name: string) {
  return name
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .substring(0, 2)
}

export function getFlag(countryCode: string) {
  const regex = /^[A-Z]{2}$/.test(countryCode)
  if (!countryCode || !regex) return
  return String.fromCodePoint(...countryCode.split('').map(char => 127397 + char.charCodeAt(0)))
}
