import { useLazyGetPopularMoviesQuery } from '../../services/discover'
import { useEffect, useState } from 'react'
import { useGetAllGenresQuery } from '../../services/genres'
import { Button } from '../ui/Button/Button'
import { Link } from 'react-router-dom'
import { Input } from '../ui/Input/Input'
import { Select } from '../ui/Select/Select'


export const SearchBy = () => {


    const [searchParams, setSearchParams] = useState(JSON.parse(localStorage.getItem('movie_state')) || {
        sort: 'popularity',
        year: '2022',
        page: 1,
        vote: 7,
        genreId: 28
    }
    )


    const [trigger, {isLoading, isError, data, error}, lastPromiseInfo] = useLazyGetPopularMoviesQuery(searchParams)

    useEffect(() => {
        trigger(searchParams)
    }, [searchParams.page])

    const fetchMovies = () => {
        trigger(searchParams)
        setSearchParams({...searchParams, page: 1})
    }

    const setLocalState = () => {
        localStorage.setItem('movie_state', JSON.stringify(searchParams))
        console.log(searchParams)
    }

    const resetFilter = (e) => {
        e.preventDefault()
        setSearchParams({
            sort: 'popularity',
            year: '2022',
            page: 1,
            vote: 7,
            genreId: 28
        })

    }

    useEffect(() => {
        setLocalState()
    }, [searchParams])

    const {data: genres = []} = useGetAllGenresQuery()


    let buttons = () => {
        let arr = []
        for (let i = 1; i < data?.total_pages + 1; i++) {
            arr.push(i)
        }
        return arr
    }
    const movieButtons = buttons()

    const changePage = (e, page) => {
        e.preventDefault()
        setSearchParams({...searchParams, page: page})
        trigger(searchParams)
    }

    return (

        <div className={'text-center pb-10'}>
            <h1>Search page</h1>
            <div className={'flex flex-col items-center gap-2 justify-center'}>
                <div>
                    Set year:
                    <div className={'w-40 overflow-hidden'}>
                        <Input
                            type='text'
                            placeholder={'year...'}
                            value={searchParams.year}
                            onChange={(e) =>
                                setSearchParams({...searchParams, year: e.target.value})
                            }
                        />
                    </div>

                </div>
                <div>
                    Select genre:
                    <Select
                        value={searchParams.genreId}
                        onChange={(id) => setSearchParams({...searchParams, genreId: id})}
                        options={genres.genres}
                    />
                </div>


                <div>
                    Select rating:
                    <Select
                        value={searchParams.vote}
                        onChange={(vote) => setSearchParams({...searchParams, vote: vote})}
                        options={[
                            {id: 1, name: 1},
                            {id: 2, name: 2},
                            {id: 3, name: 3},
                            {id: 4, name: 4},
                            {id: 5, name: 5},
                            {id: 6, name: 6},
                            {id: 7, name: 7},
                            {id: 8, name: 8},
                            {id: 9, name: 9},
                            {id: 10, name: 10}
                        ]}
                    />

                </div>

                <div className={'flex gap-2 mt-5'}>
                    <Button onClick={fetchMovies}>Search</Button>
                    <Button onClick={resetFilter}>Reset</Button>
                </div>

            </div>


            <div className={'flex flex-wrap items-center justify-center py-10'}>
                {
                    isLoading
                        ?
                        <div>Loading...</div>
                        :
                        data?.results.map((el) => (
                                <Link key={el.id} to={`/movies/${el.id}`} state={{...el}}>
                                    <div
                                        className={'h-100 w-52 flex flex-col justify-center m-5 cursor-pointer'
                                        }
                                    >
                                        <img
                                            className={'h-3/4 w-30 rounded-md'}
                                            src={
                                                `https://image.tmdb.org/t/p/original/${el.poster_path}`
                                            }
                                            alt=''
                                        />
                                        <div className={'my-2 truncate'}>
                                            <span className={'text-white'}>{el.title} </span> |{' '}
                                            {el.release_date}
                                        </div>
                                    </div>
                                </Link>
                            )
                        )}


            </div>
            {movieButtons.map((b, idx) => (
                <div key={idx} className={'inline-flex mx-1 rounded-full overflow-hidden'}>
                    <Button
                        disabled={b === searchParams.page}
                        onClick={(e) => changePage(e, b)}
                    >
                        {b}
                    </Button>
                </div>
            ))}
        </div>
    )
}
