import style from './TrendingSlider.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/effect-fade'
import 'swiper/css'

import { Link } from 'react-router-dom'

export const TrendingSlider = ({movies}) => {
    return (
        <Swiper
            className={style.swiper}
            slidesPerView={6}
            grabCursor={true}
            spaceBetween={30}

        >
            {
                movies.map(movie => (
                        <SwiperSlide key={movie.id} className={style.slide} width={'50px'}>
                            <Link to={`/movies/${movie.id}`} state={{...movie}}>
                                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt=''/>
                            </Link>
                        </SwiperSlide>
                    )
                )
            }


        </Swiper>
    )
}