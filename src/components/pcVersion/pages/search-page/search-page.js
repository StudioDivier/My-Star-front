import React, {useEffect, useState} from 'react';
import './search-page.scss';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useHttp} from "../../../../hooks/http.hook";
import {useHistory} from 'react-router-dom';

export const Search = ({search, chooseStar}) => {

    // const catPic = 'http://exprome.ru:8080';
    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;

    const {request} = useHttp()
    const [stars, setStars] = useState([])
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const starsFetch = await request(`/api/star/getlist/`, 'GET'); //'cors' , //, null, {Authorization: `Bearer ${userData.token}`}
            if (!!starsFetch.length) {
                setStars([...starsFetch])
            }
        }

        fetchData();
    }, [request])

    const clickStar = (value) => {
        chooseStar(value)
        history.push('/star-card')
    }

    console.log(stars)

    if (search.length > 0) {
        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <div className="single-cat">
                                <div className="single-cat__stars">
                                    {
                                        stars.filter(value => value.username.toLowerCase() === search.toLowerCase()).map((value, key) => {
                                            // console.log(value.avatar)
                                            return (
                                                <div className="single-cat__star" key={key}
                                                     onClick={() => clickStar(value)}>
                                                    <div className="avatar-img"
                                                         style={{backgroundImage: `url(${SERVER_URL}${value.avatar})`}}>&nbsp;</div>
                                                    {/*<img src={catPic + value.avatar} alt=""/>*/}
                                                    <div className="star-description">
                                                                        <span className="star-name">
                                                                            {value.first_name}&nbsp;{value.last_name}
                                                                        </span>
                                                        <span className="star-style">
                                                                            {value.profession}
                                                                        </span>
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
    return []

}