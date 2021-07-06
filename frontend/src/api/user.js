import Axios from "../helpers/axios"

export const getCurrentUser = async () => {
  try {
    const { data: response } = await Axios.get("/me")
    return response
  } catch (err) {
    return err.response.data
  }
}

export const getUsers = async (query = {}) => {
  try {
    const { role } = query
    const { data: response } = await Axios.get(`/user?role=${role}`)
    return response
  } catch (err) {
    return err.response.data
  }
}
