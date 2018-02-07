import apiKey from './apiKey.js';

const fetchApi = async() => {    
  try {
    const initalFetch = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
    const movieData = await initalFetch.json();
    return cleanData(movieData.results);
    
  } catch (error) {
    throw new Error('error');
  }
}

const cleanData = (movieArray) => {
  return movieArray.map(movie => ({
    title: movie.title,
    date: movie.release_date,
    overview: movie.overview,
    poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
    backdrop: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
    id: movie.id
  }));
};

export default fetchApi;