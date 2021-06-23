import axios from "axios"
import { logout } from "../api/auth"
import { removeToken } from "./token"

const { REACT_APP_SERVER_URL } = process.env

const Axios = axios.create({
  withCredentials: true,
  baseURL: REACT_APP_SERVER_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
})

Axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      removeToken()
      window.location = "/"
    }
    if (error.response.status === 461 && !originalRequest._retry) {
      return logout().then((res) => {
        if (res.success) {
          removeToken()
          window.location = "/"
        }
      })
    }
    return Promise.reject(error)
  }
)

export default Axios
