import React, {useContext, useEffect, useState} from 'react';
import './detail-order.scss';
import {useHttp} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/AuthContext";
import menu from '../../../../img/order_icons/menu.svg';
import like from '../../../../img/order_icons/icon_like.png';
import {NavBar} from "../../../navbar/navbar";
import {useMessage} from "../../../../hooks/message.hook";
// import MaskedInput from "react-text-mask";

export const DetailOrder = () => {

    const message = useMessage();
    const [data, setData] = useState([]);

    const hashTagLink = '#';


    return (
        <>
            <div className="profile">
                <div className="main-wrapper">

                    <div className="profile__info"
                         style={{background: 'linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(' + '' + ')'}}>
                        <div className="header">
                            <div className="header-top">
                                <a href={hashTagLink} data-target="slide-out" className="sidenav-trigger show-on-large">
                                    <img src={menu} alt=""/>
                                </a>
                                <span>Профиль</span>
                            </div>
                            <div className="header-bottom">
                                <h3>{data.username}</h3>
                                <div>
                                    {/*<span>Земля</span> <span>&nbsp; | &nbsp;</span> <span>{years} лет</span>*/}
                                </div>
                                <div className="likes">
                                    <img src={like} alt=""/><span>&nbsp;&nbsp;425</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile__details">
                        <div className="first-name">
                            <div className="wrapper">
                                <span>Имя</span>
                                <span>ugh</span>
                            </div>
                        </div>
                        <div className="last-name">
                            <div className="wrapper">
                                <span>Фамилия</span>
                                <span>ugh</span>
                            </div>
                        </div>
                    </div>
                    <div className="btn-wrapper">
                        <button
                            // onClick={}
                            className={'submitButton'}
                        >
                            Связаться с исполнителем
                        </button>

                    </div>
                </div>

            </div>
            <NavBar/>
        </>
    )
}