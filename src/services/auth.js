export const NAME_COOKIE = 'TK_SPOTIFY_UI'

export const setToken = responseToken => {

  if (typeof responseToken === 'undefined') {
    return true;
  }

  deleteToken()

  let date = new Date()

  responseToken.expires_in = date.setSeconds(responseToken.expires_in)

  localStorage.setItem(NAME_COOKIE, JSON.stringify(responseToken))
}

export const getToken = () => {

  if (verifyExpireToken()) {
    return null
  }

  const tokenObject = JSON.parse(localStorage.getItem(NAME_COOKIE))

  if (!tokenObject) {
    return null
  }

  return tokenObject.access_token
}

export const deleteToken = () => {
  localStorage.removeItem(NAME_COOKIE)
}

export const verifyExpireToken = () => {
  const token = JSON.parse(localStorage.getItem(NAME_COOKIE))

  if (!token) {
    deleteToken()
    return true;
  }

  const dateNow = new Date().getTime()

  if (token.expires_in < dateNow) {
    deleteToken()
    return true
  }

  return false
}

export const isAuthenticated = () => {
  return getToken()
};