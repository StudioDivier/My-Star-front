import './auth-page.scss';

import React from 'react';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import {SignIn} from "./components/sign-in";
import {SignUp} from "./components/sign-up";
import {Start} from "./components/start";
import {Reset} from "./reset";

export const AuthPage = () => {

    return (
        <BrowserRouter>
            <div className={'authPage'}>
                <Switch>
                    <Route path="/" exact>
                        <div className={'gradient__signIn'}>
                            <Start/>
                        </div>
                    </Route>
                    <Route path="/sign-in" exact>
                        <div className={'gradient__signIn'}>
                            <SignIn/>
                        </div>
                    </Route>
                    <Route path="/sign-up" exact>
                        <div className={'gradient__signUp'}>
                            <SignUp/>
                        </div>
                    </Route>
                    <Route path='/password-reset/confirm/'>
                        <div className={'gradient__signUp'}>
                            <Reset/>
                        </div>
                    </Route>
                    <Redirect to="/"/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}