import { setCredentials, logOut } from '../../features/auth/authSlice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const SERVER_HOST = 'https://django-react-ecommerce-woad.vercel.app/'

export const refreshAccessToken = async (store) => {
  if (store.getState().auth?.refresh) {
    let response = await fetch(SERVER_HOST + 'account/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        refresh: store.getState().auth?.refresh,
      }),
    })
    let data = await response.json()

    if (response.status === 200) {
      store.dispatch(setCredentials(data))
    } else if (response.status === 401) {
      store.dispatch(logOut())
    }
    return response
  }
  return { error: 'Unauthorize!' }
}

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_HOST,
  prepareHeaders: (headers, { getState, extra }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})
const baseQueryWithReOauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    let response = await refreshAccessToken(api)
    if (
      response &&
      !response.error &&
      response?.status >= 200 &&
      response?.status <= 399
    ) {
      return await baseQuery(args, api, extraOptions)
    } else {
      // throw Error([{ error: "Unauthorize!" }]);
      return result
    }
  } else {
    if (result?.error) {
      if (result?.error?.status === 400) {
        return result
      }
      console.log(result)
      return result
    } else {
      return result
    }
  }
}

export const authApi = createApi({
  baseQuery: baseQueryWithReOauth,
  endpoints: (builder) => ({}),
})
