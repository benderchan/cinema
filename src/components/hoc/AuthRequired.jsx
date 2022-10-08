import { Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'


export const AuthRequired = ({children}) => {
    // const {isAuth} = useSelector(state => state.auth)
    const session = localStorage.getItem('session_id')

    return (
        <>
            {
                !session && <Navigate to={'/auth'}/>
            }
            {children}
        </>
    )
}