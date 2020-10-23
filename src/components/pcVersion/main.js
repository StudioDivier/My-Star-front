import React, {useContext, useEffect, useState} from 'react';
import './main.scss';
import {Container, Row, Col} from 'react-bootstrap';
import {Header} from "./components/header/header";
import {FilterHead} from "./components/filter-head/filter-head";
import {Banner} from "./components/banner-main/banner";
import {Footer} from "./components/footer/footer";
import {SingleCat} from "./components/cat-row/cat-row";
import {AdsRow} from "./components/ads-row/ads-row";
import {AllCats} from "./components/all-cats/all-cats";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {AccountPage} from "./pages/account-page/account-page";
import {StarCard} from "./pages/star-card/star-card";
import {Breadcrumbs} from "./components/breadcrumbs/breadcrumbs";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";

export const DesktopMain = (isAuthenticated, isStar) => {

    const userData = JSON.parse(window.localStorage.getItem('userData'));

    const [stars, setStars] = useState([]);

    const authToken = useContext(AuthContext)
    const {request} = useHttp()

    useEffect(() => {
        async function fetchData() {
            const stars = await request('/api/star/getlist/', 'GET', null, {Authorization: `Bearer ${userData.token}`})
            if (!!stars.length) {
                setStars([...stars])
            }
        }

        fetchData();
    }, [authToken.token, request]) // needed?

    // console.log(stars)

    // let list = stars;

    return (
        <div className="main">
            <Router>
                <Header/>

                <Switch>

                    <Route exact path='/'>
                        <Container>
                            {/*Filter*/}
                            <Row>
                                <Col>
                                    <FilterHead/>
                                </Col>
                            </Row>
                            {/*Top banner*/}
                            <Row>
                                <Col>
                                    <Banner/>
                                </Col>
                            </Row>
                            {/*Two categories*/}
                            <Row>
                                <Col lg={12}>
                                    <SingleCat
                                        list={stars}
                                        catName={'Ведущий'}
                                    />
                                </Col>

                                <Col lg={12}>
                                    <SingleCat
                                        list={stars}
                                        catName={'Дом-2'}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <AllCats/>
                                </Col>
                            </Row>
                            {/*3 Ads row*/}
                            <Row>
                                <Col>
                                    <AdsRow/>
                                </Col>
                            </Row>
                            {/*More categories*/}
                            <Row>
                                <Col lg={12}>
                                    <SingleCat
                                        catName={'Test'}
                                    />
                                </Col>

                                <Col lg={12}>
                                    <SingleCat
                                        catName={'Test'}
                                    />
                                </Col>

                                <Col lg={12}>
                                    <SingleCat
                                        catName={'Test'}
                                    />
                                </Col>

                                <Col lg={12}>
                                    <SingleCat
                                        catName={'Test'}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Route>

                    <Route exact path="/star-card">
                        <Breadcrumbs secondItem={'Все категории'} thirdItem={'Звезда'}/>
                        <StarCard/>
                    </Route>

                    <Route exact path="/account-page">
                        <Breadcrumbs secondItem={'Аккаунт'}/>
                        <AccountPage/>
                    </Route>

                </Switch>

                <Footer/>
            </Router>
        </div>
    )
}