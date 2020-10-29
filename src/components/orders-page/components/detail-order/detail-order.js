import React, {useContext, useState} from 'react';
import './detail-order.scss';
import menu from '../../../../img/order_icons/menu.svg';
import like from '../../../../img/order_icons/icon_like.png';
import {NavBar} from "../../../navbar/navbar";
import {useMessage} from "../../../../hooks/message.hook";
import {useHttp} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/AuthContext";
import Modal from 'react-modal';


export const DetailOrder = ({isActive, details, setActive}) => {

    const authToken = useContext(AuthContext);
    const message = useMessage();
    const [data, setData] = useState([]);
    const {request} = useHttp();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        from_user: authToken.userId,
        user_id: details.name,
        message: ''
    })

    const hashTagLink = '#';

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value}))
    }

    const writeMessage = async () => {
        try {
            const message = await request('/api/message/', 'POST', {...form}, {Authorization: `Bearer ${authToken.token}`})
        } catch (e) {
            message(e);
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
                        {/*<div className="btn-wrapper">*/}
                        {/*    <button*/}
                        {/*        // onClick={showModal}*/}
                        {/*        className={'submitButton'}*/}
                        {/*    >*/}
                        {/*        Связаться с исполнителем*/}
                        {/*    </button>*/}
                        {/*    <p>Совершая заказ, вы соглашаетесь с условиями</p>*/}
                        {/*</div>*/}
                    </div>

                </div>
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
                        <div className="single-input__wrapper">
                            <span>Пароль</span>
                            <input
                                type="text"
                                placeholder={'Пароль'}
                                onChange={changeHandler}
                                name={'password'}
                                value={form.password}
                            />
                        </div>
                        <button onClick={writeMessage}>Отправить</button>
                    </div>
                </Modal>
                <NavBar/>
            </>
        )
    }
    return []
}