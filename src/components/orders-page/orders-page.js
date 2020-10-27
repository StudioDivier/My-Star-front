import React, {useContext, useEffect, useState} from 'react';
import './orders-page.scss';
import {Filter} from "../filter/filter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BottomMenu} from "../bottom-menu/bottom-menu";
import backBlueArrow from '../../img/back-blue.svg';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {SingleOrder} from "./components/order";
import {DetailOrder} from "./components/detail-order/detail-order";
import {useMessage} from "../../hooks/message.hook";

export const OrdersPage = () => {

    const authToken = useContext(AuthContext);
    const {request} = useHttp();
    const [data, setData] = useState([]);
    const [name, setName] = useState([]);
    const [order, setOrder] = useState([]);
    const message = useMessage();
    const [detailActive, setDetailActive] = useState(false)
    // console.log(authToken)

    useEffect(() => {
        async function fetchData() {
            const personal = await request(`/api/order/list/?is_star=${authToken.isStar}&user_id=${authToken.id}`, 'GET', null, {Authorization: `Bearer ${authToken.token}`})
            console.log(personal)
            if (typeof (personal[0]) === 'string') {
                setData(personal)
            } else {
                setData(personal)
                // setName(personal.data.customer)
            }
            // console.log('hello1')

        }

        // console.log('hello2')
        fetchData();
    }, [authToken.isStar, authToken.id, authToken.token, request]) // needed?

    console.log(data)

    const colors = [
        'linear-gradient(to top, #f76364 0%, #f76665 26%, #f76665 51%, #f76665 76%, #f56664 100%)',
        'linear-gradient(to top, #774ef7 0%, #7651f7 26%, #7651f7 51%, #7651f7 76%, #754ff6 100%)',
        'linear-gradient(to top, #f78c5c 0%, #f78b5e 26%, #f78b5e 51%, #f68b5f 76%, #f68a61 100%)',
        'linear-gradient(to top, #29bdf6 0%, #29bdf7 26%, #29bdf7 51%, #29bbf7 76%, #27bdf6 100%)',
        'linear-gradient(to top, #5960f8 0%, #5762f7 26%, #585df7 51%, #5661f7 76%, #5661f7 100%)',
        'linear-gradient(to top, #90d443 0%, #91d343 26%, #91d343 51%, #91d343 76%, #91d347 100%)'
    ]

    // Передать данные для детальной страницы заказа

    const passData = (value) => {
        setOrder(value)
        console.log(order)
    }

    // Получить ID выбранного заказа

    let orderId;

    const getId = (value) => {
        orderId = value;
        console.log(orderId);
    }

    // Принять/отказать в заказе

    const rejectOrder = async () => {
        console.log()
        try {
            const changePW = await request(
                '/api/order/accept/',
                'POST',
                {order_id: orderId, accept: 'reject'},
                {Authorization: `Bearer ${authToken.token}`}
            )
            // setSelected(value)
        } catch (e) {
            message(e)
        }
        message(['Заказ отклонен'])
    }

    const acceptOrder = async () => {
        console.log()
        try {
            const changePW = await request(
                '/api/order/accept/',
                'POST',
                {order_id: orderId, accept: 'accept'},
                {Authorization: `Bearer ${authToken.token}`}
            )
            // setSelected(value)
        } catch (e) {
            message(e)
        }
        message('Заказ принят')
    }

    // Если заказов нет у звезды/юзера

    if (typeof (data[0]) === 'string' && authToken.isStar || authToken.isStar) {
        return (
            <>
                <div className="orders">
                    <div className="header-block">
                        <div className={'icon-container'}>
                            <a href={'/categories'}>
                                <img src={backBlueArrow} alt="Back button"/>
                            </a>
                        </div>
                        <div>
                            <h3>Мои заказы</h3>
                        </div>
                    </div>
                    <div className="orders__container">
                        <Filter/>
                        <Container>
                            <Row>
                                <div className="orders-wrapper"
                                     style={{textAlign: 'center', color: "grey", marginTop: '20px'}}>
                                    <h3>{data}</h3>
                                </div>
                            </Row>
                        </Container>
                    </div>
                </div>
                <BottomMenu/>
            </>
        )
    }

    // Проверка на звезду => рендер ЗВЕЗДЫ

    if (authToken.isStar) {
        if (!detailActive) {

            return (
                <>
                    <div className="orders">
                        <div className="header-block">
                            <div className={'icon-container'}>
                                <a href={'/categories'}>
                                    <img src={backBlueArrow} alt="Back button"/>
                                </a>
                            </div>
                            <div>
                                <h3>Мои заказы</h3>
                            </div>
                        </div>
                        <div className="orders__container">
                            <Filter/>
                            <Container>
                                <Row>
                                    {data.map((value, key) => {
                                        // console.log(value, key)

                                        let randomNum = Math.floor(Math.random() * 6);
                                        let bgColor = colors[randomNum];

                                        return (
                                            <div className="orders-wrapper" key={key}>
                                                <SingleOrder
                                                    name={name}
                                                    date={value.by_date}
                                                    time={value.by_time}
                                                    comment={value.comment}
                                                    forWhom={value.for_whom}
                                                    price={value.order_price}
                                                    status={value.status_order}
                                                    bgColor={bgColor}
                                                    id={value.id}
                                                    starId={value.star_id}
                                                    turnOnDetail={setDetailActive}
                                                    watchOrder={passData}
                                                    getId={getId}
                                                />
                                            </div>
                                        )
                                    })
                                    }
                                </Row>
                                <Row>
                                    <div className="btn-wrapper">
                                        <button className={'order-decline'} onClick={rejectOrder}>Отклонить</button>
                                        <button className={'order-accept'} onClick={acceptOrder}>Принять</button>
                                    </div>
                                </Row>
                            </Container>
                        </div>
                    </div>
                    <BottomMenu/>
                </>
            )
        }
        return (
            <DetailOrder
                isActive={detailActive}
                setActive={setDetailActive}
                details={order}
            />
        )
    }

    // Рендер юзера

    if (!detailActive) {
        return (
            <>
                <div className="orders">
                    <div className="header-block">
                        <div className={'icon-container'}>
                            <a href={'/categories'}>
                                <img src={backBlueArrow} alt="Back button"/>
                            </a>
                        </div>
                        <div>
                            <h3>Мои заказы</h3>
                        </div>
                    </div>
                    <div className="orders__container">
                        <Filter/>
                        <Container>
                            <Row>
                                {data.map((value, key) => {
                                    // console.log(value, key)

                                    let randomNum = Math.floor(Math.random() * 6);
                                    let bgColor = colors[randomNum];

                                    return (
                                        <div className="orders-wrapper" key={key}>
                                            <SingleOrder
                                                name={name}
                                                date={value.by_date}
                                                time={value.by_time}
                                                comment={value.comment}
                                                forWhom={value.for_whom}
                                                price={value.order_price}
                                                status={value.status_order}
                                                bgColor={bgColor}
                                                id={value.id}
                                                starId={value.star_id}
                                                turnOnDetail={setDetailActive}
                                                watchOrder={passData}
                                                getId={getId}
                                            />
                                        </div>
                                    )
                                })
                                }
                            </Row>
                        </Container>
                    </div>
                </div>
                <BottomMenu/>
            </>
        )
    }
    return (
        <DetailOrder
            isActive={detailActive}
            setActive={setDetailActive}
            details={order}
        />
    )

}