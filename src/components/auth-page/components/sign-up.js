import React from "react";
import '../auth-page.scss';
import logo from '../../../img/logo.png';
import {Link} from 'react-router-dom';

export const SignUp = () => {

    return (
        <>
            <h3>Регистрация</h3>
            <div className={'inputBox'}>
                <input placeholder={'ЛОГИН'} type="text"/>
                <input placeholder={'ПАРОЛЬ'} type="text"/>
                <input placeholder={'ПОВТОР ПАРОЛЯ'} type="text"/>
                <input placeholder={'E-MAIL'} type="text"/>
                <input placeholder={'ТЕЛЕФОН'} type="text"/>
            </div>
            <div className="usersConsent">
                <input type="checkbox"/>
                <span>Согласен на обработку данных</span>
            </div>
            <div className="signInButton">
                <button>Зарегистрироваться</button>
            </div>
        </>
    )
}