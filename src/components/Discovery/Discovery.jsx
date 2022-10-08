import style from './Discovery.module.scss'
import Img1 from '../../assets/slide1.jpg'
import Img2 from '../../assets/slide2.jpg'
import Img3 from '../../assets/slide3.jpg'
import { useGetAllGenresQuery } from '../../services/genres'

import { Link } from 'react-router-dom'

export const Discovery = () => {

    const {data, isLoading} = useGetAllGenresQuery()


    console.log(data)

    if (isLoading) return 'Loading...'
    return (
        <>

            <h1>Discovery</h1>
            <p>In this section you will find all genres on our site</p>
            <div className={style.discovery}>

                {
                    data.genres.map((el) => (
                        <Link className={style.card} key={el.id} to={`/genre/${el.id}`} state={el.name}>
                            <div>
                                <div className={'absolute h-full w-full top-0 left-0 hover:bg-black hover:opacity-70'}>
                                    <span>{el.name}</span>
                                </div>
                                <img src={el.id % 2 === 0 ? Img1 : Img2} alt=''/>
                            </div>
                        </Link>

                    ))
                }
            </div>
        </>
    )
}