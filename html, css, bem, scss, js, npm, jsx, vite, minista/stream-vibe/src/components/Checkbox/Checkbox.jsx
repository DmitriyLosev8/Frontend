import './Checkbox.scss'
import classNames from 'classnames'
import getIdFromTitle from "@/utils/getIdFromTitle";

const Checkbox = (props) => {
    const {
        className,
        id = getIdFromTitle(props.label),  //преобразование label в идентификатор,
        label,
        isRequired,
    } = props

    return (
        <label
            className={classNames(className, 'checkbox')}
            htmlFor={id}
        >
            <input
                className='checkbox__input'
                id={id}
                type="checkbox"
                required={isRequired}
            />
            <span className="checkbox__label">{label}</span>
        </label>
    )
}

export default Checkbox