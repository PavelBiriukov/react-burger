import {URL_API} from './URL'


export const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredients() {
  return fetch(URL_API)
   .then(res => checkReponse(res))
}