import React, {useContext, useEffect, useState} from 'react';
import './cat-row.scss';
import avatar from '../../../../img/pc/avatar.png';
import {useHttp} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/AuthContext";
import {useHistory} from 'react-router-dom';

export const SingleCat = ({id, catName, chooseCat, nameCat, chooseStar}) => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;

    // const catPic = 'http://exprome.ru:8080';

    const userData = JSON.parse(window.localStorage.getItem('userData'));

    const [stars, setStars] = useState([]);

    const authToken = useContext(AuthContext)
    const {request} = useHttp()
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const starsFetch = await request(`/api/star/category/?id=${id}`, 'GET'); //'cors' , //, null, {Authorization: `Bearer ${userData.token}`}
            if (!!starsFetch.length) {
                setStars([...starsFetch])
            }
        }

        fetchData();
    }, [authToken.token, request]) // needed?

    const clickHandler = () => {
        chooseCat(id)
        nameCat(catName)
        history.push('/category')
    }

    const clickStar = (value) => {
        chooseStar(value)
        history.push('/star-card')
    }

    // if (list) {
    // let newList = [...list];
    // console.log(stars)
    if (window.location.pathname === '/category') {
        return (
            <div className="single-cat">
                <div className="header-row">
                    <span className="cat-header">{catName}</span>
                </div>
                <div className="single-cat__stars">
                    {stars.map((value, key) => {
                        return (
                            <div className="single-cat__star" key={key} onClick={() => clickStar(value)}>
                                <div className="avatar-img"
                                     style={{backgroundImage: 'url(' + `${SERVER_URL}` + value.avatar + ')'}}>&nbsp;</div>
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
                    })}
                </div>
            </div>
        )
    }
    return (
        <div className="single-cat">
            <div className="header-row">
                <span className="cat-header">{catName}</span>
                <span className="browse" onClick={clickHandler} style={{cursor: 'pointer'}}>Смотреть все</span>
            </div>
            <div className="single-cat__stars">
                {stars.slice(0, 5).map((value, key) => {
                    return (
                        <div className="single-cat__star" key={key} onClick={() => clickStar(value)}>
                            <div className="avatar-img"
                                 style={{backgroundImage: 'url(' + `${SERVER_URL}` + value.avatar + ')'}}>&nbsp;</div>
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
                })}
            </div>
        </div>
    )
    // }
    // return []


}