import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const genresApi = createApi({
    reducerPath: 'genresApi',
    baseQuery: fetchBaseQuery({baseUrl: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`}),
    endpoints: (builder) => ({
        getAllGenres: builder.query({
            query: () => ''
        })
    })
})


export const {useGetAllGenresQuery} = genresApi