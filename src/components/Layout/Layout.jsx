import { Navigation } from '../Navigation/Navigation'
import { SideBar } from '../SideBar/SideBar'

import style from './Layout.module.scss'

export const Layout = ({children}) => {
    return (
        <div className={style.layout}>
            <Navigation/>
            <div className={style.children}>
                {children}
            </div>
            <SideBar/>
        </div>
    )
}