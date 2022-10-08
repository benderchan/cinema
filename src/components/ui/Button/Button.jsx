import style from './Button.module.scss'

export const Button = ({children, ...props}) => {
    return (
        <button {...props} className={style.button}>{children}</button>
    )
}