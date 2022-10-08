import style from './MenuLinks.module.scss'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { IconContext } from 'react-icons'
import classNames from 'classnames'


export const MenuLinks = ({links}) => {
    const location = useLocation()
    return (
        <div className={style.navigation}>
            <ul className={style.block}>
                {
                    links.map(el => {
                        return (
                            <NavLink to={el.path} key={el.path} state={el.name}
                            >
                                <li className={classNames(style.link, {
                                    'border-r-3  border-r-primaryRed text-white': location.pathname === el.path

                                })}>
                                    <IconContext.Provider
                                        value={{color: location.pathname === el.path ? 'red' : ''}}>
                                        {el.icon}
                                    </IconContext.Provider>
                                    <h3 className={'pl-2'}>{el.name}</h3>
                                </li>
                            </NavLink>
                        )
                    })
                }
            </ul>
        </div>
    )
}