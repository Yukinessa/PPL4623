import Axios from "../helpers/axios"

/**
 * login
 * @typedef {{email:string, password:string}} User
 * @param {User} data
 * @returns {object}
 */
export const signIn = async (data) => {
  try {
    const { data: response } = await Axios.post("/login", { ...data })
    return response
  } catch (err) {
    return err.response.data
  }
}

/**
 * signUp
 * @param {{name:string, email:string, phoneNumber:string, password:string}} data
 * @returns {object}
 */
export const signUp = async (data) => {
  try {
    const { name, email, password, role } = data
    const { data: response } = await Axios.post("/signup", {
      name,
      email,
      password,
      role,
    })
    return response
  } catch (err) {
    return err.response.data
  }
}

export const logout = async () => {
  try {
    const { data: response } = await Axios.get("/logout")
    return response
  } catch (err) {
    return err.response.data
  }
}
