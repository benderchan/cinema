export const Select = ({options = [], ...props}) => {

    return (
        <select
            className={'rounded-xl'}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
        >
            {options.map(option => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}

        </select>
    )
}