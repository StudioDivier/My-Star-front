import React, {useContext, useEffect, useState} from 'react';
import './profile.scss';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import menu from '../../img/order_icons/menu.svg';
import like from '../../img/order_icons/icon_like.png';
import {NavBar} from "../navbar/navbar";
import {useMessage} from "../../hooks/message.hook";
import placeholder from '../../img/userBck.png';
import {BottomMenu} from "../bottom-menu/bottom-menu";
// import MaskedInput from "react-text-mask";

export const Profile = () => {

    const authToken = useContext(AuthContext);
    const message = useMessage();
    const {request} = useHttp();
    const [data, setData] = useState([]);
    // const [form, setForm] = useState({"user_id": authToken.id, "image": ''});

    // console.log(authToken)

    const changeHandler = event => {
        setData(({...data, [event.target.name]: event.target.value}))
    }

    // Получить данные профиля

    useEffect(() => {
        async function fetchData() {
            const personal = await request(`/api/personal/?is_star=${authToken.isStar}&user_id=${authToken.id}`, 'GET', null, {Authorization: `Bearer ${authToken.token}`})
            // console.log(personal)
            setData(personal)
            // console.log('hello1')
        }

        // console.log('hello2')
        fetchData();
    }, [authToken.isStar, authToken.id, authToken.token, request])

    // Получить путь картинки

    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;
    const avatar = `${SERVER_URL}/media/${data.avatar}`;
    // const placeholderAvatar = `${SERVER_URL}` + placeholder;
    // console.log(data.avatar)

    // Высчитать сколько лет пользователю

    const birth = new Date(data.date_of_birth);
    const currentDate = new Date().toISOString().substring(0, 10);

    function daysBetween(date1String, date2String) {
        let d1 = new Date(date1String);
        let d2 = new Date(date2String);
        return Math.floor((d2 - d1) / (1000 * 3600 * 24) / 365);
    }

    const years = daysBetween(birth, currentDate);

    // Изменение персональных данных

    const submitHandler = async () => {

        try {
            const dataLog = await request('/api/personal/', 'PUT', {
                ...data,
                id: authToken.id
            }, {Authorization: `Bearer ${authToken.token}`})
            if (dataLog === 201) {
                message('Данные успешно изменены');
                authToken.login(authToken.token, data.username, authToken.is_star, authToken.userId, data.email, authToken.avatar)
            }
        } catch (e) {
            message(e);

            // console.log(e);
        }
    }

    const hashTagLink = '#';

    // Запросить смену пароля

    const makeRequest = async () => {
        try {
            const changePW = await request('/password-reset/', 'POST', {email: authToken.email}, {Authorization: `Bearer ${authToken.token}`})
            alert('Вам на почту отправлена ссылка для смены пароля');
        } catch (e) {
            message(e)
        }
    }

    // Смена аватарки

    // const handleImageUpload = async (event) => {
    //     const files = event.target.files
    //     console.log(files[0])
    //     const formData = new FormData()
    //     formData.append('myFile', files)
    //     console.log(formData)
    //
    //     try {
    //         const changeAvatar = await request('/api/upload/avatar/', 'POST', {
    //             "user_id": authToken.id,
    //             "image": formData
    //         }, {Authorization: `Bearer ${authToken.token}`})
    //         console.log(changeAvatar)
    //     } catch (e) {
    //         message(e)
    //     }
    //
    // }


    function determineStar() {
        if (authToken.isStar) {
            return (
                <div className="likes">
                    <img src={like} alt=""/><span>&nbsp;&nbsp;{data.likes}</span>
                </div>
            )
        }
        return []
    }

    function look4Avatar() {
        if (data.avatar) {
            return {
                background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${avatar})`,
                color: 'white'
            }
        }
        return {
            background: `url(${placeholder})`,
            color: 'white'
        }
    }

    // function look4Avatar2() {
    //     if (data.avatar) {
    //         return {
    //             position: 'absolute',
    //             left: '15px',
    //         }
    //     }
    //     return {
    //         position: 'absolute',
    //         left: '15px',
    //         background: 'rgba(0, 0, 0, 0.2)',
    //         padding: '10px',
    //         borderRadius: '35px'
    //     }
    // }

    function handleYears() {
        const count = years % 10
        if (count) {
            let idk;
            if (count === 1) {
                idk = 'год'
            } else if (count === 2 || count === 3 || count === 4) {
                idk = 'года'
            } else {
                idk = 'лет'
            }

            return idk;
        }
    }

    return (
        <>
            <div className="profile">
                <div className="main-wrapper">

                    <div className="profile__info"
                         style={look4Avatar()}>
                        <div className="header">
                            <div className="header-top">
                                <a href={hashTagLink} data-target="slide-out" className="sidenav-trigger show-on-large">
                                    <img src={menu} alt=""/>
                                </a>
                                <span>Профиль</span>
                            </div>
                            <div className="header-bottom">
                                <h3>{data.username}</h3>
                                <div>
                                    <span>Россия</span> <span>&nbsp; | &nbsp;</span>
                                    <span>{years} {handleYears()}</span>
                                </div>
                                {determineStar()}
                            </div>
                        </div>
                    </div>

                    <div className="profile__details">
                        <div className="first-name">
                            <div className="wrapper">
                                <span>Имя</span>
                                <input
                                    type="text"
                                    value={data.first_name}
                                    name={'first_name'}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                        <div className="last-name">
                            <div className="wrapper">
                                <span>Фамилия</span>
                                <input
                                    type="text"
                                    value={data.last_name}
                                    name={'last_name'}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                        <div className="username">
                            <div className="wrapper">
                                <span>Логин</span>
                                <input
                                    type="text"
                                    value={data.username}
                                    name={'username'}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                        <div className="e-mail">
                            <div className="wrapper">
                                <span>E-mail</span>
                                <input
                                    type="text"
                                    value={data.email}
                                    name={'email'}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                        <div className="phone">
                            <div className="wrapper">
                                <span>Телефон</span>
                                <input
                                    type="text"
                                    value={data.phone}
                                    name={'phone'}
                                    onChange={changeHandler}
                                />
                                {/*<MaskedInput*/}
                                {/*    mask={[/[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}*/}
                                {/*    type="text"*/}
                                {/*    value={data.phone}*/}
                                {/*    name={'phone'}*/}
                                {/*    onChange={changeHandler}*/}
                                {/*/>*/}
                            </div>
                        </div>
                        <div className="birthday">
                            <div className="wrapper">
                                <span>Дата рождения</span>
                                <input
                                    type="text"
                                    value={data.date_of_birth}
                                    name={'date_of_birth'}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                        {/*<div className="avatar">*/}
                        {/*    <div className="wrapper">*/}
                        {/*        <span>Аватарка</span>*/}
                        {/*        <input*/}
                        {/*            type="file"*/}
                        {/*            name={'image'}*/}
                        {/*            id="fileUpload"*/}
                        {/*            onChange={(event) => handleImageUpload(event)}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div className="btn-wrapper">
                        <button
                            onClick={submitHandler}
                            className={'submitButton'}
                        >
                            Сохранить изменения
                        </button>
                        <hr/>
                        <button
                            onClick={makeRequest}
                            className={'submitButton'}
                        >
                            Изменить пароль
                        </button>
                    </div>
                </div>

            </div>
            <NavBar/>
            <BottomMenu/>
        </>
    )
}