import React, {useState, useContext, useEffect} from "react";
import '../auth-page.scss';
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hook";
import {useHistory} from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import {useMessage} from "../../../hooks/message.hook";

export const SignUp = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {request, error, clearError} = useHttp();

    const [form, setForm] = useState({
        email: '', password: '', phone: '', username: '', date_of_birth: ''
    })

    // const [] = useState({
    //     day: '', month: '', year: ''
    // })


    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value}))
    }


    const registerHandler = async () => {
        try {

            const dataAuth = await request('/api/registration/', 'POST', {...form
                //'username': form.username,
                //'date_of_birth': `${date.year}-${dat}`
            })
            message(dataAuth.phone)
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
                <MaskedInput
                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    placeholder={'ТЕЛЕФОН'}
                    type="text"
                    name={'phone'}
                    value={form.phone}
                    onChange={changeHandler}
                />
                <MaskedInput
                    mask={[/[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
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