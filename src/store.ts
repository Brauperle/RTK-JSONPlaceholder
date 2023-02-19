import { configureStore } from '@reduxjs/toolkit'
import { JSONPlaceholderApi } from './api'

export const store = configureStore({
  reducer: {
    [JSONPlaceholderApi.reducerPath]: JSONPlaceholderApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(JSONPlaceholderApi.middleware)
})
