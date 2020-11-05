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
// import {AccountPage} from "./components/pcVersion/pages/account-page/account-page";
import {Reset} from "./components/auth-page/reset";
import {SeeVideo} from "./components/see-video/SeeVideo";
import {YaRedirect} from "./components/auth-page/components/ya-redirect";
import {VkRedirect} from "./components/auth-page/components/vk-redirect";

export const useRoutes = (isAuthenticated, isStar) => {

    // NOT Star && Auth

    if (isAuthenticated && !isStar) {
        if (window.screen.width <= 768) {
            return (
                <StarsProvider>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/categories"/>
                        </Route>
                        {/*<Route exact path='/orders' component={OrdersPage}>*/}
                        {/*    <Redirect to={'/orders'}/>*/}
                        {/*</Route>*/}
                        <Route exact path="/orders" component={OrdersPage}/>

                        <Route exact path="/profile" component={Profile}/>

                        <Route exact path="/policy" component={Policy}/>

                        <Route exact path="/categories" component={Categories}/>

                        <Route exact path="/categories/stars" component={Stars}/>

                        <Route exact path="/categories/stars/order" component={Order}/>

                        <Route exact path="/categories/stars/order/confirm" component={Confirm}/>

                        <Route path='/password-reset/confirm/'>
                            <div className={'gradient__signUp'}>
                                <Reset/>
                            </div>
                        </Route>

                        <Route path={'/media/congratulation/'}>
                            <SeeVideo/>
                        </Route>

                        <Route path={'/api/mid-yandex/'}>
                            <div className={'gradient__signUp'}>
                                <YaRedirect/>
                            </div>
                        </Route>

                        <Route path={'/api/mid-vk/'}>
                            <div className={'gradient__signUp'}>
                                <VkRedirect/>
                            </div>
                        </Route>

                        {/*<Route render={() => <Redirect to="/categories"/>}/>*/}


                        {/*<Redirect to={'/categories'}/>*/}
                    </Switch>
                </StarsProvider>
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

            </Switch>
        )
    }

    // Star && Auth

    if (isAuthenticated && isStar) {
        if (window.screen.width <= 768) {
            return (
                <StarsProvider>
                    <Switch>
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
                        <Route path='/password-reset/confirm/'>
                            <div className={'gradient__signUp'}>
                                <Reset/>
                            </div>
                        </Route>
                        <Route path={'/api/mid-yandex/'}>
                            <div className={'gradient__signUp'}>
                                <YaRedirect/>
                            </div>
                        </Route>

                        <Route path={'/api/mid-vk/'}>
                            <div className={'gradient__signUp'}>
                                <VkRedirect/>
                            </div>
                        </Route>

                        <Route path={'/media/congratulation/'}>
                            <SeeVideo/>
                        </Route>
                        {/*<Redirect to={'/'}/>*/}
                    </Switch>
                </StarsProvider>
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

            </Switch>
        )
    }

    // NOT Star && NOT Auth

    if (!isAuthenticated && !isStar) {
        if (window.screen.width <= 768) {
            return (
                <StarsProvider>
                    <Switch>
                        <Route exact path="/">
                            <AuthPage/>
                        </Route>
                        <Route exact path="/categories">
                            <Categories/>
                        </Route>
                        <Route exact path="/categories/stars">
                            <Stars/>
                        </Route>
                        <Route path='/password-reset/confirm/'>
                            <div className={'gradient__signUp'}>
                                <Reset/>
                            </div>
                        </Route>
                        <Route path={'/api/mid-yandex/'}>
                            <div className={'gradient__signUp'}>
                                <YaRedirect/>
                            </div>
                        </Route>
                        <Route path={'/api/mid-vk/'}>
                            <div className={'gradient__signUp'}>
                                <VkRedirect/>
                            </div>
                        </Route>
                        <Route path={'/media/congratulation/'}>
                            <SeeVideo/>
                        </Route>

                        <Redirect to="/"/>
                    </Switch>
                </StarsProvider>
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