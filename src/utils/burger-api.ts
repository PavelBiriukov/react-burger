import { TIngredientResponse } from "../services/types/types";
import { deleteCookie, getCookie, setCookie } from "./utils";

export const baseURL = 'https://norma.nomoreparties.space/api/'


/* export const checkReponse = <T> (res: Response): Promise<T> => {
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
            setCookie('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            return res;
          });
        }
        Promise.reject(err);
      });
}; */

type TOptions = {
  method?: string;
  body?: BodyInit | null | undefined;
  headers?: HeadersInit | undefined;
}

function request(url: string, options: TOptions) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options)/* .then(res => checkReponse<TIngredientResponse>(res)) */
}

/* export function getIngredients() {
  return request(`${baseURL}ingredients`, {})
} */
/* export function getOrder(id: string) {
  return request(`${baseURL}orders`, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: id
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    }
  })
} */
/* 

export function resetPasswordEmail(email:string) {
  return request(`${baseURL}password-reset`, {
    method: 'POST',
    body: JSON.stringify({
      email: email
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function resetPassword(password:string, code:string | any) {
  return request(`${baseURL}password-reset/reset`, {
    method: 'POST',
    body: JSON.stringify({
      password: password,
      token: code
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function registerUser(email:string, password:string, userName:string) {
  return request(`${baseURL}auth/register`, {
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
}

export function authUser(email:string, password:string) {
  return request(`${baseURL}auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

}

export function getUserInfo() {
  return request(`${baseURL}auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    }
  })

}

export function changeUserInfo(email:string, name:string, password:string) {
  return request(`${baseURL}auth/user`, {
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
}
export function logoutUser(refreshToken:string | null) {
  return request(`${baseURL}auth/logout`, {
    method: 'POST',
    body: JSON.stringify({
      token: refreshToken
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export function updateToken(refreshToken:string | null) {
  return request(`${baseURL}auth/token`, {
    method: 'POST',
    body: JSON.stringify({
      token: refreshToken
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    }
  })
}

 */