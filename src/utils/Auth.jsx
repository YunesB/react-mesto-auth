export const BASE_URL = 'https://auth.nomoreparties.co';

function handleRes(res) {
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    console.log(res.status + ": " + res.statusText);
    return Promise.reject(res.status + ":" + res.statusText)
  }
}

export const signUp = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(handleRes)
}

export const signIn = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({ email, password })
  })
    .then(handleRes)
}

export const checkTokenValidity = (userToken) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    }
  })
    .then(handleRes)
}