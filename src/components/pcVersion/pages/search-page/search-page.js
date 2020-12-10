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
                localStorage.removeItem('allStars');
                localStorage.setItem('allStars', JSON.stringify({stars: starsFetch}))
            }
            // console.log(starsFetch)
        }

        fetchData();
    }, [request])

    const allStars = (JSON.parse(window.localStorage.getItem('allStars'))).stars;

    const clickStar = (value) => {
        chooseStar(value)
        localStorage.setItem('selectedStar', JSON.stringify({star: value}))
        history.push('/star-card')
    }

    // console.log(search.length > 0 && allStars.filter(value => value.username.toLowerCase() === search.toLowerCase()).length === 0)

    if (search.length > 0 && allStars.filter(value => value.username.toLowerCase() === search.toLowerCase() || value.username.toLowerCase().includes(search.toLowerCase()) || value.first_name.toLowerCase() === search.toLowerCase() || value.first_name.toLowerCase().includes(search.toLowerCase()) || value.last_name.toLowerCase() === search.toLowerCase() || value.last_name.toLowerCase().includes(search.toLowerCase())).length === 0) {
        return (
            <Container style={{paddingBottom: '400px', textAlign: 'center'}}>
                <Row>
                    <Col>
                        <h1 style={{color: 'white', paddingTop: '100px'}}>Поиск не дал результатов</h1>
                    </Col>
                </Row>
            </Container>
        )
    } else if (search.length > 0) {
        return (
            <>
                <Container style={{paddingBottom: '150px'}}>
                    <Row>
                        <Col>
                            <div className="single-cat">
                                <div className="single-cat__stars">
                                    {
                                        allStars.filter(value => value.username.toLowerCase() === search.toLowerCase() || value.username.toLowerCase().includes(search.toLowerCase()) || value.first_name.toLowerCase() === search.toLowerCase() || value.first_name.toLowerCase().includes(search.toLowerCase()) || value.last_name.toLowerCase() === search.toLowerCase() || value.last_name.toLowerCase().includes(search.toLowerCase())).map((value, key) => {
                                            console.log(value)
                                            return (
                                                <div className="single-cat__star" key={key}
                                                     onClick={() => clickStar(value)}>
                                                    <div className="avatar-img"
                                                         style={{backgroundImage: `url(${SERVER_URL}/media/${value.avatar})`}}>&nbsp;</div>
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
    } else {
        return (
            <Container style={{paddingBottom: '300px', textAlign: 'center'}}>
                <Row>
                    <Col>
                        <h1 style={{color: 'white', paddingTop: '100px'}}>Поиск не дал результатов</h1>
                    </Col>
                </Row>
            </Container>
        )
    }

    // if (search.length > 0) {
    //     return (
    //         <>
    //             <Container style={{paddingBottom: '100px'}}>
    //                 <Row>
    //                     <Col>
    //                         <div className="single-cat">
    //                             <div className="single-cat__stars">
    //                                 {
    //                                     allStars.filter(value => value.username.toLowerCase() === search.toLowerCase()).map((value, key) => {
    //                                         console.log(value)
    //                                         return (
    //                                             <div className="single-cat__star" key={key}
    //                                                  onClick={() => clickStar(value)}>
    //                                                 <div className="avatar-img"
    //                                                      style={{backgroundImage: `url(${SERVER_URL}/media/${value.avatar})`}}>&nbsp;</div>
    //                                                 {/*<img src={catPic + value.avatar} alt=""/>*/}
    //                                                 <div className="star-description">
    //                                                                     <span className="star-name">
    //                                                                         {value.first_name}&nbsp;{value.last_name}
    //                                                                     </span>
    //                                                     <span className="star-style">
    //                                                                         {value.profession}
    //                                                                     </span>
    //                                                 </div>
    //                                             </div>
    //                                         )
    //                                     })
    //                                 }
    //                             </div>
    //                         </div>
    //                     </Col>
    //                 </Row>
    //             </Container>
    //         </>
    //     )
    // }
}