import style from './FilmSlider.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/effect-fade'
import 'swiper/css'

import Slide1 from '../../assets/slide1.jpg'
import Slide2 from '../../assets/slide2.jpg'
import Slide3 from '../../assets/slide3.jpg'

export const FilmSlider = () => {
    return (
        <Swiper
            slidesPerView={1}
            className={style.swiper}
        >
            <SwiperSlide className={style.slide}>
                <img src={Slide1} alt=''/>
            </SwiperSlide>
            <SwiperSlide className={style.slide}>
                <img src={Slide2} alt=''/>
            </SwiperSlide>
            <SwiperSlide className={style.slide}>
                <img src={Slide3} alt=''/>
            </SwiperSlide>

        </Swiper>

    )
}