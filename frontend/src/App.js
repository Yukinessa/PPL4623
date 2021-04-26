import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";

function App() {
  return (
   <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
   </BrowserRouter>
  );
}

export default App;
