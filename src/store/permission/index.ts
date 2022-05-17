import { createSlice } from '@reduxjs/toolkit'

export const permissionSlice = createSlice({
  name: 'permission',
  initialState: {
    permissionCodes: [],
  },
  reducers: {
    setPermissionCodes: (state, action) => {
      state.permissionCodes = action.payload
    },
  },
})

export const { setPermissionCodes } = permissionSlice.actions

export default permissionSlice.reducer