import MovieBannerCard from "@/components/MovieBannerCard";

const ShowBanner = () => {
   const titleId = 'show-banner-title'

    return (
        <section className='container' aria-labelledby={titleId}>
            <MovieBannerCard
                title='Stranger Things'
                titleId={titleId}
                TitleTag='h1'
                description='When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.'
                imgSrc='/src/assets/images/movie-banner/3.jpg'
                isSmallPaddingY
            />
        </section>
    )
}

export default ShowBanner