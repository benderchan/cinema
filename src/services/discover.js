import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const discoverApi = createApi({
    reducerPath: 'discoverApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3/discover/'}),
    endpoints: (builder) => ({
        getMoviesByGenre: builder.query({
            query: (genreId) => `movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`
        }),
        getPopularMovies: builder.query({
            query: ({
                        sort = 'popularity',
                        year = 2022,
                        page = 1,
                        vote = null,
                        genreId = ''

                    }) => `/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=${sort}.desc&include_adult=false&include_video=false&page=${page}&primary_release_year=${year}&with_genres=${genreId}&vote_average.gte=${vote}&with_watch_monetization_types=flatrate`

        })
    })
})


export const {useGetMoviesByGenreQuery, useLazyGetPopularMoviesQuery} = discoverApi