import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";

export const ConfirmReg = () => {

    let urlParams = new URLSearchParams(window.location.search);
    let username = urlParams.get('username');
    let confirm = urlParams.get('confirm');
    let token = urlParams.get('token');
    const auth = useContext(AuthContext);
    const history = useHistory();
    const message = useMessage();
    const {request} = useHttp();

    const proceedAuth = async () => {
        try {
            const dataAuth = await request(`/api/registration-confirm/?username=${username}&confirm=${confirm}&token=${token}`, 'GET')
            console.log(dataAuth)

            auth.login(dataAuth.token, dataAuth.username, dataAuth.is_star, dataAuth.id, dataAuth.email, dataAuth.avatar);
            history.push('/')
            window.location.reload()
        } catch (e) {
            message(e);
        }
    }

    return (
        <>
            <div className="nav-header">
                {/*<div className={'icon-container'}>*/}
                {/*    <a href={'/'}>*/}
                {/*        <img src={backArrow} alt="Back button"/>*/}
                {/*    </a>*/}
                {/*</div>*/}
                <div>
                    <h3>Завершите регистрацию</h3>
                </div>
            </div>

            <div className="turnIn-data">
                <div className="btn-wrapper" style={{textAlign: 'center'}}>
                    <button
                        className={"signInButton"}
                        type={'button'}
                        onClick={proceedAuth}
                    >
                        Регистрация
                    </button>
                </div>
                <p>Совершая заказ, вы соглашаетесь с условиями</p>
            </div>

        </>
    )
}