import './MovieCard.scss'
import {Image} from "minista";
import Badge from "@/components/Badge";
import RatingView from "@/components/RatingView";

const MovieCard = (props) => {
    const {
        title,
        imgSrc,
        duration,
        views,
        released,
        rating,
        season,
        href = '/movie'
    } = props

    return (
        <a
            className='movie-card'
            href={href}
            title={title}
        >
            <h3 className="visually-hidden">{title}</h3>
            <Image
                src={imgSrc}
                className='movie-card__image'
            />
            <div className="movie-card__body">
                {duration && (
                    <Badge
                        iconName='clock'
                        iconAriaLabel='Duration'
                        hasFillIcon
                    >
                        {duration}
                    </Badge>
                )}

                {season && (
                    <Badge
                        iconName='catalog'
                        iconAriaLabel='Number of season'
                        hasFillIcon
                    >
                        {season}
                    </Badge>
                )}

                {rating && (
                    <Badge className='movie-card__rating-badge'>
                        <RatingView  {...rating} />

                    </Badge>
                )}

                {views && (
                    <Badge
                        iconName='eye'
                        iconAriaLabel='Views'
                        hasFillIcon
                    >
                        {views}
                    </Badge>
                )}

                {released && (
                    <Badge className='movie-card__released-badge'>
                        Released at <time dateTime={released.dataTime} className='movie-card__released-badge-label'>{released.label}</time>
                    </Badge>
                )}
            </div>
        </a>
    )
}

export default MovieCard