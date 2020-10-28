import React, {useContext, useEffect} from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import './navbar.scss';
import close from '../../img/order_icons/close.svg';
import {AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";


export const NavBar = () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL1;
    const authData = useContext(AuthContext);
    // console.log(authData)

    useEffect(() => {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    })

    const bgUrl = `${SERVER_URL}/${authData.avatar}`;
    // const bgUrl = 'http://127.0.0.1:8080/' + authData.avatar;
    // console.log(data)

    const hashTagLink = '#';

    return (
        <ul id="slide-out" className="sidenav">
            <li className={'closeBtn'}>
                <a href={hashTagLink} className="sidenav-close"><img src={close} alt=""/></a>
            </li>
            <li className={'account-belongs-to'}>
                <div className="account-info">
                    <div
                        className="avatar-img"
                        style={{backgroundImage: `url(${bgUrl})`}}
                    />
                    <div className={'bio'}>
                        <h5>{authData.userName}</h5>
                        <span>{authData.email}</span>
                    </div>
                </div>
            </li>
            <li className="sidenav-close"><Link to="/profile">Личный кабинет</Link></li>
            <li className="sidenav-close"><Link to="/orders">Мои заказы</Link></li>
            <li className="sidenav-close"><Link to="/policy">Политика конфиденциальности</Link></li>
            <li className="sidenav-close"><Link to="/about">О компании</Link></li>
        </ul>
    )
}