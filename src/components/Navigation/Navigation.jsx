import {
    AiOutlineHome,
    AiOutlineCompass,
    AiOutlineThunderbolt,
    AiOutlineSmile,
    AiOutlineTeam,
    AiOutlineExperiment,
    AiOutlineAliwangwang,
    AiOutlineSetting,
    AiOutlineLogin,
    AiOutlineLogout,
    AiOutlineLock
} from 'react-icons/ai'

import style from './Navigation.module.scss'
import { MenuLinks } from '../MenuLinks/MenuLinks'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { authUser } from '../../redux/slices/authSlice'


const menuLinks = [
    {name: 'Home', path: '/', icon: <AiOutlineHome/>},
    {name: 'Discovery', path: '/genre', icon: <AiOutlineCompass/>},
    {name: 'Movies', path: '/movies', icon: <AiOutlineThunderbolt/>}


]

const genresLinks = [
    {name: 'Action', path: 'genre/28', icon: <AiOutlineSmile/>},
    {name: 'Animation', path: 'genre/16', icon: <AiOutlineTeam/>},
    {name: 'Fantasy', path: 'genre/14', icon: <AiOutlineExperiment/>},
    {name: 'Music', path: 'genre/10402', icon: <AiOutlineAliwangwang/>}
]

const generalLinks = [
    {name: 'Auth', path: '/auth', icon: <AiOutlineLogin/>},
    {name: 'Profile', path: '/me', icon: <AiOutlineSetting/>}
]

const loggedLink = [
    {name: 'Profile', path: '/me', icon: <AiOutlineSetting/>},
    {name: 'Logout', path: '/logout', icon: <AiOutlineLogout/>}
]


export const Navigation = () => {

    const {isAuth} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        const session = localStorage.getItem('session_id')
        if (session) {
            dispatch(authUser(true))

        }
    }, [isAuth])


    return (
        <div className={style.navigation}>
            <img className={'p-5'} src='' alt='My logo'/>
            <span className={'font-bold'}>MENU</span>
            <MenuLinks links={menuLinks}/>
            <span className={'font-bold'}>GENRES</span>
            <MenuLinks links={genresLinks}/>
            <span className={'font-bold'}>GENERAL</span>
            {
                isAuth ? <MenuLinks links={loggedLink}/> : <MenuLinks links={generalLinks}/>
            }


        </div>
    )
}