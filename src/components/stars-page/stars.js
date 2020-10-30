import React, {useContext, useState} from 'react';
import './stars-page.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import {useHttp} from "../../hooks/http.hook";
import {useHistory} from 'react-router-dom';

import {Star} from './components/star';
import {StarsContext} from "../../context/StarsContext";
import backBlueArrow from '../../img/back-blue.svg'
import {Filter} from "../filter/filter";
import {BottomMenu} from "../bottom-menu/bottom-menu";

export const Stars = () => {
    // const {loading, request, error, clearError} = useHttp()
    // const [stars, setStars] = useState([]);
    const fetchedList = useContext(StarsContext);
    const [query, setQuery] = useState('');
    const history = useHistory();


    // const getCats = async () => {
    //     try {
    //         const cats = await request('/api/categories/', 'GET')
    //         setData({...cats})
    //
    //     } catch (e) {
    //     }
    // }

    // ALL STARS LIST

    // useEffect(() => {
    //     async function fetchData() {
    //         const starsList = await request('/api/star/getlist/', 'GET')
    //         setStars([...starsList])
    //     }
    //
    //     fetchData();
    // }, [])

    const colors = [
        'linear-gradient(to top, #f76364 0%, #f76665 26%, #f76665 51%, #f76665 76%, #f56664 100%)',
        'linear-gradient(to top, #774ef7 0%, #7651f7 26%, #7651f7 51%, #7651f7 76%, #754ff6 100%)',
        'linear-gradient(to top, #f78c5c 0%, #f78b5e 26%, #f78b5e 51%, #f68b5f 76%, #f68a61 100%)',
        'linear-gradient(to top, #29bdf6 0%, #29bdf7 26%, #29bdf7 51%, #29bbf7 76%, #27bdf6 100%)',
        'linear-gradient(to top, #5960f8 0%, #5762f7 26%, #585df7 51%, #5661f7 76%, #5661f7 100%)',
        'linear-gradient(to top, #90d443 0%, #91d343 26%, #91d343 51%, #91d343 76%, #91d347 100%)'
    ]

    // console.log(window.screen.width)

    // console.log(stars)
    // console.log(fetchedList.array)

    const getQuery = (query) => {
        setQuery(query)
    }

    if (fetchedList.array.length === 0) {
        history.push('/')
        window.location.reload();
    }

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
                        <h3>Исполнители</h3>
                    </div>
                </div>
                <div className="stars__container">
                    <Filter
                        getQuery={getQuery}
                    />
                    <Container>
                        <Row style={{marginBottom: '75px'}}>
                            {fetchedList.array.map((value, key) => {
                                // console.log(value, key)

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
                                                    avatar={value.avatar}
                                                    bgColor={bgColor}
                                                    likes={value.likes}
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
                                                    avatar={value.avatar}
                                                    bgColor={bgColor}
                                                />
                                            </Col>
                                        </div>
                                    )
                                }
                            })
                            }
                            {/*<div className="single-star">*/}
                            {/*    <Col lg>*/}
                            {/*        <Star/>*/}
                            {/*    </Col>*/}
                            {/*</div>*/}
                            {/*<div className="single-star">*/}
                            {/*    <Col lg>*/}
                            {/*        <Star/>*/}
                            {/*    </Col>*/}
                            {/*</div>*/}
                            {/*<div className="single-star">*/}
                            {/*    <Col lg>*/}
                            {/*        <Star/>*/}
                            {/*    </Col>*/}
                            {/*</div>*/}
                            {/*<div className="single-star">*/}
                            {/*    <Col lg>*/}
                            {/*        <Star/>*/}
                            {/*    </Col>*/}
                            {/*</div>*/}
                        </Row>
                    </Container>
                </div>
            </div>
            <BottomMenu/>
        </>
    )
}