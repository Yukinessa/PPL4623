import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Home, SignIn, SignUp, Logout } from "./pages"
import DashboardRoute from "./navigations/DashboardRoute"
import { StateProvider } from "./store"

function App() {
  return (
    <StateProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/logout" component={Logout} />
          <Route path="/" render={({ match }) => <DashboardRoute basePath={match.path} />} />
        </Switch>
      </Router>
    </StateProvider>
  )
}

export default App
