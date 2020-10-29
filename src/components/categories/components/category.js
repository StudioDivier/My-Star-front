import React, {useContext, useState} from 'react';
import './category.scss';
// import icon from '../../../img/icon1.svg';
import {useHistory} from 'react-router-dom';
import {useHttp} from "../../../hooks/http.hook";
import {StarsContext} from "../../../context/StarsContext";
import {AuthContext} from "../../../context/AuthContext";
import {useMessage} from "../../../hooks/message.hook";


export const Category = ({id, name, bgColor, catPhoto}) => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;
    const history = useHistory();
    const {request} = useHttp();
    const [starsList, setStarsList] = useState();
    const list = useContext(StarsContext)
    // const authToken = useContext(AuthContext);
    const message = useMessage();

    const clickHandler = async () => {
        try {
            console.log('here0')
            const starsFetch = await request(`/api/star/category/?id=${id}`, 'GET'); //'cors' ,
            console.log('here1')
            setStarsList([...starsFetch])
            console.log('here2')
            list.setArray([...starsFetch])
            console.log('here3')
            history.push(`/categories/stars`)

        } catch (e) {
            message(['В данной категории нет звезд']);
        }
    }

    const catPic = `${SERVER_URL}` + catPhoto;
    // const catPic = 'http://127.0.0.1:8080/' + catPhoto;

    // console.log(starsList)

    return (
        <>
            <div onClick={clickHandler} className={'category-card'}>
                <div style={{backgroundImage: bgColor}}>
                    <div className="category-card__description">
                        <span>Популярные</span>
                        <div className="img-card">
                            <img src={catPic} alt="icon"/>
                        </div>
                    </div>
                    <div className="category-card__info">
                            <h5>{name}</h5>
                            <span>Песня в подарок</span>
                    </div>
                </div>
            </div>
        </>
    )
}