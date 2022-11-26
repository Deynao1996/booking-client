import { millisecondsPerDay } from '../data/data'

export function getDayDifference(date1, date2) {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime())
  const diffDays = Math.ceil(timeDiff / millisecondsPerDay)
  return diffDays
}

export function getDatesInRange(startDate, endDate) {
  const end = getDateWithoutTime(endDate)
  const date = getDateWithoutTime(startDate)
  const dates = []
  while (date <= end) {
    dates.push(new Date(date).getTime())
    date.setDate(date.getDate() + 1)
  }

  return dates
}

export function getDateWithoutTime(dateParam) {
  const date = new Date(dateParam.getTime())
  date.setHours(0, 0, 0, 0)
  return date
}

export function addWeeks(weeks, date = new Date()) {
  date.setDate(date.getDate() + weeks * 7)

  return date
}
