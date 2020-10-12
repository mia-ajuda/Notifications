import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import Login from './screens/Login';
import NotificationSender from './screens/NotificationSender';

function isValid() {
    const token = localStorage.getItem("accessToken");
    const email = localStorage.getItem("userEmail");

    const validEmails = process.env.REACT_APP_validEmails.split(' ');
    
    return token && validEmails.includes(email);
}

function PrivateRoute({ component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) =>
                isValid() ? (
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