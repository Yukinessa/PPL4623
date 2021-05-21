import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
