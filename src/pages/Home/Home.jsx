import style from './Home.module.scss'

import { FilmSlider } from '../../components/FilmSlider/FilmSlider'
import { TrendingSlider } from '../../components/TrendingSlider/TrendingSlider'
import { ActorsSlider } from '../../components/ActorsSlider/ActorsSlider'

import { useGetOneMovieQuery, useGetSimilarMoviesQuery } from '../../services/movies'

export const Home = () => {


    const session = localStorage.getItem('session_id')
    const {data, isLoading} = useGetOneMovieQuery(100)
    const {data: similar, isLoading: similarLoading} = useGetSimilarMoviesQuery(data?.id)

    if (isLoading) return 'Loading data'
    return (
        <div className={style.home}>
            {
                session ? <div className={'cursor-pointer'}>
                    <span className={'text-white'}>{data.title} </span>
                    <img src='' alt=''/>
                    <img className={'rounded-2xl'}
                         src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`} alt=''/>
                </div> : 'You must be logged to see'

            }

            <h1>Watch movies online</h1>
            <FilmSlider/>
            {
                similarLoading ? 'Loading...' : <div>
                    <h3>Similar movies</h3>
                    <TrendingSlider movies={similar.results}/>
                </div>
            }

            <h3>Best actors</h3>
            <ActorsSlider/>
        </div>
    )
}