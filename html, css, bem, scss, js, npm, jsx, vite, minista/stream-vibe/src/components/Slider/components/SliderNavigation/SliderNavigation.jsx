import './SliderNavigation.scss'
import classNames from 'classnames'
import Button from "@/components/Button";

const SliderNavigation = (props) => {
    const {
        className,
        id,
        hasPagination = true,
        mode = '', //пустая строка по дефолту, можно передать 'tile', 'rounded'
        position = '', // '' - по дефолту, можно передать "abs=bottom"
        isHiddenMobile,
        buttonMode = 'black-10',
        justifyContent,
    } = props

    return (
        <div
            className={classNames(className, 'slider-navigation', {
                [`slider-navigation--${mode}`]: mode,
                [`slider-navigation--${position}`]: position,
                'hidden-mobile': isHiddenMobile,
                [`slider-navigation--${justifyContent}`]: justifyContent
            })}
            id={id}
            data-js-slider-navigation=""
        >
            <Button
                className="slider-navigation__arrow-button slider-navigation__arrow-button--previous"
                mode={buttonMode}
                iconName="arrow-left"
                label="Previous slide"
                isLabelHidden
                extraAttrs={{
                    'data-js-slider-previous-button': '',
                }}
            />
            {hasPagination && (
                <div
                    className="slider-navigation__pagination"
                    data-js-slider-pagination=""
                />
            )}
            <Button
                className="slider-navigation__arrow-button slider-navigation__arrow-button--next"
                mode={buttonMode}
                iconName="arrow-right"
                label="Next slide"
                isLabelHidden
                extraAttrs={{
                    'data-js-slider-next-button': '',
                }}
            />
        </div>
    )
}

export default SliderNavigation