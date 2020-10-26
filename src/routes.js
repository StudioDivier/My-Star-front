import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from "./components/auth-page/auth-page";
import {Categories} from "./components/categories/categories";
import {Stars} from "./components/stars-page/stars";
import {StarsProvider} from "./context/StarsContext";
import {Order} from "./components/order/order";
import {Confirm} from "./components/confirm/confirm";
import {OrdersPage} from "./components/orders-page/orders-page";
import {Profile} from "./components/profile/profile"
import {Policy} from "./components/docs/policy";
import {DesktopMain} from "./components/pcVersion/main";
import {AccountPage} from "./components/pcVersion/pages/account-page/account-page";
import {Reset} from "./components/auth-page/reset";

export const useRoutes = (isAuthenticated, isStar) => {

    // NOT Star && Auth

    if (isAuthenticated && !isStar) {
        if (window.screen.width <= 768) {
            return (
                <Switch>
                    <StarsProvider>
                        <Route exact path="/">
                            <Redirect to="/categories"/>
                        </Route>
                        <Route exact path="/orders">
                            <OrdersPage/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile/>
                        </Route>
                        <Route exact path="/policy">
                            <Policy/>
                        </Route>
                        <Route exact path="/categories">
                            <Categories/>
                        </Route>
                        <Route exact path="/categories/stars">
                            <Stars/>
                        </Route>
                        <Route exact path="/categories/stars/order">
                            <Order/>
                        </Route>
                        <Route exact path="/categories/stars/order/confirm">
                            <Confirm/>
                        </Route>
                        <Route exact path='/password-reset/confirm/'>
                            <div className={'gradient__signUp'}>
                                <Reset/>
                            </div>
                        </Route>
                        {/*<Redirect to={'/'}/>*/}
                    </StarsProvider>
                </Switch>
            )
        }
        return (
            <Switch>
                <Route path="/">
                    <DesktopMain
                        isAuth={isAuthenticated}
                        isStar={isStar}
                    />
                </Route>
                <Route path={'/account-page'}>
                    <AccountPage/>
                    <Redirect to="/account-page"/>
                </Route>

            </Switch>
        )
    }

    // Star && Auth

    if (isAuthenticated && isStar) {
        if (window.screen.width <= 768) {
            return (
                <Switch>
                    <StarsProvider>
                        <Route exact path="/">
                            <Redirect to="/categories"/>
                        </Route>
                        <Route exact path="/orders">
                            <OrdersPage/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile/>
                        </Route>
                        <Route exact path="/policy">
                            <Policy/>
                        </Route>
                        <Route exact path="/categories">
                            <Categories/>
                        </Route>
                        <Route exact path="/categories/stars">
                            <Stars/>
                        </Route>
                        <Route exact path="/categories/stars/order">
                            <Order/>
                        </Route>
                        <Route exact path="/categories/stars/order/confirm">
                            <Confirm/>
                        </Route>
                        <Route exact path='/password-reset/confirm/'>
                            <div className={'gradient__signUp'}>
                                <Reset/>
                            </div>
                        </Route>
                        {/*<Redirect to={'/'}/>*/}
                    </StarsProvider>
                </Switch>
            )
        }
        return (
            <Switch>
                <Route path="/">
                    <DesktopMain
                        isAuth={isAuthenticated}
                        isStar={isStar}
                    />
                </Route>
                <Route path={'/account-page'}>
                    <AccountPage/>
                    <Redirect to="/account-page"/>
                </Route>

            </Switch>
        )
    }

    // NOT Star && NOT Auth

    if (!isAuthenticated && !isStar) {
        if (window.screen.width <= 768) {
            return (
                <Switch>
                    <Route path="/">
                        <AuthPage/>
                    </Route>

                    <Redirect to="/"/>
                </Switch>
            )
        }
        return (
            <Switch>
                <Route path="/">
                    <DesktopMain
                        isAuth={isAuthenticated}
                        isStar={isStar}
                    />
                </Route>

                <Redirect to="/"/>
            </Switch>
        )
    }
}