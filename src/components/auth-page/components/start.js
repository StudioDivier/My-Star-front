import React from "react";
import logo from '../../../img/logo.png';
import '../auth-page.scss';
import {Link} from 'react-router-dom';

export const Start = () => {
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
            <div className="authButtons">
                <div>
                    <Link to={'/sign-in'}><button>Войти</button></Link>
                </div>
                <div>
                    <Link to={'/sign-up'}><button>Зарегистрироваться</button></Link>
                </div>
            </div>
            <div className={'authPage__footer'}>
                <p>© 2020 MyStar. All rights reserved.</p>
            </div>
        </>
    )
}