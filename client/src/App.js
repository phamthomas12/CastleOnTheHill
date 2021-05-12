import React, {useContext} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import { StoreProvider } from "./utils/GlobalState";
import FavoritesList from "./pages/FavoritesList";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import { UserContext } from "./utils/UserContext";
import ManagePost from "./pages/ManagePost";


function App() {
  const [user] = useContext(UserContext)

  return (
    
    <Router>
      <div>
        <StoreProvider>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/favorites" component={FavoritesList} />
            <Route exact path="/posts/:id" component={Detail} />
            <Route exact path="/managePost" component={ManagePost} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />

             {/* <Route component={NoMatch} />  */}
            <Route
              // {...rest}
              render={(props) => user
              ? <Dashboard {...props} />
              : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
            />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
    
  );
}

export default App;
