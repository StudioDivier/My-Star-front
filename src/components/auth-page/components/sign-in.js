import React, {useState, useContext, useEffect} from "react";
import '../auth-page.scss';
import logo from '../../../img/logo.png';
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
            auth.login(dataLog.token, dataLog.username, dataLog.is_star, dataLog.id);
            for (let i in dataLog) {
                console.log(typeof (dataLog[i][0]))
            }

            history.push('/categories');
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className={'header'}>
                <div className={'header__wrapper'}>
                    <img src={logo} alt="logo"/>
                    <div className="text-container">
                        <div>
                            <p><span>MY</span> <span>STAR</span></p>
                            <p>поздравление от звезды</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="signInInputs">
                <input
                    type="text"
                    placeholder={'e-mail'}
                    onChange={changeHandler}
                    name={'email'}
                    value={form.email}
                />
                <input
                    type="text"
                    placeholder={'пароль'}
                    onChange={changeHandler}
                    name={'password'}
                    value={form.password}
                />
            </div>
            <div className="signInButton">
                <button
                    onClick={loginHandler}
                >
                    Войти
                </button>
            </div>
            <div className="socialMediaLogin">
                <p>Вход через</p>
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