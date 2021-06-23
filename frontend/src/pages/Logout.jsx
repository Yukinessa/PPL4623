import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { logout } from "../api/auth"
import { removeToken } from "../helpers/token"

function Logout() {
  const history = useHistory()
  useEffect(() => {
    const logoutUser = async () => {
      const result = await logout()
      if (result.success) {
        removeToken()
        history.push("/")
      }
    }
    logoutUser()
  })
  return <></>
}

export default Logout
