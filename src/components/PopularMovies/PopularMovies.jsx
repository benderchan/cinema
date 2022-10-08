import { Button } from '../ui/Button/Button'
import style from './PopularMovies.module.scss'
import { AiFillStar } from 'react-icons/ai'
import { useEffect, useMemo, useState } from 'react'
import { useLazyGetPopularMoviesQuery } from '../../services/discover'
import { Input } from '../ui/Input/Input'
import { Link } from 'react-router-dom'

export const PopularMovies = () => {
    const [inputValue, setInputValue] = useState('')

    const [popular, setPopular] = useState([])
    const [filterPopular, setFilterPopular] = useState([])

    const [trigger, {isLoading, isError, data, error}, lastPromiseInfo] = useLazyGetPopularMoviesQuery({
        sort: 'popularity',
        year: new Date().getYear(),
        page: 1,
        vote: 7
    })

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }


    const randomPage = useMemo(() => randomNumber(1, 30), [])


    useEffect(() => {

        trigger({
            sort: 'popularity',
            year: new Date().getYear(),
            page: randomPage,
            vote: 7
        })
        console.log(data?.results)
        if (!isLoading) {
            setPopular(data?.results)
            setFilterPopular(
                popular?.filter((el) =>
                    el.title.toLowerCase().includes(inputValue.toLowerCase())
                )
            )
        }
    }, [inputValue, data])

    const getFilterPopular = () => {
        if (inputValue) {
            return filterPopular
        } else return popular
    }
    const sortedMovies = getFilterPopular()

    return (
        <div className={style.popular}>
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={'Search...'}
            />
            <div>Popular movies</div>

            {sortedMovies &&
                sortedMovies.slice(0, 4).map((el) => (
                    <div key={el.id} className={'my-4 w-52 h-32 flex'}>
                        <Link to={`/movies/${el.id}`} state={{...el}}>
                            <img
                                className={'rounded-md max-h-full w-full  cursor-pointer'}
                                src={
                                    `https://image.tmdb.org/t/p/original/${el.poster_path}` || ''
                                }
                                alt=''
                            />
                        </Link>

                        <div className={'flex flex-col p-3 '}>
                            <p className={'truncate w-20 '}>{el.title}</p>
                            <p className={'text-xs text-textGray'}>{el.release_date}</p>
                            <div className={'flex mt-auto'}>
                                <AiFillStar className={'fill-yellow'}/>
                                <span className={'text-xs ml-1'}>{el.vote_average}</span>
                            </div>
                        </div>

                    </div>
                ))}
            <Link to={'/movies'}>
                <Button>See more</Button>
            </Link>

        </div>
    )
}
