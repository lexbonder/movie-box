import apiKey from './apiKey.js';

export const fetchApi = async () => {
  try {
    const initalFetch = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
    );
    const movieData = await initalFetch.json();
    return cleanData(movieData.results);
  } catch (fetchApiError) {
    throw new Error('error');
  }
};

export const cleanDate = date => {
  const splitDate = date.split('-');
  return splitDate[0];
};

export const cleanData = movieArray => {
  return movieArray.map(movie => ({
    title: movie.title,
    vote_average: movie.vote_average,
    release_date: cleanDate(movie.release_date),
    overview: movie.overview,
    poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    movie_id: movie.id
  }));
};

export const createUser = async userInfo => {
  try {
    const reply = await fetch('/api/users/new', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const returnedObject = await reply.json()
    return returnedObject;
  } catch (createUserError) {
    return createUserError;
  }
};

export const returningUser = async id => {
  try {
    const reply = await fetch('/api/users');
    const allUsersArray = await reply.json();
    return allUsersArray.data.find(user => user.id === parseInt(id, 10));
  } catch (returningUserError) {
    return 'Network Error';
  }
};

export const userLogin = async ({ password, email }) => {
  try {
    const reply = await fetch('/api/users');
    const allUsersArray = await reply.json();
    const currentUser = allUsersArray.data.find(
      user => user.email === email && user.password === password
    );
    if (!currentUser) {
      return 'E-mail and/or Password do not match';
    } else {
      return currentUser;
    }
  } catch (loginError) {
    return 'It are broked';
  }
};

export const getFavArray = async id => {
  try {
    const reply = await fetch(`/api/users/${id}/favorites/`);
    const returnedObject = await reply.json();
    return returnedObject;
  } catch (getFavArrayError) {
    return getFavArrayError;
  }
};

export const removeFavorite = async (fav_id, user_id) => {
  try {
    const reply = await fetch(`/api/users/${user_id}/favorites/${fav_id}`, {
      method: 'DELETE'
    });
    const returnedObject = await reply.json();
    return returnedObject;
  } catch (removeFavError) {
    return removeFavError;
  }
};

export const addFavorite = async newFav => {
  try {
    const reply = await fetch('/api/users/favorites/new', {
      method: 'POST',
      body: JSON.stringify(newFav),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const returnedObject = await reply.json();
    return returnedObject;
  } catch (addFavError) {
    return addFavError;
  }
};

export default fetchApi;
