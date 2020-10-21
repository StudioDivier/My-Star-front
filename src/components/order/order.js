import React, {useContext, useState} from 'react';
import {StarsContext} from "../../context/StarsContext";
import './order.scss';
import {useHistory} from 'react-router-dom';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import priceTag from '../../img/order_icons/priceTag.svg';
import stars from '../../img/order_icons/stars.png';
import time from '../../img/order_icons/time.png';
import menu from '../../img/order_icons/menu.svg';
import account from '../../img/order_icons/account.svg';
import like from '../../img/order_icons/icon_like.png';
import {NavBar} from "../navbar/navbar";
import {Link} from "react-router-dom";
import Ratings from "react-ratings-declarative";
import Modal from 'react-modal';
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/AuthContext";

export const Order = () => {
    const starInfo = useContext(StarsContext);
    const userInfo = useContext(AuthContext);
    const history = useHistory();
    const [newRating, setNewRating] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const {request} = useHttp();
    const message = useMessage();

    console.log(starInfo)
    // console.log(starInfo.starRating)
    // console.log(userInfo.id)

    const url = 'http://192.168.1.131:8080';
    const avatar = url + starInfo.starAvatar;

    const rateHandler = async () => {
        try {
            const dataLog = await request('/api/ratestar/', 'PUT', {
                "rating": `${newRating}`,
                "adresat": userInfo.id,
                "adresant": starInfo.starId
            }, {Authorization: `Bearer ${userInfo.token}`})
            message(`${dataLog}`);
            // console.log(dataLog)
        } catch (e) {
            message(e);
            // console.log(e);
        }
    }

    const likeHandler = async () => {
        try {
            const dataLog = await request('/api/star/like/', 'POST', {
                "star_id": starInfo.starId,
                "cust_id": userInfo.id
            }, {Authorization: `Bearer ${userInfo.token}`})
            message(`${dataLog}`);
        } catch (e) {
            message(e)
        }
    }

    const hashTagLink = '#';

    const rating = starInfo.starRating;

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: 'auto',
            width: '80%',
            borderRadius: '25px',
            padding: '20px 30px'
        }
    };

    const showModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        console.log('f u')
        setIsOpen(false)
    }
    Modal.setAppElement('.App')

    return (
        <>
            <div className="order">
                <div className="chosen-star">
                    <div className="chosen-star__info"
                         style={{background: 'linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(' + avatar + ')'}}>
                        <div className="header">
                            <div className="header-top">
                                <a href={hashTagLink} data-target="slide-out" className="sidenav-trigger show-on-large">
                                    <img src={menu} alt=""/>
                                </a>
                                <span>Профиль</span>
                                <Link to="/profile">
                                    <img src={account} alt=""/>
                                </Link>
                            </div>
                            <div className="header-bottom">
                                <h3>{starInfo.starName}</h3>
                                <span>Хип-хоп исполнитель</span>
                                <div className="likes" onClick={likeHandler}>
                                    <img src={like} alt=""/><span>&nbsp;&nbsp;{starInfo.starLikes}</span>
                                </div>
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
                                    {starInfo.starPrice}
                                </strong>
                                &nbsp;&#8381;
                            </p>
                        </div>
                        <div className="rating">
                            <div>
                                <img src={stars} alt=""/>
                                <p>Рейтинг:</p>
                            </div>
                            <div onClick={showModal}>
                                <Ratings
                                    rating={rating}
                                    widgetRatedColors="orange"
                                    widgetDimensions="14px"
                                    widgetSpacings="3px"
                                >
                                    <Ratings.Widget/>
                                    <Ratings.Widget/>
                                    <Ratings.Widget/>
                                    <Ratings.Widget/>
                                    <Ratings.Widget/>
                                </Ratings>

                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    contentLabel="Example Modal"
                                    style={customStyles}
                                >
                                    <div className="modal-header">
                                        <span>Оценить звезду</span>
                                        <button onClick={closeModal}>х</button>
                                    </div>
                                    <div className="spread">
                                        <Ratings
                                            rating={newRating}
                                            widgetRatedColors="orange"
                                            widgetDimensions="14px"
                                            widgetSpacings="3px"
                                            changeRating={setNewRating}
                                        >
                                            <Ratings.Widget/>
                                            <Ratings.Widget/>
                                            <Ratings.Widget/>
                                            <Ratings.Widget/>
                                            <Ratings.Widget/>
                                        </Ratings>
                                        <button onClick={rateHandler}>Оценить</button>
                                    </div>
                                </Modal>
                            </div>
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
            {/*<Modal*/}
            {/*    isOpen={modalIsOpen}*/}
            {/*    onRequestClose={closeModal}*/}
            {/*    contentLabel="Example Modal"*/}
            {/*    style={customStyles}*/}
            {/*>*/}
            {/*    <div className="modal-header">*/}
            {/*        <span>Оценить звезду</span>*/}
            {/*        <button onClick={closeModal}>х</button>*/}
            {/*    </div>*/}
            {/*    <div className="spread">*/}
            {/*        <Ratings*/}
            {/*            rating={newRating}*/}
            {/*            widgetRatedColors="orange"*/}
            {/*            widgetDimensions="14px"*/}
            {/*            widgetSpacings="3px"*/}
            {/*            changeRating={setNewRating}*/}
            {/*        >*/}
            {/*            <Ratings.Widget/>*/}
            {/*            <Ratings.Widget/>*/}
            {/*            <Ratings.Widget/>*/}
            {/*            <Ratings.Widget/>*/}
            {/*            <Ratings.Widget/>*/}
            {/*        </Ratings>*/}
            {/*        <button onClick={rateHandler}>Оценить</button>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
            <NavBar/>
        </>
    )
}