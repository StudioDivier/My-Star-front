import React, {useContext, useState} from 'react';
import {useHttp} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/AuthContext";
import {useHistory} from 'react-router-dom';
import MaskedInput from "react-text-mask";
import backArrow from '../../../../img/back-arrow.svg';
import {useMessage} from "../../../../hooks/message.hook";

export const YaRedirect = () => {

    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    const auth = useContext(AuthContext);
    const history = useHistory();
    const message = useMessage();
    const [form, setForm] = useState({});
    const {request} = useHttp();

    const proceedAuth = async () => {
        try {
            const dataAuth = await request(`/api/mid-yandex/?code=${code}`, 'GET')
            console.log(dataAuth)
            const dataSend = await request(`/api/yandex-oauth/`, 'POST', {
                access_token: dataAuth.access_token,
                expires_in: dataAuth.expires_in,
                refresh_token: dataAuth.refresh_token,
                phone: form.phone.replace(/[^0-9]/g, '')
            })

            auth.login(dataSend.token, dataSend.username, dataSend.is_star, dataSend.id);
            if (dataSend.username === ["Это поле должно быть уникально."]) {
                message(['Вы уже зарегистрированы!'])
            }
            history.push('/')
            window.location.reload()
        } catch (e) {
            message(e);
        }

    }

    const finishLogin = async () => {
        try {
            const dataAuth = await request(`/api/mid-yandex/?code=${code}`, 'GET')
            const dataSend1 = await request(`/api/yandex-login/`, 'POST', {
                access_token: dataAuth.access_token,
                expires_in: dataAuth.expires_in,
                refresh_token: dataAuth.refresh_token
            })
            auth.login(dataSend1.token, dataSend1.username, dataSend1.is_star, dataSend1.id);
            history.push('/')
            window.location.reload()
        } catch (e) {
            message(e)
        }
    }

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value}))
    }

    return (
        <>
            <div className="nav-header">
                <div className={'icon-container'}>
                    <a href={'/'}>
                        <img src={backArrow} alt="Back button"/>
                    </a>
                </div>
                <div>
                    <h3>Введите свой номер телефона</h3>
                </div>
            </div>
            <div className={'inputBox'}>

                <MaskedInput
                    mask={['+', /[1-9]/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                    placeholder={'+7(999)999-99-99'}
                    type="text"
                    name={'phone'}
                    value={form.phone}
                    onChange={changeHandler}
                    style={{color: 'white'}}
                />
            </div>
            <div className="turnIn-data">
                <div className="btn-wrapper">
                    <button
                        className={"signInButton"}
                        type={'button'}
                        onClick={proceedAuth}
                    >
                        Продолжить регистрацию
                    </button>
                    <button
                        className={"signInButton"}
                        type={'button'}
                        onClick={finishLogin}
                    >
                        Я уже зарегистрирован
                    </button>
                </div>
                <p>Совершая заказ, вы соглашаетесь с условиями</p>
            </div>
        </>
    )

}