import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authUser: (state, action) => {
            state.isAuth = action.payload
        }
    }
})

export const {authUser} = authSlice.actions

export default authSlice.reducer