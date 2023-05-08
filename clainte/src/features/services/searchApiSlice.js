import { authApi } from '../auth/authApi'

export const searchApi = authApi.injectEndpoints({
  tagTypes: ['items-by-search'],
  endpoints: (builder) => ({
    searchItems: builder.query({
      query: ({ search }) => `service/search/?${search}`,
      providesTags: ['items-by-search'],
    }),
    filterItems: builder.query({
      query: ({ filter }) => `service/filter/?${filter}`,
      providesTags: ['items-by-filter'],
    }),
  }),
})

export const { useSearchItemsQuery, useFilterItemsQuery } = searchApi
