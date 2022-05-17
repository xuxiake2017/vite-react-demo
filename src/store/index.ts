import { configureStore } from '@reduxjs/toolkit'
import permissionReducer from './permission'
import userReducer from './user'

const store = configureStore({
  reducer: {
    permission: permissionReducer,
    user: userReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch