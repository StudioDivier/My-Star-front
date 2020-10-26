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
import {Categories} from "./pages/cats-page/cats-page";
import {Category} from "./pages/category-page/category";
import {Search} from "./pages/search-page/search-page";
import {Reset} from "../auth-page/reset";
import {Policy} from "./pages/privacy-policy/privacy-policy";

export const DesktopMain = (isAuthenticated, isStar) => {

    const [cat, setCat] = useState('')
    const [name, setCatName] = useState('')
    const [star, setStar] = useState([])
    const [search, setSearch] = useState([])

    // const userData = JSON.parse(window.localStorage.getItem('userData'));
    //
    // const [stars, setStars] = useState([]);
    //
    // const authToken = useContext(AuthContext)
    // const {request} = useHttp()
    //
    // useEffect(() => {
    //     async function fetchData() {
    //         const stars = await request('/api/star/getlist/', 'GET', null, {Authorization: `Bearer ${userData.token}`})
    //         if (!!stars.length) {
    //             setStars([...stars])
    //         }
    //     }
    //
    //     fetchData();
    // }, [authToken.token, request]) // needed?

    // console.log(stars)

    // let list = stars;

    return (
        <div className="main">
            <Router>
                <Header setSearch={setSearch}/>

                <Switch>

                    <Route exact path='/'>
                        <Container>
                            {/*Filter*/}
                            <Row>
                                <Col>
                                    <FilterHead
                                        chooseCat={setCat}
                                        nameCat={setCatName}
                                    />
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
                                        id={1}
                                        catName={'Классика'}
                                        chooseCat={setCat}
                                        nameCat={setCatName}
                                        chooseStar={setStar}
                                    />
                                </Col>

                                <Col lg={12}>
                                    <SingleCat
                                        id={2}
                                        catName={'Хип-Хоп'}
                                        chooseCat={setCat}
                                        nameCat={setCatName}
                                        chooseStar={setStar}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <AllCats
                                        chooseCat={setCat}
                                        nameCat={setCatName}
                                        chooseStar={setStar}
                                    />
                                </Col>
                            </Row>
                            {/*3 Ads row*/}
                            <Row>
                                <Col>
                                    <AdsRow/>
                                </Col>
                            </Row>
                            {/*More categories*/}
                            {/*<Row>*/}
                            {/*    <Col lg={12}>*/}
                            {/*        <SingleCat*/}
                            {/*            catName={'Test'}*/}
                            {/*        />*/}
                            {/*    </Col>*/}
                            {/*</Row>*/}
                        </Container>
                    </Route>

                    <Route exact path="/star-card">
                        <StarCard
                            star={star}
                            chooseCat={setCat}
                            nameCat={setCatName}
                            chooseStar={setStar}
                        />
                    </Route>

                    <Route exact path="/account-page">
                        <Breadcrumbs secondItem={'Аккаунт'}/>
                        <AccountPage/>
                    </Route>

                    <Route exact path="/category">
                        <Category
                            name={name}
                            id={cat}
                            chooseStar={setStar}
                        />
                    </Route>

                    <Route exact path="/categories">
                        <Breadcrumbs secondItem={'Все категории'}/>
                        <Categories
                            chooseCat={setCat}
                            nameCat={setCatName}
                            chooseStar={setStar}
                        />
                    </Route>

                    <Route exact path="/search">
                        <Breadcrumbs secondItem={'Поиск'}/>
                        <Search
                            search={search}
                            chooseCat={setCat}
                            nameCat={setCatName}
                            chooseStar={setStar}
                        />
                    </Route>

                    <Route exact path={'/privacy-policy'}>
                        <Breadcrumbs secondItem={'Политика конфиденциальности'}/>
                        <Policy />
                    </Route>

                    <Route exact path='/password-reset/confirm/'>
                        <Breadcrumbs secondItem={'Сброс пароля'}/>
                        <Container>
                            <Row>
                                <Col>
                                    <div className={'pc-password-reset'}>
                                        <Reset/>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Route>

                </Switch>

                <Footer/>
            </Router>
        </div>
    )
}