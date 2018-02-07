//Add Favorites
//Toggle Favorites
//Set Filter

const updateMovie = (movie) => ({
    type: 'UPDATE_MOVIE',
    title: movie.title,
    date: movie.release_date,
    overview: movie.overview,
    poster: movie.poster_path,
    backdrop: movie.backdrop_path,
    id: movie.id
})

export default updateMovie;