import React, {useState, useEffect, useContext} from "react";
import '../auth-page.scss';
import logo from '../../../img/logo.png';
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hook";

export const SignIn = () => {

    const [form, setForm] = useState({
        email: '', password: ''
    })
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();

    // useEffect(() => {
    //     message(error);
    //     clearError();
    // }, [error, message, clearError])

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value}))
    }

    console.log(form)

    const registerHandler = async () => {
        try {
            console.log({...form})
          //const dataReg = await request('/api/auth/register', 'POST', {...form})
          // message(dataReg.message)

          //const dataLogin = await request('/api/auth/login', 'POST', {...form})
          // auth.login(dataLogin.token, dataLogin.userId)

        } catch (e) {}
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
            <div className="authInputs">
                <input
                    type="text"
                    placeholder={'почта'}
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
                    onClick={registerHandler}
                >
                    Войти
                </button>
            </div>
        </>
    )
}