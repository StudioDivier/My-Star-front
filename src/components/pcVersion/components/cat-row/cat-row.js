import React, {useEffect, useState} from 'react';
import './cat-row.scss';
// import avatar from '../../../../img/pc/avatar.png';
import {useHttp} from "../../../../hooks/http.hook";
import {useHistory} from 'react-router-dom';

export const SingleCat = ({id, catName, chooseCat, nameCat, chooseStar, stars1, favData1, topStars1}) => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;

    const userData = JSON.parse(window.localStorage.getItem('userData'));

    const [stars, setStars] = useState([]);
    const [topStars, setTopStars] = useState([]);
    const [favData, setFavData] = useState([]);

    const {request} = useHttp()
    const history = useHistory();

    // const starsList = JSON.parse(window.localStorage.getItem('starsList'));

    // console.log(starsList)

    let catStars = stars;
    let allStars = topStars1;
    let favCat = favData1;

    useEffect(() => {
        async function fetchData() {
            const starsFetch = await request(`/api/star/category/?id=${id}`, 'GET'); //'cors' , //, null, {Authorization: `Bearer ${userData.token}`}
            // console.log(starsFetch)
            if (!!starsFetch.length) {
                setStars([...starsFetch])
                localStorage.removeItem('catStars');
                localStorage.setItem('catStars', JSON.stringify({stars: starsFetch}))
                catStars = (JSON.parse(window.localStorage.getItem('catStars'))).stars;
            }
        }

        async function fetchAllStars() {
            const starsFetch = await request(`/api/star/getlist/`, 'GET'); //'cors' , //, null, {Authorization: `Bearer ${userData.token}`}
            // console.log(starsFetch)
            if (!!starsFetch.length) {
                setTopStars([...starsFetch])
                localStorage.removeItem('allStars');
                localStorage.setItem('allStars', JSON.stringify({stars: starsFetch}))
                allStars = (JSON.parse(window.localStorage.getItem('allStars'))).stars;
            }
        }


        if (userData) {
            async function fetchData2() {
                const favCat1 = await request(`/api/star/favorite/?cust_id=${userData.userId}`, 'GET', null, {Authorization: `Bearer ${userData.token}`})
                if (!!favCat1.length) {
                    setFavData([...favCat1])
                    localStorage.removeItem('favCat');
                    localStorage.setItem('favCat', JSON.stringify({stars: favCat1}))
                    favCat = (JSON.parse(window.localStorage.getItem('favCat'))).stars;
                }
            }

            fetchData2();
        }

        fetchData();
        fetchAllStars();
    }, [request]) // needed?


    // const catStars = (JSON.parse(window.localStorage.getItem('catStars'))).stars;
    // const allStars = (JSON.parse(window.localStorage.getItem('allStars'))).stars;
    // const favCat = (JSON.parse(window.localStorage.getItem('favCat'))).stars;

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
        catStars = (JSON.parse(window.localStorage.getItem('catStars'))).stars;
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
                    {favCat.slice(0, 5).map((value, key) => {
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
                    {/*<span className="browse" onClick={clickHandler2} style={{cursor: 'pointer'}}>Смотреть все</span>*/}
                </div>
                <div className="single-cat__stars">
                    {allStars.filter(value => value.top === true).slice(0, 10).map((value, key) => {
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