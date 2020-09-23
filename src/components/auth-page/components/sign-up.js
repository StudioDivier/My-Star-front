import React, {useState, useEffect, useContext} from "react";
import '../auth-page.scss';
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hook";
import {useHistory} from 'react-router-dom';

export const SignUp = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();

    const [form, setForm] = useState({
        email: '', password: '', phone: '', username: '', date_of_birth: ''
    })

    // useEffect(() => {
    //     message(error);
    //     clearError();
    // }, [error, message, clearError])

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value}))
    }


    const registerHandler = async () => {
        try {

            const dataAuth = await request('/api/customer/create/', 'POST', {...form})
            console.log(dataAuth)
            auth.login(dataAuth.token, dataAuth.username, dataAuth.is_star)
            // console.log(dataAuth.token.valueOf())
            history.push('/categories');
        } catch (e) {}
      }

    return (
        <>
            <h3>Регистрация</h3>
            <div className={'inputBox'}>
                <input
                    placeholder={'ЛОГИН'}
                    type="text"
                    name={'username'}
                    value={form.username}
                    onChange={changeHandler}
                />
                <input
                    placeholder={'ПАРОЛЬ'}
                    type="text"
                    name={'password'}
                    value={form.password}
                    onChange={changeHandler}
                />
                <input
                    placeholder={'ПОВТОР ПАРОЛЯ'}
                    type="text"
                    name={'passwordRepeat'}
                />
                <input
                    placeholder={'E-MAIL'}
                    type="text"
                    name={'email'}
                    value={form.email}
                    onChange={changeHandler}
                />
                <input
                    placeholder={'ТЕЛЕФОН'}
                    type="text"
                    name={'phone'}
                    value={form.phone}
                    onChange={changeHandler}
                />
                <input
                    placeholder={'ДАТА РОЖДЕНИЯ'}
                    type="text"
                    name={'date_of_birth'}
                    value={form.date_of_birth}
                    onChange={changeHandler}
                />
            </div>
            <div className="usersConsent">
                <input type="checkbox"/>
                <span>Согласен на обработку данных</span>
            </div>
            <div className="signInButton">
                <button
                    onClick={registerHandler}
                >
                    Зарегистрироваться
                </button>
            </div>
        </>
    )
}