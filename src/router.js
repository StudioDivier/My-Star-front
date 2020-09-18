import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from "./components/auth-page/auth-page";

export const Router = ({isAuth}) => {

    if (isAuth) {
        return (
            <Switch>
                <Route path="/">
                    <AuthPage/>
                </Route>
                <Redirect path="/"/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/">
                    <AuthPage/>
                </Route>
                <Redirect path="/"/>
            </Switch>
        )
    }
}