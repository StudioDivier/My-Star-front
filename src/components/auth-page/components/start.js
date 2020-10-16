import React from "react";
// import logo from '../../../img/logo.png';
import '../auth-page.scss';
import {Link} from 'react-router-dom';

export const Start = () => {
    return (
        <>
            <div className={'header'}>
                <div className={'header__wrapper'}>
                    {/*<img src={logo} alt="logo"/>*/}
                    <div className="text-container">
                        <p><span>MY</span> <span>STAR</span></p>
                        <p>поздравление от звезды</p>
                    </div>
                </div>
            </div>
            <div className="authButtons">
                <div>
                    <Link to={'/sign-in'}>
                        <button style={{backgroundColor: 'white', color: '#070C3A', fontWeight: '700', fontSize: '18px' }}>Войти</button>
                    </Link>
                    <Link to={'/sign-up'}>
                        <button>Зарегистрироваться</button>
                    </Link>
                </div>
            </div>
            <div className={'authPage__footer'}>
                <p>© 2020 MyStar. All rights reserved.</p>
            </div>
        </>
    )
}