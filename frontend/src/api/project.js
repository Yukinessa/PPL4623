import Axios from "../helpers/axios"

export const getProjects = async () => {
  try {
    const { data: response } = await Axios.get("/project")
    return response
  } catch (err) {
    throw err.response.data
  }
}

export const getProject = async (projectId) => {
  try {
    const { data: response } = await Axios.get(`/project/${projectId}`)
    return response
  } catch (err) {
    return err.response.data
  }
}

export const storeProject = async (data) => {
  try {
    const { data: response } = await Axios.post("/project", {
      ...data,
    })
    return response
  } catch (err) {
    return err.response.data
  }
}
