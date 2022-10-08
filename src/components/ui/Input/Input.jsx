import style from './Input.module.scss'


export const Input = ({...props}) => {

    return (
        <input
            className={style.input} {...props}/>
    )
}