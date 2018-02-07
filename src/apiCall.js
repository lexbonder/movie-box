import apiKey from './apiKey.js';
import updateMovie from './actions'

const fetchApi = async() => {    
  try {
    const initalFetch = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
    const movieData = await initalFetch.json();
    movieData.results.map(movie => {
      updateMovie(movie)
    })
    
  } catch (error) {
    throw new Error('error');
  }
}

const cleanData = (movieArray) => {

}

export default fetchApi;