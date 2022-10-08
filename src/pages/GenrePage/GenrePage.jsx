import { useLocation, useParams } from 'react-router-dom'
import { Modal } from '../../components/Modal/Modal'
import { useState } from 'react'
import { useGetMoviesByGenreQuery } from '../../services/discover'


export const GenrePage = () => {


    const location = useLocation()
    const params = useParams()

    const {data: moviesByGenre = {}} = useGetMoviesByGenreQuery(params.genre)

    return (
        <div>

            <h1 className={'mb-10'}>{location.state}</h1>
            {
                moviesByGenre.results &&
                moviesByGenre.results.map(el => (
                    <div className={'flex justify-between my-2 border-b-2 py-2'}>
                        <div className={'flex gap-2'}>
                            <span className={'text-white'}>{el.title}</span> |
                            <span>{el.release_date}</span>

                        </div>

                        <Modal key={el.original_title}  {...el}/>
                    </div>

                ))

            }

        </div>
    )
}