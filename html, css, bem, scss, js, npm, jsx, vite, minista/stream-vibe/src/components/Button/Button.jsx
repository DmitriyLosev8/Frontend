import './Button.scss'
import classNames from 'classnames'
import Icon from "@/components/Icon";


const Button = (props) => {
    const {
        className,
        type = 'button',
        href,
        target,

        mode = '', //пустая строка - это default, можно передать 'transparent', 'black-10', black-08, black-06
        label,
        isLabelHidden = false,
        iconName,
        iconPosition = 'before', //либо  before либо after
        hasFillIcon,
        extraAttrs,
    } = props

    const isLink = href !== undefined
    const Component = isLink ? 'a' : 'button'
    const linkProps = { href, target }
    const buttonProps = { type }
    const specificProps = isLink ? linkProps : buttonProps
    const title = isLabelHidden ? label : undefined
    const iconComponent = iconName && (
        <Icon
            className = "button__icon"
            name={iconName}
            hasFill={hasFillIcon}
        />
    )


    return ( //будут разные пропсы в зависимости ссылка это или кнопка
        <Component
            className={classNames(className, 'button', {
                [`button--${mode}`]: mode,  //это динамический бэм модификатор
                //если mode не передали, то модификатор не добавится
            })}
            title={title}
            aria-label={title}
            {...specificProps}
            {...extraAttrs}
        >
            {iconPosition === 'before' && iconComponent}
            {!isLabelHidden && (
                <span className="button__label">{label}</span>
            )}
            {iconPosition === 'after' && iconComponent}
        </Component>
    )
}

export default Button