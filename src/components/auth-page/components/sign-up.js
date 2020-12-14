import React, {useState, useContext, useEffect} from "react";
import '../auth-page.scss';
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hook";
import {useHistory} from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import {useMessage} from "../../../hooks/message.hook";
import backArrow from '../../../img/back-arrow.svg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import close from '../../../img/close.png';
import swal from 'sweetalert';

export const SignUp = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {request} = useHttp();

    const [form, setForm] = useState({
        email: '', password: '', phone: '', username: '', date_of_birth: '', passwordRepeat: ''
    })

    const [consent, setConsent] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    const [yaLink, setYaLink] = useState('')
    const [vkLink, setVkLink] = useState('')

    // const [] = useState({
    //     day: '', month: '', year: ''
    // })


    // useEffect(() => {
    //     message(error);
    //     clearError();
    // }, [error, message, clearError])

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value.toLowerCase()}))
    }

    // Transform birth year
    // function reverseDate(str) {
    //     return str.split('-').reverse().join('-')
    // }

    // Transform phone
    // function transformPhone(str) {
    //     return str.slice();
    // }


    const registerHandler = async () => {
        try {
            if (consent) {
                if (form.password === form.passwordRepeat) {
                    const dataAuth = await request('/api/registration/', 'POST', {
                        // ...form
                        email: form.email,
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
                    // message(...dataAuth)
                    if (dataAuth[0] === "Подтвердите Ваш Email") {
                        swal("Вы зарегистрированы!", "Вам на почту отправлено письмо для завершения регистрации!", "success", {
                            button: "Закрыть",
                        });
                    } else if (dataAuth.email) {
                        message(['Данная электронная почта уже зарегистрирована!'])
                    }
                    // if (dataAuth.email[0] !== 'Это поле должно быть уникально.' || dataAuth.phone[0] !== 'Это поле должно быть уникально.' || dataAuth.username[0] !== 'Это поле должно быть уникально.') {
                    //     const dataLog = await request('/api/login/', 'POST', {
                    //         login: form.email, password: form.password
                    //     })

                    // console.log(dataAuth)
                    // auth.login(dataAuth.token, form.username, dataAuth.is_star)

                    // auth.login(dataLog.token, dataLog.username, dataLog.is_star, dataLog.id, dataLog.email, dataLog.avatar);
                    // if (dataLog) {
                    //     message(dataLog[0])
                    // }
                    // history.push('/categories')
                    // }

                } else {
                    message(['Введенные пароли не совпадают!'])
                }
            } else {
                let customMessage = 'Необходимо согласие на обработку данных';
                message([customMessage])
            }
// console.log(dataAuth.token.valueOf())
        } catch (e) {
            message([e]);
            // history.push('/sign-up')
        }
    }

    const user_agreement = () => {
        if (!consent) {
            setConsent(true)
        } else {
            setConsent(false)
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

    // const vkAuth = async () => {
    //     try {
    //         const dataAuth = await request('/api/pre-vk-oauth/', 'GET')
    //         // console.log(dataAuth)
    //         window.open(`${dataAuth.link}`).focus();
    //
    //     } catch (e) {
    //         message(e);
    //     }
    // }
    // const yaAuth = async () => {
    //     try {
    //         const dataAuth = await request('/api/pre-yandex-oauth/', 'GET')
    //         // console.log(dataAuth)
    //         window.open(`${dataAuth.link}`).focus();
    //
    //     } catch (e) {
    //         message(e);
    //     }
    // }

    const vkAuth = () => {
        window.open(`${vkLink}`).focus();
    }
    const yaAuth = () => {
        window.open(`${yaLink}`).focus();
    }

    Modal.setAppElement(document.querySelector('.App'))

    return (
        <>
            <div className="nav-header">
                <div className={'icon-container'}>
                    <a href={'/'}>
                        <img src={backArrow} alt="Back button"/>
                        {/*<FontAwesomeIcon icon={['fas', 'arrow-left']} size='2x' color={"white"}/>*/}
                    </a>
                </div>
                <div>
                    <h3>Зарегистрироваться</h3>
                </div>
            </div>
            <div className={'inputBox'}>
                <input
                    placeholder={'Логин'}
                    type="text"
                    name={'username'}
                    value={form.username}
                    onChange={changeHandler}
                />
                <input
                    placeholder={'Пароль'}
                    type="password"
                    name={'password'}
                    value={form.password}
                    onChange={changeHandler}
                />
                <input
                    placeholder={'Повтор пароля'}
                    type="password"
                    name={'passwordRepeat'}
                    value={form.passwordRepeat}
                    onChange={changeHandler}
                />
                <input
                    placeholder={'E-mail'}
                    type="text"
                    name={'email'}
                    value={form.email}
                    onChange={changeHandler}
                />
                <MaskedInput
                    mask={[/[1-9]/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                    placeholder={'7(999)999-99-99'}
                    type="text"
                    name={'phone'}
                    value={form.phone}
                    onChange={changeHandler}
                />
                {/*<MaskedInput*/}
                {/*    mask={[/[0-3]/, /[0-9]/, '-', /[0-1]/, /[0-9]/, '-', /\d/, /\d/, /\d/, /\d/]}*/}
                {/*    placeholder={'дд-мм-гггг'}*/}
                {/*    type="text"*/}
                {/*    name={'date_of_birth'}*/}
                {/*    value={form.date_of_birth}*/}
                {/*    onChange={changeHandler}*/}
                {/*/>*/}
            </div>
            <div className="turnIn-data">
                <div className="usersConsent">
                    <label>
                        <input className="form-check-input" type="checkbox" value="" id="agreement"
                               onClick={user_agreement}/>
                        <span className="form-check-label">Согласен на обработку данных</span>
                    </label>
                </div>
                <button
                    className={"signInButton"}
                    type={'button'}
                    onClick={registerHandler}
                >
                    Зарегистрироваться
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
                            <button onClick={yaAuth}>
                                <FontAwesomeIcon size='lg' icon={['fab', 'yandex']}/>&nbsp;&nbsp;яндекс
                            </button>
                            <button onClick={vkAuth}>
                                <FontAwesomeIcon size='lg' icon={['fab', 'vk']}/>&nbsp;&nbsp;вконтакте
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}