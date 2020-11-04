import React, {useState, useContext} from "react";
import '../auth-page.scss';
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hook";
import {useHistory} from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import {useMessage} from "../../../hooks/message.hook";
import backArrow from '../../../img/back-arrow.svg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const SignUp = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {request} = useHttp();

    const [form, setForm] = useState({
        email: '', password: '', phone: '', username: '', date_of_birth: ''
    })

    const [consent, setConsent] = useState(false);

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
    function reverseDate(str) {
        return str.split('-').reverse().join('-')
    }

    // Transform phone
    // function transformPhone(str) {
    //     return str.slice();
    // }


    const registerHandler = async () => {
        try {
            if (consent) {
                const dataAuth = await request('/api/registration/', 'POST', {
                    // ...form
                    email: form.email,
                    password: form.password,
                    phone: form.phone.replace(/[^0-9]/g, ''),
                    username: form.username,
                    date_of_birth: reverseDate(form.date_of_birth)
                })
                if (Object.keys(dataAuth).length !== 1) {
                    setTimeout(() => {
                        for (let e in dataAuth) {
                            message([e + ' : ' + dataAuth[e][0]]);
                        }
                    }, 555)

                }
                const dataLog = await request('/api/login/', 'POST', {...form})

// console.log(dataAuth)
// auth.login(dataAuth.token, form.username, dataAuth.is_star)
                auth.login(dataLog.token, dataLog.username, dataLog.is_star, dataLog.id);
                if (dataLog.token) {
                    message('Вы зарегистрированы!')
                }
                history.push('/categories')
            } else {
                let customMessage = 'Необходимо согласие на обработку данных';
                message([customMessage])
            }
// console.log(dataAuth.token.valueOf())
        } catch (e) {
            message([e]);
            history.push('/sign-up')
        }
    }

    const user_agreement = () => {
        if (!consent) {
            setConsent(true)
        } else {
            setConsent(false)
        }
    }

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
                />
                <input
                    placeholder={'E-mail'}
                    type="text"
                    name={'email'}
                    value={form.email}
                    onChange={changeHandler}
                />
                <MaskedInput
                    mask={['+', /[1-9]/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                    placeholder={'+7(999)999-99-99'}
                    type="text"
                    name={'phone'}
                    value={form.phone}
                    onChange={changeHandler}
                />
                <MaskedInput
                    mask={[/[0-3]/, /[0-9]/, '-', /[0-1]/, /[0-9]/, '-', /\d/, /\d/, /\d/, /\d/]}
                    placeholder={'дд-мм-гггг'}
                    type="text"
                    name={'date_of_birth'}
                    value={form.date_of_birth}
                    onChange={changeHandler}
                />
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
                    <button>
                        <FontAwesomeIcon size='lg' icon={['fab', 'yandex']}/>&nbsp;&nbsp;яндекс
                    </button>
                    <button>
                        <FontAwesomeIcon size='lg' icon={['fab', 'vk']}/>&nbsp;&nbsp;вконтакте
                    </button>
                </div>
            </div>
        </>
    )
}