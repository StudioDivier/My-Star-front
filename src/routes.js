import React, {useContext} from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from "./components/auth-page/auth-page";
import {Categories} from "./components/categories/categories";
import {Stars} from "./components/stars-page/stars";
import {StarsContext, StarsProvider} from "./context/StarsContext";
import {Order} from "./components/order/order";

export const useRoutes = (isAuthenticated, isStar) => {
    const fetchedList = useContext(StarsContext)
    console.log(fetchedList)
    if (isAuthenticated && !isStar) {
        return (
            <Switch>
                <StarsProvider>
                     <Route exact path="/categories">
                        <Categories />
                    </Route>
                    <Route exact path="/categories/stars">
                        <Stars />
                    </Route>
                    <Route exact path="/categories/stars/order">
                        <Order />
                    </Route>
                    <Redirect to="/categories" />
                </StarsProvider>
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