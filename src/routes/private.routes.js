import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import HomePage from '../pages/Home';

export default function PrivateRoutes() {

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
            </Switch>
        </Router>
    );
}