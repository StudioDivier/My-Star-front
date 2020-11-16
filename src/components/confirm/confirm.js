import React, {useContext, useState} from 'react';
import {StarsContext} from "../../context/StarsContext";
import './confirm.scss';
import {useHttp} from "../../hooks/http.hook";
import {useHistory} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import MaskedInput from "react-text-mask";
import {useMessage} from "../../hooks/message.hook";
import menu from '../../img/order_icons/menu.svg';
import account from '../../img/order_icons/account.svg';
import like from '../../img/order_icons/icon_like.png';
import priceTag from '../../img/order_icons/priceTag.svg';
import close from '../../img/close.png';
import {NavBar} from "../navbar/navbar";
import {Link} from "react-router-dom";
import Modal from 'react-modal';


export const Confirm = () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;
    const {request, loading} = useHttp();
    const message = useMessage();
    const auth = useContext(AuthContext);
    const userInfo = useContext(AuthContext);
    const history = useHistory();
    const starInfo = useContext(StarsContext);
    const [order, setOrder] = useState('');
    const [redirect, setRedirect] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false)
    const [form, setForm] = useState({
        status_order: '0',
        for_whom: '',
        by_date: '',
        comment: '',
        order_price: starInfo.starPrice,
        star_id: starInfo.starId,
        customer_id: auth.id
    })

    // console.log(starInfo)

    // For modal

    const closeModal = () => {
        setIsOpen(!modalIsOpen);
    }

    const showModal = () => {
        setIsOpen(true)
    }

    Modal.setAppElement(document.querySelector('.App'))

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

    //--------------------------------------------------------------------------------

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value}))
    }

    // Transform birth year

    function reverseDate(str) {
        return str.split('-').reverse().join('-')
    }


    let orderId1;

    const submitHandler = async () => {
        if (form.comment.length > 0 && form.by_date.length && form.for_whom.length) {
            try {
                const dataLog = await request('/api/order/', 'POST', {
                    status_order: form.status_order,
                    for_whom: form.for_whom,
                    by_date: reverseDate(form.by_date),
                    comment: form.comment,
                    order_price: starInfo.starPrice,
                    star_id: starInfo.starId,
                    customer_id: auth.id,
                    type: 'Видео-поздравление'
                }, {Authorization: `Bearer ${auth.token}`})// 'cors',
                // setOrder(dataLog.order_id)
                console.log(dataLog)
                orderId1 = dataLog.order_id;
                message(dataLog.message)
                // console.log(order)
                // makeOrder();
                // history.push('/categories');
                // if (dataLog)
                // history.push('/orders')
                showModal()
            } catch (e) {
            }
        } else {
            message(['Заполните все необходимые поля!'])
        }
        await redirectHandler()
    }

    const submitHandler2 = async () => {
        if (form.comment.length > 0 && form.by_date.length && form.for_whom.length) {
            try {
                const dataLog = await request('/api/order/', 'POST', {
                    status_order: form.status_order,
                    for_whom: form.for_whom,
                    by_date: reverseDate(form.by_date),
                    comment: form.comment,
                    order_price: starInfo.starAnotherPrice,
                    star_id: starInfo.starId,
                    customer_id: auth.id,
                    type: 'Приглашение на праздник'
                }, {Authorization: `Bearer ${auth.token}`})// 'cors',
                // setOrder(dataLog.order_id)
                console.log(dataLog)
                orderId1 = dataLog.order_id;
                message(dataLog.message)
                // console.log(order)
                // makeOrder();
                // history.push('/categories');
                // if (dataLog)
                // history.push('/orders')
                showModal()
            } catch (e) {
            }
        } else {
            message(['Заполните все необходимые поля!'])
        }
        await redirectHandler()
    }

    const redirectHandler = async () => {
        try {
            console.log(orderId1)
            const makeOrder = await request(`/api/order/pay/?order_id=${orderId1}`, 'GET', null, {Authorization: `Bearer ${auth.token}`})// 'no-cors', , 'follow'
            //makeOrder();
            console.log(makeOrder)
            // history.push(makeOrder.link)
            setRedirect(makeOrder.link);
            // window.open(`${makeOrder.link}`, "_blank").focus();
        } catch (e) {
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

    const url = `${SERVER_URL}`;
    // const url = 'http://127.0.0.1:8080';
    const avatar = url + starInfo.starAvatar;

    const hashTagLink = '#';

    // const customFunction = async () => {
    //     submitHandler()
    //     await redirectHandler()
    // }

    if (starInfo.starId === null) {
        history.push('/')
        window.location.reload()
    }

    const directClick = () => {
        window.open(`${redirect}`, "_blank").focus()
        history.push('/orders')
    }

    return (
        <>
            <div className="confirm">
                <div className="chosen-star">
                    <div className="chosen-star__info"
                         style={{background: 'linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(' + avatar + ')'}}>
                        <div className="header">
                            <div className="header-top">
                                <a href={hashTagLink} data-target="slide-out" className="sidenav-trigger show-on-large">
                                    <img src={menu} alt=""/>
                                </a>
                                <span>Профиль</span>
                                <Link to={'/profile'}>
                                    <img src={account} alt="Account"/>
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
                        <div className="confirm__inputs">
                            <input
                                type="text"
                                name={'for_whom'}
                                value={form.for_whom}
                                onChange={changeHandler}
                                placeholder={'Кого поздравить'}
                            />
                            {/*<input*/}
                            {/*    type="text"*/}
                            {/*    name={'by_date'}*/}
                            {/*    value={form.by_date}*/}
                            {/*    onChange={changeHandler}*/}
                            {/*    placeholder={'Дата'}*/}
                            {/*/>*/}
                            <MaskedInput
                                mask={[/[0-3]/, /[0-9]/, '-', /[0-1]/, /[0-9]/, '-', /\d/, /\d/, /\d/, /\d/]}
                                placeholder={'дд-мм-гггг'}
                                type="text"
                                name={'by_date'}
                                value={form.by_date}
                                onChange={changeHandler}
                            />
                            <textarea
                                name={'comment'}
                                value={form.comment}
                                onChange={changeHandler}
                                placeholder={'Текст поздравления'}
                            />
                        </div>
                        <div className="place-order">
                            <button onClick={submitHandler} style={{marginBottom: '10px'}}>
                                Заказать
                            </button>
                            <button onClick={submitHandler2}>
                                Пригласить на праздник ({starInfo.starAnotherPrice} руб.)
                            </button>
                            <p>Совершая заказ, вы соглашаетесь с условиями</p>
                        </div>
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
                    <button className={'close-btn'} onClick={closeModal}>
                        <img src={close}
                             alt="Close"
                        />
                    </button>
                    <div className="header-text">
                        <span>Завершение заказа</span>
                    </div>
                </div>
                <div className="spread">
                    <button onClick={() => directClick()} disabled={loading}>Перейти к оплате</button>
                </div>
            </Modal>
            <NavBar/>
        </>
    )
}