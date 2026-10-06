/** Small presentation helpers shared across cards and the portfolio page. */

import { categories } from '../data/portfolio'

/** 'weddings' -> 'Weddings' */
export function getCategoryLabel(categoryId) {
  return categories.find((category) => category.id === categoryId)?.label ?? categoryId
}

/** '12/2026' -> '12 December 2026' */
export function formatDate(value) {
  if (!value) return ''
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Minimum selectable date on a date input, expressed as an ISO date string. */
export function todayIso() {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

/** Upper bound for the date picker: roughly two years out. */
export function maxEventDateIso() {
  const now = new Date()
  now.setFullYear(now.getFullYear() + 2)
  const offset = now.getTimezoneOffset()
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

/** First letter of a string, used by the monogram fallback. */
export function initial(value = '') {
  return value.trim().charAt(0).toUpperCase()
}
