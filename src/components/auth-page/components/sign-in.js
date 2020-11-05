import React, {useState, useContext, useEffect} from "react";
import '../auth-page.scss';
// import logo from '../../../img/logo.png';
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hook";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useHistory} from 'react-router-dom';
import {useMessage} from "../../../hooks/message.hook";
import Modal from "react-modal";
import close from '../../../img/close.png';


export const SignIn = () => {
    const history = useHistory();
    const message = useMessage();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [yaLink, setYaLink] = useState('')
    const [vkLink, setVkLink] = useState('')

    const [form, setForm] = useState({
        password: '', login: ''
    })

    // useEffect(() => {
    //     message(error);
    //     clearError();
    // }, [error, message, clearError])

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value.toLowerCase()}))
    }

    useEffect(() => {
        async function fetchYaLink() {
            const YaLink = await request('/api/pre-yandex-oauth/', 'GET')
            setYaLink(YaLink.link)
        }

        async function fetchVkLink() {
            const VkLink = await request('/api/pre-vk-oauth/', 'GET')
            setVkLink(VkLink.link)
        }

        fetchYaLink();
        fetchVkLink()
    }, [])

    // const vkLogin = async () => {
    //     try {
    //         const dataAuth1 = await request('/api/pre-vk-oauth/', 'GET')
    //         window.open(`${dataAuth1.link}`).focus();
    //     } catch (e) {
    //         message(e);
    //     }
    // }
    // const yaLogin = async () => {
    //     try {
    //         const dataAuth1 = await request('/api/pre-yandex-oauth/', 'GET')
    //         // console.log(dataAuth1)
    //         window.open(`${dataAuth1.link}`).focus();
    //     } catch (e) {
    //         message(e);
    //     }
    // }

    const vkLogin = () => {
        window.open(`${vkLink}`).focus();
    }
    const yaLogin = () => {
        window.open(`${yaLink}`).focus();
    }

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
                history.push('/categories');
            } catch (e) {
                message(e);
                history.push('/sign-in');
                // console.log(e);
            }
        } else {
            message(['Заполните все поля!'])
        }
    }

    // Modal

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
            padding: '30px'
        }
    };

    const showModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(!modalIsOpen);
    }

    Modal.setAppElement(document.querySelector('.App'))


    return (
        <>
            <div className={'header'}>
                <div className={'header__wrapper'}>
                    {/*<img src={logo} alt="logo"/>*/}
                    <div className="text-container">
                        <div>
                            <p>EXPROME</p>
                            <p>поздравление от звезды</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="signInInputs">
                <input
                    type="text"
                    placeholder={'Почта или логин'}
                    onChange={changeHandler}
                    name={'login'}
                    value={form.login}
                />
                <input
                    type="password"
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
            <div className="socialMediaLogin">
                <hr/>
                <div className={'buttonContainer'}>
                    <span onClick={showModal}>Другие способы</span>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <div className="modal-header">
                    <button className={'close-btn'} onClick={closeModal}>
                        <img src={close}
                             alt="Close"
                        />
                    </button>
                    <div className="header-text">
                        <span>Войдите через соцсети</span>
                    </div>
                </div>
                <div className="spread">
                    <div className="socialMediaLogin">
                        <div className={'buttonContainer'}>
                            <button onClick={yaLogin}>
                                <FontAwesomeIcon size='lg' icon={['fab', 'yandex']}/>&nbsp;&nbsp;яндекс
                            </button>
                            <button onClick={vkLogin}>
                                <FontAwesomeIcon size='lg' icon={['fab', 'vk']}/>&nbsp;&nbsp;вконтакте
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}