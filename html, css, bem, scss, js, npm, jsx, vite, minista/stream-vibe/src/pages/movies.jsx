import MoviesBanner from "@/sections/MoviesBanner";
import Collections from "@/sections/Collections";

export const metadata = {
    title: 'Movies & Shows',
}

export default () => {
    return (
        <>
            <MoviesBanner />
            <Collections />
        </>
    )
}