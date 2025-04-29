import './Content.scss'
import classNames from "classnames";

const Content = (props) => {  //передаём подготовленное содержимое
    const {
        children,
        isResetPaddingTop = false,
    } = props //деструктурируем переданное

    return (
        <main className={classNames('content', {
            'content--reset-padding-top': isResetPaddingTop,
        })}>
            {children}
        </main>)  //выводим это содержимое
}

export default Content
