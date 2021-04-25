import React from "react";

import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import LoginPage from "../pages/Login";

export default function AuthRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}
