import { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { StateContext } from "../store"

export default function PrivateRoute({ component: Component, ...rest }) {
  const [state] = useContext(StateContext)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (state.status === "pending") {
          return ""
        } else if (state.status === "authenticated") {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          )
        }
      }}
    />
  )
}
