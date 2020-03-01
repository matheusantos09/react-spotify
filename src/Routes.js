import React from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Panel from "./components/Panel";
import {isAuthenticated, setToken} from "./services/auth";
import {accessTokenSpotify} from "./helpers/accessTokenSpotify";
import Login from "./components/Login";

const setTokenReceived = () => {

  if (window.location.href.indexOf("access_token") > -1) {
    setToken(accessTokenSpotify())
  }

  return (
    <>
      <h1>Redirecionando...</h1>
      <Redirect to="/painel" />
    </>
  )
}

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={
      props => isAuthenticated()
        ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: '/', state: {from: props.location}}} />
        )
    }
  />
)


const Routes = () => (
  <Router>
    <Route path="/redirect" exact component={setTokenReceived} />
    <PrivateRoute path="/painel" exact component={Panel} />
    <Route path="/" exact component={Login} />
  </Router>
)

export default Routes