import React from 'react';
import './order.scss';
import marker from '../../../img/order_icons/chosenOne.svg';
// import {useHistory} from 'react-router-dom';
// import {StarsContext} from "../../../context/StarsContext";
// import {useHttp} from "../../../hooks/http.hook";
// import {useMessage} from "../../../hooks/message.hook";
// import {AuthContext} from "../../../context/AuthContext";

export const SingleOrder = ({bgColor, date, comment, forWhom, price, status, name, key}) => {
    // const history = useHistory();
    // const star = useContext(StarsContext);
    // const authToken = useContext(AuthContext)
    // const message = useMessage();
    // const {request} = useHttp();


    // const chooseStar = () => {
    // star.setStarId(id)
    // star.setStarPrice(price)
    // star.setStarName(name)
    // star.setStarRating(rating)
    // star.setStarDays(days)
    // star.setAvatar(avatar)
    // history.push(`/orders/order`);
    // console.log(id)
    // };

    const parsedStatus = (status) => {
        switch (status) {
            case 0:
                return 'Новый';
            case 1:
                return 'Принят';
            case -1:
                return 'Отклонен';
            case 2:
                return 'Ожидание оплаты';
            case 3:
                return 'Оплачено';
            default:
                return '';
        }
    }
    const statusColor = (status) => {
        switch (status) {
            case 0:
                return '#e5e5e5';
            case 1:
                return '#e9d88b';
            case -1:
                return '#f7b9b9';
            case 2:
                return '#cdc4ec';
            case 3:
                return '#d2e8c2';
            default:
                return '';
        }
    }

    const overlayHandler = (comment) => {
        if (document.getElementById(comment).classList.contains('hidden')) {
            document.getElementById(comment).classList.add('active')
        } else {
            document.getElementById(comment).classList.add('hidden')
        }
    }

    return (
        // <a onClick={chooseStar}>
        <div className={'order-card'} style={{backgroundImage: bgColor}} onClick={overlayHandler}>
            <div className="status">
                <span>Статус: </span>
                <span className={'stage'} style={{backgroundColor: statusColor(status)}}>{parsedStatus(status)}</span>
            </div>
            <div className="main-info">
                <div className="wrapper">
                    <span>Заказчик: <span style={{fontWeight: 700}}>{name}</span></span>
                    <span>Дата: <span style={{fontWeight: 700}}>{date}</span></span>
                </div>
                <button>Перейти к заказу</button>
            </div>
            <div className="overlay hidden" id={comment}>
                <div className="wrapper">
                    <img src={marker} alt=""/>
                </div>
            </div>
        </div>
        // /a>
    )
}