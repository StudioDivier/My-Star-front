import React, {useContext, useState} from 'react';
import './order.scss';
import {useHistory} from 'react-router-dom';
import {StarsContext} from "../../../context/StarsContext";
import {useHttp} from "../../../hooks/http.hook";
import {useMessage} from "../../../hooks/message.hook";
import {AuthContext} from "../../../context/AuthContext";

export const SingleOrder = ({bgColor}) => {
    const history = useHistory();
    const star = useContext(StarsContext);
    const authToken = useContext(AuthContext)
    const message = useMessage();
    const {request} = useHttp();


    const chooseStar = () => {
        // star.setStarId(id)
        // star.setStarPrice(price)
        // star.setStarName(name)
        // star.setStarRating(rating)
        // star.setStarDays(days)
        // star.setAvatar(avatar)
        // history.push(`/orders/order`);
        // console.log(id)
    };

    return (
        // <a onClick={chooseStar}>
            <div className={'order-card'} style={{backgroundImage: bgColor}}>
                <div className="status">
                    <span>Статус: </span>
                    <span className={'stage'}> Новая</span>
                </div>
                <div className="main-info">
                    <div className="wrapper">
                        <span>Заказчик: <span style={{fontWeight: 700}}>Тихонов Иван</span></span>
                        <span>Дата: <span style={{fontWeight: 700}}>30.09.2020</span></span>
                    </div>
                    <button>Перейти к заказу</button>
                </div>
            </div>
        // /a>
    )
}