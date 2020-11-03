import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../../../../hooks/http.hook";
// import {useMessage} from "../../../../hooks/message.hook";
import {AuthContext} from "../../../../context/AuthContext";
import {useHistory} from 'react-router-dom';
import MaskedInput from "react-text-mask";
import backArrow from '../../../../img/back-arrow.svg'

export const YaRedirect = ({phone}) => {
    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    const auth = useContext(AuthContext);
    console.log(phone)

    // const message = useMessage();
    const history = useHistory();
    const [form, setForm] = useState({});
    const {request} = useHttp();

    const storageName = 'tempUserData';
    // const tempUserData = JSON.parse(window.localStorage.getItem('tempUserData'));

    const proceedAuth = () => {
        // try {
        async function fetchData() {
            const dataAuth = await request(`/api/mid-yandex/?code=${code}`, 'GET')
            console.log(dataAuth)

            // localStorage.setItem(storageName, JSON.stringify({
            //     access_token: dataAuth.access_token,
            //     expires_in: dataAuth.expires_in,
            //     refresh_token: dataAuth.refresh_token
            // }))

            // console.log(phone)
            // console.log(dataAuth.access_token)

            const dataSend = await request(`/api/yandex-oauth/`, 'POST', {
                access_token: dataAuth.access_token,
                expires_in: dataAuth.expires_in,
                refresh_token: dataAuth.refresh_token,
                phone: phone
            })

            // console.log(dataSend)

            localStorage.removeItem(storageName)

            // const dataLog = await request('/api/login/', 'POST', {
            //     id: dataSend.id,
            //     username: dataSend.username,
            //     is_star: dataSend.is_star,
            //     email: dataSend.email,
            //     avatar: dataSend.avatar,
            //     token: dataSend.token
            // })

            auth.login(dataSend.token, dataSend.username, dataSend.is_star, dataSend.id);
            // history.push('/')

        }

        // async function fetchData1() {
        // const dataSend = await request(`/api/yandex-oauth/`, 'POST', {
        //     access_token: tempUserData.access_token,
        //     expires_in: tempUserData.expires_in,
        //     refresh_token: tempUserData.refresh_token,
        //     phone: phone
        // })
        // console.log(dataSend)
        //
        // localStorage.removeItem(storageName)
        //
        // // const dataLog = await request('/api/login/', 'POST', {
        // //     id: dataSend.id,
        // //     username: dataSend.username,
        // //     is_star: dataSend.is_star,
        // //     email: dataSend.email,
        // //     avatar: dataSend.avatar,
        // //     token: dataSend.token
        // // })
        //
        // auth.login(dataSend.token, dataSend.username, dataSend.is_star, dataSend.id);
        // history.push('/')
        // }

        fetchData();
        // fetchData1();
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