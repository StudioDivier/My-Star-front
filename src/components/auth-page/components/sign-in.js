import React, {useState, useContext, useEffect} from "react";
import '../auth-page.scss';
// import logo from '../../../img/logo.png';
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hook";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useHistory} from 'react-router-dom';
import {useMessage} from "../../../hooks/message.hook";

//
export const SignIn = () => {
    const history = useHistory();
    const message = useMessage();
    const auth = useContext(AuthContext);
    const {request, error, clearError} = useHttp();


    const [form, setForm] = useState({
        password: '', email: ''
    })

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

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
                    message([e +' : '+ dataLog[e][0]]);
                }
            }
            history.push('/categories');
        } catch (e) {
            message(e);
            history.push('/sign-in');
            // console.log(e);
        }
    }

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
            <div className="socialMediaLogin">
            <hr/>
                <div className={'buttonContainer'}>
                    <button>
                         <FontAwesomeIcon size='lg' icon={['fab', 'google']} />&nbsp;&nbsp;google
                    </button>
                    <button>
                        <FontAwesomeIcon size='lg' icon={['fab', 'vk']} />&nbsp;&nbsp;вконтакте
                    </button>
                </div>
            </div>
        </>
    )
}