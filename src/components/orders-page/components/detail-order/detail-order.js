import React, {useContext, useEffect, useState} from 'react';
import './detail-order.scss';
import {useHttp} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/AuthContext";
import menu from '../../../../img/order_icons/menu.svg';
import like from '../../../../img/order_icons/icon_like.png';
import {NavBar} from "../../../navbar/navbar";
import {useMessage} from "../../../../hooks/message.hook";
// import MaskedInput from "react-text-mask";

export const DetailOrder = ({isActive, details, setActive}) => {

    const message = useMessage();
    const [data, setData] = useState([]);

    const hashTagLink = '#';

    if (isActive) {
        return (
            <>
                <div className="profile">
                    <div className="main-wrapper">

                        <div className="profile__info"
                             style={{background: 'linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(' + '' + ')'}}>
                            <div className="header">
                                <div className="header-top">
                                    <a href={hashTagLink} data-target="slide-out"
                                       className="sidenav-trigger show-on-large">
                                        <img src={menu} alt=""/>
                                    </a>
                                    <span>Страница заказа</span>
                                    <span className={'closeOrder'} onClick={() => setActive(false)}>&times;</span>
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

                            <div className="info-row">
                                <div className="wrapper">
                                    <span>Дата</span>
                                    <span>{details.date}</span>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="wrapper">
                                    <span>Время</span>
                                    <span>{details.time}</span>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="wrapper">
                                    <span>Комментарий</span>
                                    <span>{details.comment}</span>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="wrapper">
                                    <span>Кому</span>
                                    <span>{details.forWhom}</span>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="wrapper">
                                    <span>Имя заказчика</span>
                                    <span>{details.name}</span>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="wrapper">
                                    <span>Цена</span>
                                    <span>{details.price}</span>
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
                            <p>Совершая заказ, вы соглашаетесь с условиями</p>
                        </div>
                    </div>

                </div>
                <NavBar/>
            </>
        )
    }
    return []
}