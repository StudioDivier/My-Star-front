import React, {useEffect} from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import './navbar.scss';
import photo from '../../img/background-image.png';
import close from '../../img/order_icons/close.svg';

export const NavBar = () => {
    useEffect(() => {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    })

    // const bgUrl = 'http://192.168.1.131:8080' + avatar;

    return (
        <ul id="slide-out" className="sidenav">
            <li className={'closeBtn'}>
                <a href="#" className="sidenav-close"><img src={close} alt=""/></a>
            </li>
            <li className={'account-belongs-to'}>
                <div className="account-info">
                    <div
                        className="avatar-img"
                        style={{backgroundImage: "url(" + photo + ")"}}
                    />
                    <div className={'bio'}>
                        <h5>Мария Куприна</h5>
                        <span>maria_kuprina@mail.ru</span>
                    </div>
                </div>
            </li>
            <li><a href="/profile">Личный кабинет</a></li>
            <li><a href="/orders">Мои заказы</a></li>
            <li><a href="/policy">Политика конфиденциальности</a></li>
            <li><a href="/about">О компании</a></li>
        </ul>
    )
}