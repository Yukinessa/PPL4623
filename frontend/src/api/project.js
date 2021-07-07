import Axios from "../helpers/axios"

export const getProjects = async () => {
  try {
    const { data: response } = await Axios.get("/project")
    return response
  } catch (err) {
    return err.response.data
  }
}

export const getProject = async (id) => {
  try {
    const { data: response } = await Axios.get(`/project/${id}`)
    return response
  } catch (err) {
    return err.response.data
  }
}
