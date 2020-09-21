import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from "./components/auth-page/auth-page";

export const useRoutes = (isAuthenticated, isStar) => {
    if (isAuthenticated && !isStar) {
        return (
            <Switch>
                <Route>

                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    } else if (isAuthenticated && isStar) {
        return (
            <Switch>
                <Route>

                </Route>
            <Redirect to="/"/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/">
                    <AuthPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }
}