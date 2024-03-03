import { main_api_url, movies_api_url } from './utils.js';

class MainApi {
  constructor({ url }) {
    this._url = url;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Возникла ошибка: ${res.status}`);
  }

  patchUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        name: data.name, 
        email: data.email,
      }),
    })
      .then(this._getResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(this._getResponse);
  }

  getSaveMovies() {
    return fetch(`${this._url}/movies`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(this._getResponse);
  }

  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${movies_api_url.url}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${movies_api_url.url}${movie.thumbnail}` ,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      }),
      method: "POST",
    })
      .then(this._getResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      method: 'DELETE',
    })
      .then(this._getResponse);
  }
}

export const mainApi = new MainApi(main_api_url);