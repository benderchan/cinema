import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3/'}),
    endpoints: (builder) => ({
        getMyAccount: builder.query({
            query: (sessionId) => `account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`
        })

    })
})


export const {useGetMyAccountQuery} = accountApi