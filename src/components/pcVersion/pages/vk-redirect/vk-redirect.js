import React, {useContext, useState} from 'react';
import {useHttp} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/AuthContext";
import {useHistory} from 'react-router-dom';
import MaskedInput from "react-text-mask";
import backArrow from '../../../../img/back-arrow.svg';
import {useMessage} from "../../../../hooks/message.hook";

export const VkRedirect = () => {

    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    const auth = useContext(AuthContext);
    const history = useHistory();
    const message = useMessage();
    const [form, setForm] = useState({});
    const {request} = useHttp();

    const proceedAuth = async () => {
        try {
            const dataAuth = await request(`/api/mid-vk/?code=${code}`, 'GET')

            const dataSend = await request(`/api/vk-oauth/`, 'POST', {
                access_token: dataAuth.access_token,
                phone: form.phone.replace(/[^0-9]/g, ''),
                email: dataAuth.email
            })

            auth.login(dataSend.token, dataSend.username, dataSend.is_star, dataSend.id);
            history.push('/')
            window.location.reload()
        } catch (e) {
            message(e);
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
                <button
                    className={"signInButton"}
                    type={'button'}
                    onClick={proceedAuth}
                >
                    Продолжить регистрацию
                </button>
                <p>Совершая заказ, вы соглашаетесь с условиями</p>
            </div>
        </>
    )

}