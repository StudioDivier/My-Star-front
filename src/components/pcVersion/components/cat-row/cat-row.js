import React, {useContext, useEffect, useState} from 'react';
import './cat-row.scss';
import avatar from '../../../../img/pc/avatar.png';
import {useHttp} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/AuthContext";

export const SingleCat = ({id, catName}) => {

    const userData = JSON.parse(window.localStorage.getItem('userData'));

    const [stars, setStars] = useState([]);


    const authToken = useContext(AuthContext)
    const {request} = useHttp()

    useEffect(() => {
        async function fetchData() {
            const starsFetch = await request(`/api/star/category/?id=${id}`, 'GET', null, {Authorization: `Bearer ${userData.token}`}); //'cors' ,
            if (!!starsFetch.length) {
                setStars([...starsFetch])
            }
        }

        fetchData();
    }, [authToken.token, request]) // needed?

    // if (list) {
    // let newList = [...list];
    console.log(stars)
    return (
        <div className="single-cat">
            <div className="header-row">
                <span className="cat-header">{catName}</span>
                <span className="browse">Смотреть все</span>
            </div>
            <div className="single-cat__stars">
                {stars.map((value, key) => {
                    return (
                        <div className="single-cat__star" key={key}>
                            <img src={avatar} alt=""/>
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