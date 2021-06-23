import { apiSettings } from "./constants";

class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  login({ password, email }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => this._getResponseData(res))
      .then(({ token }) => {
        localStorage.setItem("token", token);
      });
  }

  register({ password, email }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    }).then((res) => this._getResponseData(res));
  }

  getUser() {
    const token = localStorage.getItem("token");

    if (!token) return null;

    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => this._getResponseData(res))
      .catch((e) => localStorage.removeItem("token"));
  }
}

const api = new AuthApi({
  baseUrl: apiSettings.authUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;