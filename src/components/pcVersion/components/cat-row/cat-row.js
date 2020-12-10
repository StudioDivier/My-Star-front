import React, {useEffect, useState} from 'react';
import './cat-row.scss';
// import avatar from '../../../../img/pc/avatar.png';
import {useHttp} from "../../../../hooks/http.hook";
import {useHistory} from 'react-router-dom';

export const SingleCat = ({id, catName, chooseCat, nameCat, chooseStar}) => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;

    const userData = JSON.parse(window.localStorage.getItem('userData'));

    const [stars, setStars] = useState([]);
    const [topStars, setTopStars] = useState([]);
    const [favData, setFavData] = useState([]);

    const {request} = useHttp()
    const history = useHistory();

    // const starsList = JSON.parse(window.localStorage.getItem('starsList'));

    // console.log(starsList)

    useEffect(() => {
        async function fetchData() {
            const starsFetch = await request(`/api/star/category/?id=${id}`, 'GET'); //'cors' , //, null, {Authorization: `Bearer ${userData.token}`}
            // console.log(starsFetch)
            if (!!starsFetch.length) {
                setStars([...starsFetch])
                localStorage.removeItem('catStars');
                localStorage.setItem('catStars', JSON.stringify({stars: starsFetch}))
            }
        }

        async function fetchAllStars() {
            const starsFetch = await request(`/api/star/getlist/`, 'GET'); //'cors' , //, null, {Authorization: `Bearer ${userData.token}`}
            // console.log(starsFetch)
            if (!!starsFetch.length) {
                setTopStars([...starsFetch])
                localStorage.removeItem('allStars');
                localStorage.setItem('allStars', JSON.stringify({stars: starsFetch}))
            }
        }


        if (userData) {
            async function fetchData2() {
                const favCat = await request(`/api/star/favorite/?cust_id=${userData.userId}`, 'GET', null, {Authorization: `Bearer ${userData.token}`})
                if (!!favCat.length) {
                    setFavData([...favCat])
                    localStorage.removeItem('favCat');
                    localStorage.setItem('favCat', JSON.stringify({stars: favCat}))
                }
            }

            fetchData2();
        }

        fetchData();
        fetchAllStars();
    }, [id, request]) // needed?

    const catStars = (JSON.parse(window.localStorage.getItem('catStars'))).stars;
    const allStars = (JSON.parse(window.localStorage.getItem('allStars'))).stars;
    const favCat = (JSON.parse(window.localStorage.getItem('favCat'))).stars;

    const currentCat = JSON.parse(window.localStorage.getItem('catName'));

    const clickHandler = () => {
        chooseCat(id)
        localStorage.setItem('catName', JSON.stringify({name: catName}))
        nameCat(catName)
        history.push('/favorites')
    }

    const clickHandler2 = () => {
        chooseCat(id)
        localStorage.setItem('catName', JSON.stringify({name: catName}))
        nameCat(catName)
        history.push('/top-10')
    }

    const clickStar = (value) => {
        chooseStar(value)
        localStorage.setItem('selectedStar', JSON.stringify({star: value}))
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
                    {catStars.map((value, key) => {
                        return (
                            <div className="single-cat__star" key={key} onClick={() => clickStar(value)}>
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
                    })}
                </div>
            </div>
        )
    }
    if (window.location.pathname === '/favorites') {
        return (
            <div className="single-cat">
                <div className="header-row">
                    <span className="cat-header">{catName}</span>
                </div>
                <div className="single-cat__stars">
                    {favCat.map((value, key) => {
                        return (
                            <div className="single-cat__star" key={key} onClick={() => clickStar(value)}>
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
                    })}
                </div>
            </div>
        )
    }
    if (window.location.pathname === '/top-10') {
        return (
            <div className="single-cat">
                <div className="header-row">
                    <span className="cat-header">{catName}</span>
                </div>
                <div className="single-cat__stars">
                    {allStars.filter(value => value.top === true).map((value, key) => {
                        return (
                            <div className="single-cat__star" key={key} onClick={() => clickStar(value)}>
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
                    })}
                </div>
            </div>
        )
    }
    if (catName === 'Избранное' && favData[0] !== "Нет избранных звезд") {
        return (
            <div className="single-cat">
                <div className="header-row">
                    <span className="cat-header">{catName}</span>
                    <span className="browse" onClick={clickHandler} style={{cursor: 'pointer'}}>Смотреть все</span>
                </div>
                <div className="single-cat__stars">
                    {favData.slice(0, 5).map((value, key) => {
                        return (
                            <div className="single-cat__star" key={key} onClick={() => clickStar(value)}>
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
                    })}
                </div>
            </div>
        )
    }
    if (catName === 'Топ-10') {
        return (
            <div className="single-cat">
                <div className="header-row">
                    <span className="cat-header">{catName}</span>
                    <span className="browse" onClick={clickHandler2} style={{cursor: 'pointer'}}>Смотреть все</span>
                </div>
                <div className="single-cat__stars">
                    {topStars.filter(value => value.top === true).slice(0, 5).map((value, key) => {
                        return (
                            <div className="single-cat__star" key={key} onClick={() => clickStar(value)}>
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
                    })}
                </div>
            </div>
        )
    } else {
        return []
    }
    // }
    // return []


}