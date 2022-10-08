import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3/authentication/'}),
    endpoints: (builder) => ({
        registerApi: builder.query({
            query: () => `token/new?api_key=${process.env.REACT_APP_API_KEY}`
        }),
        loginApi: builder.mutation({
            query: (token) => ({
                url: `session/new?api_key=${process.env.REACT_APP_API_KEY}`,
                method: 'POST',
                body: token
            })
        }),
        logoutApi: builder.mutation({
            query: (sessionId) => ({
                url: `session?api_key=${process.env.REACT_APP_API_KEY}`,
                method: 'DELETE',
                body: sessionId
            })
        })
    })
})


export const {useRegisterApiQuery, useLoginApiMutation, useLogoutApiMutation} = authApi