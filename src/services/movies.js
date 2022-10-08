import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const movieApi = createApi({
    reducerPath: 'movieApi',
    tagTypes: ['Movie'],
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3/'}),
    endpoints: (builder) => ({
        getOneMovie: builder.query({
            query: (movieId) => `movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
            providesTags: ['Movie']

        }),
        getRatedMovies: builder.query({
            query: (sessionId) => `account/{account_id}/rated/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`,
            providesTags: ['Movie']

        }),
        getRatedMovie: builder.query({
            query: (sessionId) => `account/{account_id}/rated/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`
            ,
            providesTags: ['Movie']

        }),
        getMovieVideo: builder.query({
            query: (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        }),
        getSimilarMovies: builder.query({
            query: (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        }),
        rateMovie: builder.mutation({
            query: ({id, sessionId, vote}) => ({

                url: `movie/${id}/rating?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`,
                method: 'POST',
                body: vote
            }),
            invalidatesTags: ['Movie']
        })
    })
})


export const {
    useGetOneMovieQuery,
    useRateMovieMutation,
    useGetRatedMoviesQuery,
    useGetMovieVideoQuery,
    useGetSimilarMoviesQuery
} = movieApi