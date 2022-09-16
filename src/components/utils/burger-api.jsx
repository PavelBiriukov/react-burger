const baseURL = 'https://norma.nomoreparties.space/api/'


export const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
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
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkReponse(res))
}

