import { Swiper, SwiperSlide } from 'swiper/react'
import style from './ActorsSlider.module.scss'

import Slide1 from '../../assets/Depp.jpg'
import Slide2 from '../../assets/DiCaprio.jpg'
import Slide3 from '../../assets/TomCruise.jpg'


export const ActorsSlider = () => {

    return (
        <Swiper
            slidesPerView={3}
            className={style.swiper}
        >

            {[1, 2, 3].map((el, idx) => (
                <SwiperSlide className={style.slide} key={el.id}>
                    <img src={Slide2} alt=''/>
                </SwiperSlide>
            ))
            }
        </Swiper>

    )
}