import React, {useContext, useState} from 'react';
import {StarsContext} from "../../context/StarsContext";
import './confirm.scss';
import {useHttp} from "../../hooks/http.hook";
// import {useHistory} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import MaskedInput from "react-text-mask";
import {useMessage} from "../../hooks/message.hook";
import menu from '../../img/order_icons/menu.svg';
import account from '../../img/order_icons/account.svg';
import like from '../../img/order_icons/icon_like.png';
import priceTag from '../../img/order_icons/priceTag.svg';
import {NavBar} from "../navbar/navbar";
import {Link} from "react-router-dom";


export const Confirm = () => {
    const {request} = useHttp();
    const message = useMessage();
    const auth = useContext(AuthContext);
    const userInfo = useContext(AuthContext);
    // const history = useHistory();
    const starInfo = useContext(StarsContext);
    const [form, setForm] = useState({
        status_order: '0',
        for_whom: '',
        by_date: '',
        comment: '',
        order_price: starInfo.starPrice,
        star_id: starInfo.starId,
        customer_id: auth.id
    })

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value}))
    }

    const submitHandler = async () => {
        try {
            const dataLog = await request('/api/order/', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`})
            console.log(dataLog)
            message(dataLog)

            // history.push('/categories');
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

    const url = 'http://192.168.1.131:8080';
    const avatar = url + starInfo.starAvatar;

    const hashTagLink = '#';

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
                                    15 000
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
                                mask={[/[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                                placeholder={'Дата'}
                                type="text"
                                name={'by_date'}
                                value={form.by_date}
                                onChange={changeHandler}
                            />
                            <textarea
                                name={'comment'}
                                value={form.comment}
                                onChange={changeHandler}
                                placeholder={'Комментарии'}
                            />
                        </div>
                        <div className="place-order">
                            <button onClick={submitHandler}>
                                Заказать
                            </button>
                            <p>Совершая заказ, вы соглашаетесь с условиями</p>
                        </div>
                    </div>
                </div>
            </div>
            <NavBar/>
        </>
    )
}