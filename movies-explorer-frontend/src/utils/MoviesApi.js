import { movies_api_url } from './utils.js';

class MoviesApi {
  constructor({ url }) {
    this._url = url;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Возникла ошибка: ${res.status}`);
  }
  
  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(this._getResponse);
  }
}

export const moviesApi = new MoviesApi(movies_api_url);