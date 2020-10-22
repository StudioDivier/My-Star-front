import React, {useContext, useState} from 'react';
import './main.scss';
import {Container, Row, Col} from 'react-bootstrap';
import {Header} from "./components/header/header";
import {FilterHead} from "./components/filter-head/filter-head";
import {Banner} from "./components/banner-main/banner";
import {Footer} from "./components/footer/footer";
import {SingleCat} from "./components/cat-row/cat-row";
import {AdsRow} from "./components/ads-row/ads-row";
import {AllCats} from "./components/all-cats/all-cats";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import {AccountPage} from "./pages/account-page/account-page";
import {StarCard} from "./pages/star-card/star-card";
import {Breadcrumbs} from "./components/breadcrumbs/breadcrumbs";
import Modal from 'react-modal';
import {AuthContext, AuthContext as auth} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";


export const DesktopMain = (isAuthenticated, isStar) => {

    const [loginIsOpen, setLoginIsOpen] = useState(false);
    const [authIsOpen, setAuthIsOpen] = useState(false);

    const message = useMessage();
    const auth = useContext(AuthContext);
    const {request, error, clearError} = useHttp();

    const [form, setForm] = useState({
        password: '', email: ''
    })

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: 'auto',
            width: '80%',
            borderRadius: '25px',
            padding: '20px 30px'
        }
    };

    /*
     * For Modals
    */

    const showAuthModal = () => {
        setAuthIsOpen(true)
    }
    const showLoginModal = () => {
        setLoginIsOpen(true)
    }
    const closeModal = () => {
        setLoginIsOpen(false)
        setAuthIsOpen(false)
    }

    Modal.setAppElement(document.querySelector('.App'))

    /*
    *  For login
    * */

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value}))
    }

    const loginHandler = async () => {
        try {
            const dataLog = await request('/api/login/', 'POST', {...form})
            // console.log(dataLog)
            auth.login(dataLog.token, dataLog.username, dataLog.is_star, dataLog.id, dataLog.email, dataLog.avatar);
            if (Object.keys(dataLog).length === 1 || Object.keys(dataLog).length === 2) {
                for (let e in dataLog) {
                    message(e + ' : ' + dataLog[e][0]);
                }
            }
            // history.push('/categories');
        } catch (e) {
            message(e);
            // history.push('/sign-in');
            // console.log(e);
        }
    }

    return (
        <div className="main">
            <Router>
                <Header
                    login={showLoginModal}
                    auth={showAuthModal}
                />

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
                                    <SingleCat/>
                                </Col>

                                <Col lg={12}>
                                    <SingleCat/>
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
                                    <SingleCat/>
                                </Col>

                                <Col lg={12}>
                                    <SingleCat/>
                                </Col>

                                <Col lg={12}>
                                    <SingleCat/>
                                </Col>

                                <Col lg={12}>
                                    <SingleCat/>
                                </Col>
                            </Row>
                        </Container>
                        <Modal
                            isOpen={loginIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Example Modal"
                            style={customStyles}
                        >
                            <div className="modal-header">
                                <span>Логин</span>
                                <button onClick={closeModal}>х</button>
                            </div>
                            <div className="signInInputs spread">
                                <input
                                    type="text"
                                    placeholder={'Почта'}
                                    onChange={changeHandler}
                                    name={'email'}
                                    value={form.email}
                                />
                                <input
                                    type="text"
                                    placeholder={'Пароль'}
                                    onChange={changeHandler}
                                    name={'password'}
                                    value={form.password}
                                />
                                <button
                                    className="signInButton"
                                    onClick={loginHandler}
                                >
                                    Войти
                                </button>
                                <p>Совершая заказ, вы соглашаетесь с условиями</p>
                            </div>
                        </Modal>
                        <Modal
                            isOpen={authIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Example Modal"
                            style={customStyles}
                        >
                            <div className="modal-header">
                                <span>Авторизация</span>
                                <button onClick={closeModal}>х</button>
                            </div>
                            <div className="spread">
                                <input type="text"/>
                                <input type="text"/>
                            </div>
                        </Modal>
                    </Route>

                    <Route exact path="/star-card">
                        <Breadcrumbs/>
                        <StarCard/>
                    </Route>

                    <Route exact path="/account-page">
                        <Breadcrumbs/>
                        <AccountPage/>
                    </Route>

                </Switch>

                <Footer/>
            </Router>
        </div>
    )
}