import { Button } from '../../components/ui/Button/Button'
import {
    useLoginApiMutation,
    useLogoutApiMutation,
    useRegisterApiQuery
} from '../../services/auth'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { authUser } from '../../redux/slices/authSlice'

export const AuthPage = () => {
    const dispatch = useDispatch()

    const {data} = useRegisterApiQuery()
    const [logUser] = useLoginApiMutation()
    const [logoutUser] = useLogoutApiMutation()

    const [reqToken, setReqToken] = useState('')
    const [sessionId, setSessionId] = useState('')

    useEffect(() => {
        const tk = localStorage.getItem('request_token')
        const sess = localStorage.getItem('session_id')

        setReqToken(tk)
        setSessionId(sess)
    }, [])

    useEffect(() => {
        window.localStorage.setItem('request_token', reqToken)
        window.localStorage.setItem('session_id', sessionId)
    }, [reqToken, sessionId])

    const requestToken = (e) => {
        e.preventDefault()
        if (data) {
            setReqToken(data.request_token)
            window.open(
                `https://www.themoviedb.org/authenticate/${data.request_token}`
            )
        }
    }

    const handleLogin = () => {
        logUser({request_token: reqToken})
            .unwrap()
            .then((data) => setSessionId(data.session_id))
            .then(dispatch(authUser(true)))
    }
    const handleLogout = (e) => {
        logoutUser({session_id: sessionId})
            .unwrap()
            .then(dispatch(authUser(false)))
        localStorage.clear()
        setSessionId('')
        setReqToken('')
    }

    return (
        <div className={'flex gap-4 justify-center mt-20'}>
            <Button
                disabled={reqToken}
                className={reqToken && 'text-black'}
                onClick={requestToken}
            >
                {' '}
                Request token
            </Button>
            <Button
                disabled={!reqToken || (reqToken && sessionId)}
                className={reqToken && 'bg-black'}
                onClick={handleLogin}
            >
                {' '}
                Login{' '}
            </Button>
            <Button
                disabled={!sessionId}
                className={reqToken && 'bg-black'}
                onClick={handleLogout}
            >
                {' '}
                Logout{' '}
            </Button>
        </div>
    )
}
