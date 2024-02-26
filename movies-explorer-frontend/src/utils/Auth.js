class Auth {
  constructor({ url }) {
    this._url = url;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Возникла ошибка: ${res.status}`);
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    .then(this._getResponse);
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(this._getResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
  }
  
  checkToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    })
    .then(this._getResponse);
  }
};

const main_api_url = {
  url: "https://api.movies-altapov.nomoredomainsmonster.ru"
};

export const auth = new Auth(main_api_url);