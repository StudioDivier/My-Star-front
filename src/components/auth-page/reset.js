import React, {useState, useEffect} from "react";
import './auth-page.scss';
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import backArrow from '../../img/back-arrow.svg';


export const Reset = () => {
    const message = useMessage();
    const {request, error, clearError} = useHttp();

    let urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');

    const [form, setForm] = useState({
        password: '', token: token
    })

    const [consent, setConsent] = useState(false);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value}))
    }


    const registerHandler = async () => {
        try {
            if (consent) {
                const dataAuth = await request('/password-reset/confirm/', 'POST', {
                    ...form
                })
                if (Object.keys(dataAuth).length !== 1) {
                    setTimeout(() => {
                        for (let e in dataAuth) {
                            message(e + ' : ' + dataAuth[e][0]);
                        }
                    }, 555)

                }

                message('Пароль изменен!!')
            } else {
                let customMessage = 'Необходимо согласие на обработку данных';
                message([customMessage])
            }

        } catch (e) {
            message(e);
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
                    </a>
                </div>
                <div>
                    <h3>Смена пароля</h3>
                </div>
            </div>
            <div className={'inputBox'}>

                <input
                    placeholder={'Новый пароль'}
                    type="text"
                    name={'password'}
                    value={form.email}
                    onChange={changeHandler}
                />
                <input
                    placeholder={'Повтор пароля'}
                    type="text"
                    name={'passwordRepeat'}
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
                    Поменять пароль
                </button>
                <p>Совершая заказ, вы соглашаетесь с условиями</p>
            </div>
        </>
    )
}