import Axios from "../helpers/axios"

export const getAppointments = async (query = {}) => {
  try {
    const { status, publisherId = "", designerId = "" } = query
    const { data: response } = await Axios.get(
      `/appointment?status=${status}&publisherId=${publisherId}&designerId=${designerId}`
    )
    return response
  } catch (err) {
    return err.response.data
  }
}

export const getSchedules = async (q) => {
  try {
    const { data: response } = await Axios.get("/appointment/today")
    return response
  } catch (err) {
    return err.response.data
  }
}

export const getAppointment = async (id) => {
  try {
    const { data: response } = await Axios.get(`/appointment/${id}`)
    return response
  } catch (err) {
    return err.response.data
  }
}

export const storeAppointment = async (data) => {
  try {
    const { publisherId, designerId, projectId, meetDate, activity, information } = data
    const { data: response } = await Axios.post("/appointment", {
      publisherId,
      designerId,
      projectId,
      meetDate,
      activity,
      information,
    })
    return response
  } catch (err) {
    return err.response.data
  }
}

export const updateAppointment = async (data) => {
  try {
    const { id, projectId, meetDate, activity, information } = data
    const { data: response } = await Axios.put(`/appointment/${id}`, { projectId, meetDate, activity, information })
    return response
  } catch (err) {
    return err.response.data
  }
}

export const changeStatusAppointment = async (data) => {
  try {
    const { id, status } = data
    const { data: response } = await Axios.patch(`/appointment/${id}`, { status })
    return response
  } catch (err) {
    return err.response.data
  }
}
