import { createSlice } from "@reduxjs/toolkit";

const authInitialState = { userId: null, username: null }

const authSlice = createSlice({
     name: 'auth',
     initialState: authInitialState,
     reducers: {
          authenticate(state, action) {
               state.userId = action.payload
          },
          logout(state) {
               state.userId = null
          },
          setUsername(state, action) {
               state.username = action.payload
          },
          clearUsername(state) {
               state.username = null
          }
     }
})

export const authActions = authSlice.actions
export default authSlice.reducer