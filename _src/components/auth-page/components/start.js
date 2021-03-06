import React from "react";
// import logo from '../../../img/logo.png';
import '../auth-page.scss';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

export const Start = () => {

    const history = useHistory();

    function redirect() {
        history.push('/categories')
    }

    return (
        <>
            <div className={'header'}>
                <div className={'header__wrapper'}>
                    {/*<img src={logo} alt="logo"/>*/}
                    <div className="text-container">
                        <p>EXPROME</p>
                        <p>поздравление от звезды</p>
                    </div>
                    {/*<div className="text-container"*/}
                    {/*     style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
                    {/*    <p className={'mb-2'}*/}
                    {/*       style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>EXPROME <img*/}
                    {/*        src={logo} alt="Logo" style={{width: '55px', height: '45px', marginLeft: '15px'}}/></p>*/}
                    {/*    <p style={{textAlign: 'center'}}>поздравление от звезды</p>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className="authButtons">
                <div>
                    <Link to={'/sign-in'}>
                        <button style={{
                            backgroundColor: 'white',
                            color: '#070C3A',
                            fontWeight: '700',
                            fontSize: '18px'
                        }}>Войти
                        </button>
                    </Link>
                    <Link to={'/sign-up'}>
                        <button>Зарегистрироваться</button>
                    </Link>
                    <a href={'/categories'}>
                        <button>Войти без регистрации</button>
                    </a>
                </div>
            </div>
            <div className={'authPage__footer'}>
                <p>© 2020 Exprome. All rights reserved.</p>
            </div>
        </>
    )
}