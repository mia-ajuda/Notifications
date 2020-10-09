import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import Login from './screens/Login';
import NotificationSender from './screens/NotificationSender';

function PrivateRoute({ component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) =>
                true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/" }} />
                )
            }
        />
    )
}

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute exact path="/send" component={NotificationSender} />
            </Switch>
        </Router>
    )
}