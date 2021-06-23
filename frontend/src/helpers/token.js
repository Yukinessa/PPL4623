/**
 * setToken
 * @param {string} token
 * @param {string} type
 */
export const setToken = (token, type = "token") => {
  localStorage.setItem(type, token)
}

/**
 * getToken
 * @param {string} type
 * @returns {string}
 */
export const getToken = (type = "token") => {
  return localStorage.getItem(type)
}

/**
 * removeToken
 * @param {string} type
 */
export const removeToken = (type = "token") => {
  localStorage.removeItem(type)
}
