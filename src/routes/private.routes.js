import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ConfigPage from "../pages/Config";
import HomePage from "../pages/Home";
import ItemDetails from "../pages/ItemDetails";

export default function PrivateRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/configs" component={ConfigPage} />
        <Route path="/itemDetails/:item_id" component={ItemDetails} />
      </Switch>
    </Router>
  );
}
