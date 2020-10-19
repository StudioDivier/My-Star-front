import React, {useContext, useEffect, useState} from 'react';
import './orders-page.scss';
import {Filter} from "../filter/filter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {BottomMenu} from "../bottom-menu/bottom-menu";
import backBlueArrow from '../../img/back-blue.svg';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {SingleOrder} from "./components/order";

export const OrdersPage = () => {

    const authToken = useContext(AuthContext);
    const {request} = useHttp();
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState([])
    // console.log(authToken)

    useEffect(() => {
        async function fetchData() {
            const personal = await request(`/api/personal/?is_star=${authToken.isStar}&user_id=${authToken.id}`, 'GET', null, {Authorization: `Bearer ${authToken.token}`})
            console.log(personal)
            if (!!personal.length) {
                setData([...personal])
            }
            // console.log('hello1')

        }

        // console.log('hello2')
        fetchData();
    }, [])

    let fetchedData = data[1];
    let help = [];
    // let help2 = help['orders'];
    for (let i in fetchedData) {
        help = [...fetchedData[i]]
    }
    console.log(help)


    const colors = [
        'linear-gradient(to top, #f76364 0%, #f76665 26%, #f76665 51%, #f76665 76%, #f56664 100%)',
        'linear-gradient(to top, #774ef7 0%, #7651f7 26%, #7651f7 51%, #7651f7 76%, #754ff6 100%)',
        'linear-gradient(to top, #f78c5c 0%, #f78b5e 26%, #f78b5e 51%, #f68b5f 76%, #f68a61 100%)',
        'linear-gradient(to top, #29bdf6 0%, #29bdf7 26%, #29bdf7 51%, #29bbf7 76%, #27bdf6 100%)',
        'linear-gradient(to top, #5960f8 0%, #5762f7 26%, #585df7 51%, #5661f7 76%, #5661f7 100%)',
        'linear-gradient(to top, #90d443 0%, #91d343 26%, #91d343 51%, #91d343 76%, #91d347 100%)'
    ]

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
                                                bgColor={bgColor}
                                            />
                                    </div>
                                    )
                                })
                            }
                            {/*{fetchedList.array.map((key, value) => {*/}
                            {/*    console.log(key, value)*/}

                            {/*    let randomNum = Math.floor(Math.random() * 6);*/}
                            {/*    let bgColor = colors[randomNum];*/}

                            {/*    return (*/}
                            {/*        <div className="single-star" key={value}>*/}
                            {/*            <Col>*/}
                            {/*                <Star*/}
                            {/*                    id={key.id}*/}
                            {/*                    name={key.username}*/}
                            {/*                    rating={key.rating}*/}
                            {/*                    price={key.price}*/}
                            {/*                    days={key.days}*/}
                            {/*                    avatar={key.avatar}*/}
                            {/*                    bgColor={bgColor}*/}
                            {/*                />*/}
                            {/*            </Col>*/}
                            {/*        </div>*/}
                            {/*        )*/}
                            {/*    })*/}
                            {/*}*/}
                        </Row>
                    </Container>
                </div>
            </div>
            <BottomMenu/>
        </>
    )
}