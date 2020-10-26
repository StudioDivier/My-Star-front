import React from "react";
import './back-btn.scss'
import {useHistory} from 'react-router-dom';

export const Backbtn = () => {
    const history = useHistory();

    const clickHandler = () => {
        history.push('/')
    }

    return (
        <button className="back-btn" onClick={clickHandler}><span>&lt;</span><span>Назад</span></button>
    )
}