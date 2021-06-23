import Axios from "../helpers/axios"

export const getCurrentUser = async () => {
  try {
    const { data: response } = await Axios.get("/me")
    return response
  } catch (err) {
    return err.response.data
  }
}
