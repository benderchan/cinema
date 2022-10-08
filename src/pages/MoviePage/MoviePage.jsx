import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button/Button'
import { useGetMovieVideoQuery } from '../../services/movies'


export const MoviePage = () => {

    const {id} = useParams()
    const {state} = useLocation()
    const {data = [], isLoading} = useGetMovieVideoQuery(id)

    const navigate = useNavigate()
    const goBackPage = (e) => {
        e.preventDefault()
        navigate(-1)
    }


    console.log(data)

    if (isLoading) return 'No data yet...'
    return (
        <div>
            <h1 className={'text-[white] my-3'}>{state.title} </h1>
            <p className={'my-3'}>
                Drama: {state.overview}
            </p>

            {
                data.results.length ?
                    <div className={'overflow-hidden pb-[56%] relative h-0 mb-10'}>
                        <iframe
                            className={'w-full h-full absolute top-0 left-0'}
                            src={`https://www.youtube.com/embed/${data.results[0].key}`}
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;'
                            allowFullScreen
                            title='Embedded youtube'
                        />

                    </div>

                    : <img src={`https://image.tmdb.org/t/p/original/${state.backdrop_path}`} alt=''/>

            }


            <Button onClick={goBackPage}>
                Go back
            </Button>
        </div>
    )
}