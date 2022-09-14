import { URL_API } from './URL'
import { URL_Orders } from './URL'


export const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredients() {
  return fetch(URL_API)
    .then(res => checkReponse(res))
}

export function getOrders(id) {
  return fetch(URL_Orders, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkReponse(res))
}