import { request } from './axios-utils'

export const createAccount = async (user) => {
  return await request({ url: '/auth/register', method: 'POST', data: user })
}

export const loginToAccount = async (user) => {
  return await request({ url: '/auth/login', method: 'POST', data: user })
}

export const checkAuthToken = async (userId, token) => {
  return await request({ url: `/auth/${userId}/verify/${token}` })
}

export const sendPasswordConfirmation = async (email) => {
  return await request({
    url: '/reset-password',
    method: 'POST',
    data: { email }
  })
}

export const saveNewPassword = async ({ userId, token, password }) => {
  return await request({
    url: `/reset-password/${userId}/${token}`,
    method: 'POST',
    data: { password }
  })
}

export const verifyPasswordLink = async ({ userId, token }) => {
  return await request({ url: `/reset-password/${userId}/${token}` })
}

export const changeUser = async ({ userId, changedData }) => {
  return await request({
    url: `/users/${userId}`,
    method: 'PUT',
    data: changedData
  })
}

export const changeUnavailableDates = async ({ roomId, dates }) => {
  return await request({
    url: `/rooms/availability/${roomId}`,
    method: 'PUT',
    data: { dates }
  })
}

export const fetchRoom = async (roomId) => {
  return await request({ url: `/rooms/${roomId}` })
}

export const createOrder = async (order) => {
  return await request({ url: `/orders`, method: 'POST', data: order })
}

export const sendPayment = async (order) => {
  return await request({
    url: '/payment/create-checkout-session',
    method: 'POST',
    data: { order }
  })
}

export const fetchHotel = async ({ queryKey }) => {
  const hotelId = queryKey[1]
  return await request({ url: `/hotels/find/${hotelId}` })
}

export const fetchProperties = async () => {
  return await request({ url: `/hotels/properties` })
}

export const fetchRandomCities = async ({ queryKey }) => {
  const searchParams = _getSearchParams(queryKey[1])
  return await request({ url: `/hotels/random-cities${searchParams}` })
}

export const fetchAllCities = async () => {
  return await request({ url: `/hotels/cities` })
}

export const createNotifications = async (data) => {
  return await request({
    url: '/notifications',
    method: 'POST',
    data
  })
}

export const fetchHouses = async (params) => {
  const searchParams = _getSearchParams(params.queryKey[1]).toLocaleLowerCase()
  const resParams = params.pageParam
    ? `${searchParams}&page=${params.pageParam}`
    : searchParams
  return await request({ url: `/hotels${resParams}` })
}

const _getSearchParams = (obj) => {
  const res = Object.entries(obj)
    .filter(([_key, value]) => !!value)
    .reduce((prev, [key, value], i) => {
      prev += i === 0 ? `?${key}=${value}` : `&${key}=${value}`
      return prev
    }, '')
  return res
}
