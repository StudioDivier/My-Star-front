import './auth-page.scss';

import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import {SignIn} from "./components/sign-in";
import {SignUp} from "./components/sign-up";
import {Start} from "./components/start";

export const AuthPage = () => {
    const auth = useContext(AuthContext);

    return (
        <BrowserRouter>
            <div className={'authPage'}>
                <Switch>
                    <Route path="/" exact>
                        <div className={'gradient'}>
                            <Start/>
                        </div>
                    </Route>
                    <Route path="/sign-in" exact>
                        <div className={'gradient'}>
                            <SignIn/>
                        </div>
                    </Route>
                    <Route path="/sign-up" exact>
                        <div className={'gradient'}>
                            <SignUp/>
                        </div>
                    </Route>
                    <Redirect to="/"/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}