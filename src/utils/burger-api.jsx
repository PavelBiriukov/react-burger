import { deleteCookie, getCookie, setCookie } from "./utils";

const baseURL = 'https://norma.nomoreparties.space/api/'


export const checkReponse = (res) => {
  return res.ok ?
    res.json() :
    res.json()
      .then((err) => {
        if (err.message === 'jwt malformed' || err.message === 'jwt expired') {
          updateToken(localStorage.getItem('refreshToken'))
          .then(res => {
            deleteCookie('token');
            const accessToken = res.accessToken.split('Bearer ')[1];
            const refreshToken = res.refreshToken;
            setCookie('token', accessToken, { 'max-age': 1200, path: '/' });
            localStorage.setItem('refreshToken', refreshToken);
            return res;
          });
        }
        Promise.reject(err);
      });
};

export function getIngredients() {
  return fetch(`${baseURL}ingredients`)
    .then(res => checkReponse(res))
}

export function getOrder(id) {
  return fetch(`${baseURL}orders`, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: id
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    }
  })
    .then(res => checkReponse(res))
}

export function resetPasswordEmail(email) {
  return fetch(`${baseURL}password-reset`, {
    method: 'POST',
    body: JSON.stringify({
      email: email
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkReponse(res))
}

export function resetPassword(password, code) {
  return fetch(`${baseURL}password-reset/reset`, {
    method: 'POST',
    body: JSON.stringify({
      password: password,
      token: code
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkReponse(res))
}

export function registerUser(email, password, userName) {
  return fetch(`${baseURL}auth/register`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
      name: userName
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkReponse(res))
}

export function authUser(email, password) {
  return fetch(`${baseURL}auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkReponse(res))
    .catch(err => console.error(err))

}

export function getUserInfo() {
  return fetch(`${baseURL}auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    }
  })
    .then(res => checkReponse(res))

}

export function changeUserInfo(email, name, password) {
  return fetch(`${baseURL}auth/user`, {
    method: 'PATCH',
    body: JSON.stringify({
      email: email,
      name: name,
      password: password
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    }
  })
    .then(res => checkReponse(res))
}
export function logoutUser(refreshToken) {
  return fetch(`${baseURL}auth/logout`, {
    method: 'POST',
    body: JSON.stringify({
      token: refreshToken
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkReponse(res))
}
export function updateToken(refreshToken) {
  return fetch(`${baseURL}auth/token`, {
    method: 'POST',
    body: JSON.stringify({
      token: refreshToken
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    }
  })
    .then(res => checkReponse(res))
}

