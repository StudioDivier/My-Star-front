import React, {useContext, useState} from 'react';
import './header.scss';
import {Container, Row, Col} from 'react-bootstrap';
import lupa from '../../../../img/pc/find_white.svg';
import MaskedInput from 'react-text-mask';
import {useMessage} from "../../../../hooks/message.hook";
import {useHttp} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/AuthContext";
import Modal from 'react-modal';
import {useHistory} from 'react-router-dom';
import close from '../../../../img/close.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import logo from '../../../../img/Exprome-logo.png';
import swal from 'sweetalert';

export const Header = ({setSearch, setPhone}) => {

    const userData = JSON.parse(window.localStorage.getItem('userData'));

    const history = useHistory();

    const [loginIsOpen, setLoginIsOpen] = useState(false);
    const [authIsOpen, setAuthIsOpen] = useState(false);
    const [forgotPW, setForgotIsOpen] = useState(false);
    // const [yaIsOpen, setYaIsOpen] = useState(false);
    // const [vkIsOpen, setVkIsOpen] = useState(false);

    const message = useMessage();
    const auth = useContext(AuthContext);
    const {request, loading} = useHttp();

    const [form, setForm] = useState({
        password: '', login: ''
    })

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value}))
    }

    const [emailForm, setEmailForm] = useState({
        email: ''
    })

    const [form1, setForm1] = useState({search: ''})

    const mailChangeHandler = event => {
        setEmailForm(({...emailForm, [event.target.name]: event.target.value}))
    }

    /*
     * For Modals
    */

    const showAuthModal = () => {
        setAuthIsOpen(true)
    }
    const showLoginModal = () => {
        setLoginIsOpen(true)
    }
    const showForgotModal = () => {
        setForgotIsOpen(true)
    }
    // const showVkModal = () => {
    //     setVkIsOpen(true)
    // }
    const closeModal = () => {
        setLoginIsOpen(false)
        setAuthIsOpen(false)
        setForgotIsOpen(false)
    }

    Modal.setAppElement(document.querySelector('.App'))

    /*
    *  For login
    * */

    // const changeHandler = event => {
    //     setForm(({...form, [event.target.name]: event.target.value}))
    // }

    const loginHandler = async () => {
        if (!(form.password.length === 0) && !(form.login.length === 0)) {
            try {
                const dataLog = await request('/api/login/', 'POST', {...form})
                // console.log(dataLog)
                auth.login(dataLog.token, dataLog.username, dataLog.is_star, dataLog.id, dataLog.email, dataLog.avatar);
                if (Object.keys(dataLog).length === 1 || Object.keys(dataLog).length === 2) {
                    for (let e in dataLog) {
                        message([e + ' : ' + dataLog[e][0]]);
                    }
                }
                if (dataLog.token) {
                    message('Добро пожаловать!')
                }
                closeModal();
                // window.location.reload();

            } catch (e) {
                message(e);
            }
        } else {
            message(['Заполните все необходимые поля!'])
        }
    }

    // Transform birth year
    // function reverseDate(str) {
    //     return str.split('-').reverse().join('-')
    // }

    const registerHandler = async () => {
        if (form.password === form.passwordRepeat) {
            if (form.password && form.email && form.phone && form.username) {

                if (!(form.password.length === 0) && !(form.email.length === 0) && !(form.phone.length === 0) && !(form.username.length === 0)) {
                    try {
                        const dataAuth = await request('/api/registration/', 'POST', {
                            email: form.email,
                            login: form.email,
                            password: form.password,
                            phone: form.phone.replace(/[^0-9]/g, ''),
                            username: form.username,
                            // date_of_birth: reverseDate(form.date_of_birth)
                        })
                        // if (Object.keys(dataAuth).length !== 1) {
                        //     setTimeout(() => {
                        //         for (let e in dataAuth) {
                        //             message([e + ' : ' + dataAuth[e][0]]);
                        //         }
                        //     }, 555)
                        //
                        // }
                        // console.log(dataAuth.username[0])
                        // if (dataAuth.email[0] !== 'Это поле должно быть уникально.' || dataAuth.phone[0] !== 'Это поле должно быть уникально.' || dataAuth.username[0] !== 'Это поле должно быть уникально.') {

                        // if (!(Object.values(dataAuth).includes('Это поле должно быть уникально.'))) {
                        //     const dataLog = await request('/api/login/', 'POST', {
                        //         password: form.password, login: form.email
                        //     })
                        //     console.log(dataLog)
                        //     // message(dataLog)
                        //     if (dataLog.token) {
                        //         auth.login(dataLog.token, dataLog.username, dataLog.is_star, dataLog.id, dataLog.email, dataLog.avatar);
                        //         message('Вы зарегистрированы!')
                        //     }
                        // }
                        // console.log(dataAuth[0] === "Подтвердите Ваш Email")
                        if (dataAuth[0] === "Подтвердите Ваш Email") {
                            swal("Вы зарегистрированы!", "Вам на почту отправлено письмо для завершения регистрации!", "success", {
                                button: "Закрыть",
                            });
                        } else if (dataAuth.email) {
                            message(['Данная электронная почта уже зарегистрирована!'])
                        }

                        closeModal();

                    } catch (e) {
                        // showAuthModal();
                        message(e);
                    }
                } else {
                    message(['Заполните все необходимые поля!'])
                }
            } else {
                message(['Заполните все необходимые поля!'])
            }
        } else {
            message(['Пароли не совпадают!'])
        }
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: 'auto',
            width: '60%',
            borderRadius: '25px',
            padding: '50px 60px',
            backgroundColor: `white`,
        }
    };

    // For search input

    const changeHandler1 = event => {
        setForm1(({...form1, [event.target.name]: event.target.value}))
    }

    const searchHandler = (e) => {
        e.preventDefault();
        setSearch(form1.search);
        if (form1.search) {
            history.push('/search');
        }
    }

    // Определить кнопки в зависимости от логина пользователя

    function determineAuth() {
        if (userData && userData.token) {
            return (
                <div onClick={() => history.push('/account-page')}><span>Личный кабинет</span></div>
            )
        }
        return (
            <div style={{display: 'flex'}}>
                <div onClick={showLoginModal}><span>Войти как исполнитель</span></div>
                <div onClick={showLoginModal}><span>Вход</span></div>
            </div>
        )

    }

    function determineAuth1() {
        if (userData && userData.token) {
            return (
                <div onClick={logout}><span style={{color: 'white'}}>Выйти</span></div>
            )
        }
        return (
            <div onClick={showAuthModal}><span style={{color: 'white'}}>Регистрация</span></div>
        )
    }

    // Кнопка выхода

    function logout() {
        auth.logout()
        history.push('/')
    }

    // VK Auth

    const vkAuth = async () => {
        try {
            const dataAuth = await request('/api/pre-vk-oauth/', 'GET')
            // console.log(dataAuth)
            window.open(`${dataAuth.link}`).focus();

        } catch (e) {
            message(e);
        }
    }

    // VK Login

    const vkLogin = async () => {
        try {
            const dataAuth1 = await request('/api/pre-vk-oauth/', 'GET')
            window.open(`${dataAuth1.link}`).focus();
        } catch (e) {
            message(e);
        }
    }

    // Yandex Auth

    const yaAuth = async () => {
        try {
            const dataAuth = await request('/api/pre-yandex-oauth/', 'GET')
            // console.log(dataAuth)
            window.open(`${dataAuth.link}`).focus();

        } catch (e) {
            message(e);
        }
    }

    // Yandex Login

    const yaLogin = async () => {
        try {
            const dataAuth1 = await request('/api/pre-yandex-oauth/', 'GET')
            // console.log(dataAuth1)
            window.open(`${dataAuth1.link}`).focus();
        } catch (e) {
            message(e);
        }
    }

    // Forgot password

    const sendRecover = async () => {
        try {
            const changePW = await request('/password-reset/', 'POST', {"email": emailForm.email})
            console.log(changePW)
            if (changePW.status === 'OK') {
                alert('Вам на почту отправлена ссылка для смены пароля');
            } else {
                message(['Пользователь с таким e-mail не зарегистрирован!'])
            }
        } catch (e) {
            message(e)
        }
    }


    return (
        <div className="pc-header">
            <Container>
                <Row>
                    <Col md={12} lg={3} xl={3} className={'customCol'}>
                        <div className="text-container" style={{display: 'flex', alignItems: 'center'}}>
                            <a href="/"><img src={logo} alt="Logo" style={{width: '100%', maxWidth: '300px'}}/></a>
                            {/*<p><span className={'logo'}><a href="/">Exprome</a></span></p>*/}
                            {/*<p>поздравление от звезды</p>*/}
                            <p></p>
                        </div>
                    </Col>
                    <Col md={12} lg={3} xl={5} className={'customCol'}>
                        <div className="search">
                            <form onSubmit={(e) => searchHandler(e)}>
                                <input
                                    type="text"
                                    placeholder={'Поиск по звездам'}
                                    name={'search'}
                                    onChange={changeHandler1}
                                    value={form.search}
                                />
                                <img src={lupa} alt="Лупа"/>
                            </form>
                        </div>
                    </Col>
                    <Col md={12} lg={6} xl={4} className={'customCol'}>
                        <div className="auth">
                            {determineAuth()}
                            {/*<div onClick={showLoginModal}><span>Вход</span></div>*/}
                            {determineAuth1()}
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal
                isOpen={loginIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <div className="pc-modal-header">
                    <div className={'close-btn'} onClick={closeModal}>
                        <img src={close}
                             alt="Close"
                        />
                    </div>
                    <div className="header-text">
                        <span>Добро пожаловать!</span>
                        <p>Войдите в свой аккаунт, чтобы общаться со звёздами!</p>
                        <div className="mediaLogin-wrapper">
                            <span>Через соцсети</span>
                            <span onClick={vkLogin}><FontAwesomeIcon icon={['fab', 'vk']} size={'lg'}/></span>
                            <span onClick={yaLogin}><FontAwesomeIcon icon={['fab', 'yandex']} size={'lg'}/></span>
                        </div>
                    </div>
                </div>
                <div className="signInInputs spread">
                    <div className="single-input__wrapper">
                        <span>Эл. почта</span>
                        <input
                            type="text"
                            placeholder={'Почта'}
                            onChange={changeHandler}
                            name={'login'}
                            value={form.login}
                        />
                    </div>
                    <div className="single-input__wrapper">
                        <span>Пароль</span>
                        <input
                            type="password"
                            placeholder={'Пароль'}
                            onChange={changeHandler}
                            name={'password'}
                            value={form.password}
                        />
                    </div>
                    <div className="single-input__wrapper mt-3">
                        <span style={{
                            fontSize: '12px',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }} onClick={showForgotModal}>Забыли пароль?</span>
                    </div>
                    <div className="login__btn-wrapper">
                        <div
                            className="pc-signInButton"
                            onClick={loginHandler}
                        >
                            Войти
                        </div>
                        <div className="pc-authButton" onClick={showAuthModal} style={{cursor: 'pointer'}}>
                            Регистрация
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={authIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <div className="pc-modal-header">
                    <div className={'close-btn'} onClick={closeModal}>
                        <img src={close}
                             alt="Close"
                        />
                    </div>
                    <div className="header-text">
                        <span>Добро пожаловать!</span>
                        <p>Зарегистрируйтесь и общайтесь со звёздами!</p>
                        <div className="mediaLogin-wrapper">
                            <span>Через соцсети</span>
                            <span onClick={vkAuth}><FontAwesomeIcon icon={['fab', 'vk']} size={'lg'}/></span>
                            <span onClick={yaAuth}><FontAwesomeIcon icon={['fab', 'yandex']} size={'lg'}/></span>
                        </div>
                    </div>
                </div>
                <div className="signInInputs spread">
                    <div className="single-input__wrapper">
                        <span>Ваш логин</span>
                        <input
                            placeholder={'Логин'}
                            type="text"
                            name={'username'}
                            value={form.username}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="single-input__wrapper">
                        <span>Пароль</span>
                        <input
                            placeholder={'Пароль'}
                            type="password"
                            name={'password'}
                            value={form.password}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="single-input__wrapper">
                        <span>Повторите пароль</span>
                        <input
                            placeholder={'Повтор пароля'}
                            type="password"
                            name={'passwordRepeat'}
                            value={form.passwordRepeat}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="single-input__wrapper">
                        <span>Эл. почта</span>
                        <input
                            placeholder={'E-mail'}
                            type="text"
                            name={'email'}
                            value={form.email}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="single-input__wrapper">
                        <span>Телефон</span>
                        <MaskedInput
                            mask={[/[1-9]/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            placeholder={'7(999)999-99-99'}
                            type="text"
                            name={'phone'}
                            value={form.phone}
                            onChange={changeHandler}
                        />
                    </div>
                    {/*<div className="single-input__wrapper">*/}
                    {/*    <span>Дата рождения</span>*/}
                    {/*    <MaskedInput*/}
                    {/*        mask={[/[0-3]/, /[0-9]/, '-', /[0-1]/, /[0-9]/, '-', /\d/, /\d/, /\d/, /\d/]}*/}
                    {/*        placeholder={'дд-мм-гггг'}*/}
                    {/*        type="text"*/}
                    {/*        name={'date_of_birth'}*/}
                    {/*        value={form.date_of_birth}*/}
                    {/*        onChange={changeHandler}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <p>Нажимая на кнопку, я принимаю условия <a href="/privacy-policy">пользовательского соглашения.</a>
                    </p>

                    <div className="login__btn-wrapper">
                        <div
                            className="pc-signInButton"
                            onClick={registerHandler}
                        >
                            Зарегистрироваться
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={forgotPW}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <div className="pc-modal-header">
                    <div className={'close-btn'} onClick={closeModal}>
                        <img src={close}
                             alt="Close"
                        />
                    </div>
                    <div className="header-text">
                        <span>Введите свой E-mail</span>
                    </div>
                </div>
                <div className="signInInputs spread">
                    <div className="single-input__wrapper">
                        <span>E-mail</span>
                        <input
                            placeholder={'E-mail'}
                            type="text"
                            name={'email'}
                            value={emailForm.email}
                            onChange={mailChangeHandler}
                        />
                    </div>
                    <div className="login__btn-wrapper">
                        <button
                            className="pc-signInButton"
                            onClick={sendRecover}
                            style={{backgroundImage: 'none', fontSize: '16px'}}
                            disabled={loading}
                        >
                            Отправить
                        </button>
                    </div>
                </div>
            </Modal>
            {/*<Modal*/}
            {/*    isOpen={vkIsOpen}*/}
            {/*    onRequestClose={closeModal}*/}
            {/*    contentLabel="Example Modal"*/}
            {/*    style={customStyles}*/}
            {/*>*/}
            {/*    <div className="pc-modal-header">*/}
            {/*        <div className={'close-btn'} onClick={closeModal}>*/}
            {/*            <img src={close}*/}
            {/*                 alt="Close"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="header-text">*/}
            {/*            <span>Введите свой номер телефона</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="signInInputs spread">*/}
            {/*        <div className="single-input__wrapper">*/}
            {/*            <span>Телефон</span>*/}
            {/*            <MaskedInput*/}
            {/*                mask={['+', /[1-9]/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}*/}
            {/*                placeholder={'+7(999)999-99-99'}*/}
            {/*                type="text"*/}
            {/*                name={'phone'}*/}
            {/*                value={form.phone}*/}
            {/*                onChange={changeHandler}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="login__btn-wrapper">*/}
            {/*            <div*/}
            {/*                className="pc-signInButton"*/}
            {/*                onClick={vkAuth}*/}
            {/*            >*/}
            {/*                Зарегистрироваться*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
        </div>
    )
}