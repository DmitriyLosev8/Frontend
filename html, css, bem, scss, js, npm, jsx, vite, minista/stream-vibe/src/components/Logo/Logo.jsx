import './Logo.scss'
import classNames from 'classnames'
import logoImgSrc from '@/assets/images/logo.svg'


const Logo = (props) => {
   const {
       className,
       loading = 'lazy' } = props
    const title = 'Home'

    return (
        <a href="/"
           className={classNames(className, 'logo')}
        title={title}
        aria-label={title}>
            <img
                src={logoImgSrc}
                 alt=""
                 width={199}
                 height={60}
                 loading={loading}
                 className="logo__image"/>
        </a>
    )
}

export default Logo