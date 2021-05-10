import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
        <Route exact path={["./Signin"]}>
            <Signin />
          </Route>
          <Route exact path={["./Signup"]}>
            <Signup />
          </Route>
          <Route exact path={["/", "/books"]}>
            <Books />
          </Route>
          <Route exact path="/books/:id">
            <Detail />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
