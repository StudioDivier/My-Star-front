import React, {useContext} from 'react';
import {StarsContext} from "../../context/StarsContext";
import './order.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import priceTag from '../../img/order_icons/priceTag.png';
import stars from '../../img/order_icons/stars.png';
import time from '../../img/order_icons/time.png';
import menu from '../../img/order_icons/menu.png';
import account from '../../img/order_icons/account.png';

export const Order = () => {
    const starInfo = useContext(StarsContext);
    const history = useHistory();
    console.log(starInfo)

    const url = 'http://192.168.1.131:8080';
    const avatar = url + starInfo.starAvatar;

    return (
        <>
            <div className="order">
                <div className="chosen-star">
                    <div className="chosen-star__info" style={{background: 'linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(' + avatar +')'}}>
                        <div className="header">
                            <div className="header-top">
                                <img src={menu} alt=""/>
                                <span>Профиль</span>
                                <img src={account} alt=""/>
                            </div>
                            <div className="header-bottom">
                                <h3>{starInfo.starName}</h3>
                                <span>Хип-хоп исполнитель</span>
                            </div>
                        </div>
                        {/*<img src={url + starInfo.starAvatar} alt={'star'}/>*/}
                    </div>
                    <div className="order__details">
                        <div className="price">
                            <img src={priceTag} alt=""/>
                            <div className={'text'}>
                                <span>Стоимость поздравления</span>
                                <span>Длительностью 15 минут</span>
                            </div>
                            <p className={'priceTag'}>
                                <strong>
                                    15 000
                                </strong>
                                &nbsp;&#8381;
                            </p>
                        </div>
                        <div className="rating">
                            <div>
                                <img src={stars} alt=""/>
                                <p>Рейтинг:</p>
                            </div>
                            <p>
                                <FontAwesomeIcon icon={['far', 'star']} size='sm'/>
                                <FontAwesomeIcon icon={['far', 'star']} size='sm'/>
                                <FontAwesomeIcon icon={['far', 'star']} size='sm'/>
                                <FontAwesomeIcon icon={['far', 'star']} size='sm'/>
                                <FontAwesomeIcon icon={['far', 'star']} size='sm'/>
                            </p>
                        </div>
                        <hr/>
                        <div className="await-time">
                            <div>
                                <img src={time} alt=""/>
                                <span>Среднее время ответа</span>
                            </div>
                            <span className={'days'}>{starInfo.starDays} дней</span>
                        </div>
                        <div className="place-order">
                            <button onClick={() => history.push(`/categories/stars/order/confirm`)}>
                                Заказать
                            </button>
                            <p>Совершая заказ, вы соглашаетесь с условиями</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}