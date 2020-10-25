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

export const Header = () => {


    const history = useHistory();

    const [loginIsOpen, setLoginIsOpen] = useState(false);
    const [authIsOpen, setAuthIsOpen] = useState(false);

    const message = useMessage();
    const auth = useContext(AuthContext);
    const {request, error, clearError} = useHttp();

    const [form, setForm] = useState({
        password: '', email: ''
    })
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
            history.push('/account-page');
            closeModal();
        } catch (e) {
            message(e);
        }
    }

    const registerHandler = async () => {
        try {
            const dataAuth = await request('/api/registration/', 'POST', {
                ...form
            })
            if (Object.keys(dataAuth).length !== 1) {
                setTimeout(() => {
                    for (let e in dataAuth) {
                        message(e + ' : ' + dataAuth[e][0]);
                    }
                }, 555)

            }
            const dataLog = await request('/api/login/', 'POST', {...form})

// console.log(dataAuth)
// auth.login(dataAuth.token, form.username, dataAuth.is_star)
            auth.login(dataLog.token, dataLog.username, dataLog.is_star, dataLog.id);
            // message('Вы зарегистрированы!')

// console.log(dataAuth.token.valueOf())
        } catch (e) {
            message(e);
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

    return (
        <div className="pc-header">
            <Container>
                <Row>
                    <Col lg={5} className={'customCol'}>
                        <div className="text-container">
                            <p><span className={'logo'}><a href="/">Exprome</a></span></p>
                            <p>поздравление от звезды</p>
                        </div>
                    </Col>
                    <Col lg={4} className={'customCol'}>
                        <div className="search">
                            <input type="text" placeholder={'Поиск по звездам'}/>
                            <img src={lupa} alt="Лупа"/>
                        </div>
                    </Col>
                    <Col lg={3} className={'customCol'}>
                        <div className="auth">
                            <div onClick={showLoginModal}><span>Вход</span></div>
                            <div onClick={showAuthModal}><span style={{color: 'white'}}>Регистрация</span></div>
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
                            <span><FontAwesomeIcon icon={['fab', 'vk']} size={'lg'}/></span>
                            <span><FontAwesomeIcon icon={['fab', 'facebook-f']} size={'lg'}/></span>
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
                            name={'email'}
                            value={form.email}
                        />
                    </div>
                    <div className="single-input__wrapper">
                        <span>Пароль</span>
                        <input
                            type="text"
                            placeholder={'Пароль'}
                            onChange={changeHandler}
                            name={'password'}
                            value={form.password}
                        />
                    </div>
                    <div className="login__btn-wrapper">
                        <div
                            className="pc-signInButton"
                            onClick={loginHandler}
                        >
                            Войти
                        </div>
                        <div className="pc-authButton" onClick={showAuthModal}>
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
                            <span><FontAwesomeIcon icon={['fab', 'vk']} size={'lg'}/></span>
                            <span><FontAwesomeIcon icon={['fab', 'facebook-f']} size={'lg'}/></span>
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
                            type="text"
                            name={'password'}
                            value={form.password}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="single-input__wrapper">
                        <span>Повторите пароль</span>
                        <input
                            placeholder={'Повтор пароля'}
                            type="text"
                            name={'passwordRepeat'}
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
                            mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                            placeholder={'(999)999-99-99'}
                            type="text"
                            name={'phone'}
                            value={form.phone}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="single-input__wrapper">
                        <span>Дата рождения</span>
                        <MaskedInput
                            mask={[/[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            placeholder={'гггг-мм-дд'}
                            type="text"
                            name={'date_of_birth'}
                            value={form.date_of_birth}
                            onChange={changeHandler}
                        />
                    </div>

                    <p>Нажимая на кнопку, я принимаю условия <a href="#">пользовательского соглашения.</a></p>

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
        </div>
    )
}