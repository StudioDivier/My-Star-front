import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useHttp} from "../../hooks/http.hook";
import {useHistory} from 'react-router-dom';
import {BottomMenu} from "../bottom-menu/bottom-menu";
import {Filter} from "../filter/filter";
import {Star} from "../stars-page/components/star";
import backBlueArrow from '../../img/back-blue.svg'
import {StarsContext} from "../../context/StarsContext";

export const Search = ({search, chooseStar}) => {

    // const catPic = 'http://exprome.ru:8080';
    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;

    const {request} = useHttp()
    const [stars, setStars] = useState([])
    const history = useHistory();
    const [query, setQuery] = useState('');
    const fetchedList = useContext(StarsContext);

    const clickStar = (value) => {
        chooseStar(value)
        history.push('/star-card')
    }

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
            <div className="stars">
                <div className="header-block">
                    <div className={'icon-container'}>
                        <a href={'/'}>
                            <img src={backBlueArrow} alt="Back button"/>
                        </a>
                    </div>
                    <div>
                        <h3>Поиск звезд</h3>
                    </div>
                </div>
                <div className="stars__container">
                    <Filter
                        getQuery={setQuery}
                    />
                    <Container>
                        <Row style={{paddingBottom: '75px'}}>
                            {fetchedList.array.map((value, key) => {

                                let randomNum = Math.floor(Math.random() * 6);
                                let bgColor = colors[randomNum];

                                if (value.username.toLowerCase().includes(query.toLowerCase())) {
                                    return (
                                        <div className="single-star" key={key}>
                                            <Col>
                                                <Star
                                                    id={value.id}
                                                    name={value.username}
                                                    rating={value.rating}
                                                    price={value.price}
                                                    days={value.days}
                                                    avatar={`/media/${value.avatar}`}
                                                    bgColor={bgColor}
                                                    likes={value.likes}
                                                    anotherPrice={value.price_another}
                                                    profession={value.profession}
                                                />
                                            </Col>
                                        </div>
                                    )
                                } else if (query === '') {
                                    return (
                                        <div className="single-star" key={key}>
                                            <Col>
                                                <Star
                                                    id={value.id}
                                                    name={value.username}
                                                    rating={value.rating}
                                                    price={value.price}
                                                    days={value.days}
                                                    avatar={`/media/${value.avatar}`}
                                                    bgColor={bgColor}
                                                />
                                            </Col>
                                        </div>
                                    )
                                }
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