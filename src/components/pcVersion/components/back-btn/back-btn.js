import React from "react";
import './back-btn.scss'
import {useHistory} from 'react-router-dom';

export const Backbtn = ({catId}) => {
    const history = useHistory();

    const clickHandler = () => {
        history.push('/category')
    }

    return (
        <button className="back-btn" onClick={clickHandler}><span>&lt;</span><span>Назад</span></button>
    )
}