import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Post, User } from './types'

export const JSONPlaceholderApi = createApi({
  reducerPath: 'JSONPlaceholderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com'
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      query: () => '/posts'
    }),
    getUsers: builder.query<User[], void>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      query: () => '/users'
    })
  })
})

export const {
  useGetPostsQuery,
  useGetUsersQuery
} = JSONPlaceholderApi
