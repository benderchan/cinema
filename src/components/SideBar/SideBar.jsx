import style from './SideBar.module.scss'
import { PopularMovies } from '../PopularMovies/PopularMovies'


export const SideBar = () => {
    return (
        <div className={style.sidebar}>
            <PopularMovies/>
        </div>
    )
}