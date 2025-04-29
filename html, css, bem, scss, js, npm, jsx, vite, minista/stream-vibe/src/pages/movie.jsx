import MovieBanner from "@/sections/MovieBanner";
import MovieDetails from "@/sections/MovieDetails";


export const metadata = {
    title: 'Movie - Kantara',
}

export default () => {
    return (
        <>
            <MovieBanner />
            <MovieDetails />
        </>
    )
}