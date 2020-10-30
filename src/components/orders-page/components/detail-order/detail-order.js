import React, {useContext, useState} from 'react';
import './detail-order.scss';
import menu from '../../../../img/order_icons/menu.svg';
// import like from '../../../../img/order_icons/icon_like.png';
import {NavBar} from "../../../navbar/navbar";
import {useMessage} from "../../../../hooks/message.hook";
import {useHttp} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/AuthContext";
import Modal from 'react-modal';


export const DetailOrder = ({isActive, details, setActive}) => {

    const userData = JSON.parse(window.localStorage.getItem('userData'));

    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;

    const authToken = useContext(AuthContext);
    const message = useMessage();
    // const [data, setData] = useState([]);
    const {request} = useHttp();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        from_user: userData.userId,
        user_id: details.starId,
        message: ''
    })

    const hashTagLink = '#';

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value}))
    }

    const writeMessage = async () => {
        // console.log({...form})
        if (form.message.length > 0) {
            try {
                const message1 = await request('/api/message/', 'POST', {...form}, {Authorization: `Bearer ${authToken.token}`})
                message(message1.toString())
            } catch (e) {
                message(e);
            }
        } else {
            message(['Введите сообщение!'])
        }
    }

    // Modal

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
            padding: '30px'
        }
    };

    const closeModal = () => {
        setIsOpen(!modalIsOpen);
    }

    const showModal = () => {
        setIsOpen(true)
    }

    Modal.setAppElement(document.querySelector('.App'))

    // View video if order complete

    function seeVideo() {
        console.log(details.video)
        window.open(`media/${details.video}`).focus();
    }

    function returnVid() {
        if (details.status === 3) {
            return <div className="btn-wrapper" style={{borderBottom: '2px solid #eeeeee'}}>
                <button
                    onClick={seeVideo}
                    className={'submitButton'}
                >
                    Поздравление
                </button>
            </div>
        }
    }

    // Parse avatar

    const starAv = `${SERVER_URL}/media/${details.starAvatar}`

    if (isActive) {
        if (!userData.is_star) {
            return (
                <>
                    <div className="profile">
                        <div className="main-wrapper">

                            <div className="profile__info"
                                 style={{background: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${starAv})`}}>
                                <div className="header">
                                    <div className="header-top">
                                        <a href={hashTagLink} data-target="slide-out"
                                           className="sidenav-trigger show-on-large">
                                            <img src={menu} alt=""/>
                                        </a>
                                        <span style={{color: 'white'}}>Страница заказа</span>
                                        <span className={'closeOrder'} onClick={() => setActive(false)}
                                              style={{color: 'white'}}>&times;</span>
                                    </div>
                                    <div className="header-bottom">
                                        <h3 style={{color: 'white'}}>{details.star}</h3>
                                        <span style={{color: '#d4d7e6'}}>{details.profession}</span>
                                        <div className="likes">
                                            {/*<img src={like} alt=""/><span style={{color: 'white'}}>&nbsp;&nbsp;425</span>*/}
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
                                        <span>{details.username}</span>
                                    </div>
                                </div>

                                <div className="info-row">
                                    <div className="wrapper">
                                        <span>Цена</span>
                                        <span>{details.price}</span>
                                    </div>
                                </div>

                                {returnVid()}

                            </div>
                            <div className="btn-wrapper">
                                <button
                                    onClick={showModal}
                                    className={'submitButton'}
                                >
                                    Связаться с исполнителем
                                </button>
                                <p>Совершая заказ, вы соглашаетесь с условиями</p>
                            </div>
                        </div>

                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        style={customStyles}
                    >
                        <div className="modal-header">
                            <span>Напишите сообщение</span>
                        </div>
                        <div className="spread">
                            <div className="single-input__wrapper">
                                <textarea
                                    placeholder={'Ваше сообщение...'}
                                    onChange={changeHandler}
                                    name={'message'}
                                    value={form.message}
                                    className={'contactTextArea'}
                                />
                            </div>
                            <button onClick={writeMessage}>Отправить</button>
                        </div>
                    </Modal>
                    <NavBar/>
                </>
            )
        }
        return (
            <>
                <div className="profile">
                    <div className="main-wrapper">

                        <div className="profile__info"
                             style={{background: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${starAv})`}}>
                            <div className="header">
                                <div className="header-top">
                                    <a href={hashTagLink} data-target="slide-out"
                                       className="sidenav-trigger show-on-large">
                                        <img src={menu} alt=""/>
                                    </a>
                                    <span style={{color: 'white'}}>Страница заказа</span>
                                    <span className={'closeOrder'} onClick={() => setActive(false)}
                                          style={{color: 'white'}}>&times;</span>
                                </div>
                                <div className="header-bottom">
                                    <h3 style={{color: 'white'}}>{details.customer}</h3>
                                    <div>
                                        {/*<span>Земля</span> <span>&nbsp; | &nbsp;</span> <span>{years} лет</span>*/}
                                    </div>
                                    <div className="likes">
                                        {/*<img src={like} alt=""/><span style={{color: 'white'}}>&nbsp;&nbsp;425</span>*/}
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
                                    <span>{details.customer}</span>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="wrapper">
                                    <span>Цена</span>
                                    <span>{details.price}</span>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <NavBar/>
            </>
        )
    }
    return []
}