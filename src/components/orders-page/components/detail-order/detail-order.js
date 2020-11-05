import React, {useContext, useState} from 'react';
import './detail-order.scss';
import menu from '../../../../img/order_icons/menu.svg';
// import like from '../../../../img/order_icons/icon_like.png';
import {NavBar} from "../../../navbar/navbar";
import {useMessage} from "../../../../hooks/message.hook";
import {useHttp} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/AuthContext";
import Modal from 'react-modal';
import placeholder from '../../../../img/userBck.png';
import axios from "axios";


export const DetailOrder = ({isActive, details, setActive}) => {

    const userData = JSON.parse(window.localStorage.getItem('userData'));

    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;

    const authToken = useContext(AuthContext);
    const message = useMessage();
    // const [data, setData] = useState([]);
    const [video, setVideo] = useState('');
    const {request} = useHttp();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        from_user: userData.userId,
        user_id: details.starId,
        message: ''
    })

    const hashTagLink = '#';

    const changeHandler = event => {
        setForm(({...form, [event.target.name]: event.target.value}))
    }

    const writeMessage = async () => {
        // console.log({...form})
        if (form.message.length > 0) {
            try {
                const message1 = await request('/api/message/', 'POST', {...form}, {Authorization: `Bearer ${authToken.token}`})
                message(message1.toString())
            } catch (e) {
                message(e);
            }
        } else {
            message(['Введите сообщение!'])
        }
    }

    // Modal

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: 'auto',
            width: '80%',
            borderRadius: '25px',
            padding: '30px'
        }
    };

    const closeModal = () => {
        setIsOpen(!modalIsOpen);
    }

    const showModal = () => {
        setIsOpen(true)
    }

    Modal.setAppElement(document.querySelector('.App'))

    // View video if order complete

    function seeVideo() {
        console.log(details.video)
        window.open(`media/${details.video}`).focus();
    }

    function returnVid() {
        if (details.status === 3) {
            return <div className="btn-wrapper">
                <button
                    onClick={seeVideo}
                    className={'submitButton'}
                >
                    Поздравление
                </button>
                <hr/>
                <button
                    onClick={showModal}
                    className={'submitButton'}
                >
                    Связаться с исполнителем
                </button>
                <p>Совершая заказ, вы соглашаетесь с условиями</p>
            </div>
        } else {
            return <div className="btn-wrapper">
                <button
                    onClick={showModal}
                    className={'submitButton'}
                >
                    Связаться с исполнителем
                </button>
                <p>Совершая заказ, вы соглашаетесь с условиями</p>
            </div>
        }
    }

    // Parse avatar

    const starAv = `${SERVER_URL}${details.starAvatar}`
    // const custAv = `${SERVER_URL}${details.customerAvatar}`
    const custAv = placeholder;
    console.log(details.orderId)

    // Load video

    const uploadVid = (e) => {
        e.preventDefault();

        // try {
        //     let response = await fetch(`${SERVER_URL}/api/upload/congritulatoin/`, {
        //         method: 'POST',
        //         body: {
        //             video_con: document.querySelector('input[type="file"]').files[0],
        //             star_id: details.starId,
        //             order_id: details.orderId
        //         },
        //         headers: {Authorization: `Bearer ${authToken.token}`, 'Content-Type': 'multipart/form-data'}
        //     })
        //     let result = await response.json();
        //
        //     alert(result.message);
        // } catch (e) {
        //     message(e)
        // }

        const formData = new FormData()
        // const files = document.querySelector('input[type="file"]').files[0]
        // formData.append("myFile", files)
        // console.log(files)

        // let myForm = document.getElementById('formElem')
        // console.log(video)
        formData.append("video_con", video)
        formData.append("star_id", details.starId)
        formData.append("order_id", details.orderId)
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        axios.post(`${SERVER_URL}/api/upload/congritulatoin/`, formData, {
            headers: {Authorization: `Bearer ${authToken.token}`, 'content-type': 'multipart/form-data'}
        })
            .then(res => {
                console.log(res)
                if (typeof res === 'string') {
                    message(res)
                } else {
                    message('Видео отправлено!')
                }
                // console.log(res.data);
            })
            .catch(err => message(err))

        // try {
        //     const uploadVideo = await request('/api/upload/congritulatoin/', 'PUT', {
        //         formData
        //     }, {Authorization: `Bearer ${authToken.token}`, 'content-type': 'multipart/form-data'})
        //     console.log(uploadVideo)
        // } catch (e) {
        //     message(e)
        // }

    }

    const videoInputHandler = (e) => {
        // console.log(e.target.files[0])
        message('Видео загружено')
        setVideo(e.target.files[0])
    }

    if (isActive) {
        if (!userData.is_star) {
            return (
                <>
                    <div className="profile">
                        <div className="main-wrapper">

                            <div className="profile__info"
                                 style={{background: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${starAv})`}}>
                                <div className="header">
                                    <div className="header-top">
                                        <a href={hashTagLink} data-target="slide-out"
                                           className="sidenav-trigger show-on-large">
                                            <img src={menu} alt=""/>
                                        </a>
                                        <span style={{color: 'white'}}>Страница заказа</span>
                                        <span className={'closeOrder'} onClick={() => setActive(false)}
                                              style={{color: 'white'}}>&times;</span>
                                    </div>
                                    <div className="header-bottom">
                                        <h3 style={{color: 'white'}}>{details.star}</h3>
                                        <span style={{color: '#d4d7e6'}}>{details.profession}</span>
                                        <div className="likes">
                                            {/*<img src={like} alt=""/><span style={{color: 'white'}}>&nbsp;&nbsp;425</span>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="profile__details">

                                <div className="info-row">
                                    <div className="wrapper">
                                        <span>Дата</span>
                                        <span>{details.date}</span>
                                    </div>
                                </div>

                                {/*<div className="info-row">*/}
                                {/*    <div className="wrapper">*/}
                                {/*        <span>Время</span>*/}
                                {/*        <span>{details.time}</span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                <div className="info-row">
                                    <div className="wrapper">
                                        <span>Комментарий</span>
                                        <span>{details.comment}</span>
                                    </div>
                                </div>

                                <div className="info-row">
                                    <div className="wrapper">
                                        <span>Кому</span>
                                        <span>{details.forWhom}</span>
                                    </div>
                                </div>

                                <div className="info-row">
                                    <div className="wrapper">
                                        <span>Имя заказчика</span>
                                        <span>{details.username}</span>
                                    </div>
                                </div>

                                <div className="info-row">
                                    <div className="wrapper">
                                        <span>Цена</span>
                                        <span>{details.price}</span>
                                    </div>
                                </div>

                            </div>

                            {returnVid()}
                            {/*<div className="btn-wrapper">*/}
                            {/*    <button*/}
                            {/*        onClick={showModal}*/}
                            {/*        className={'submitButton'}*/}
                            {/*    >*/}
                            {/*        Связаться с исполнителем*/}
                            {/*    </button>*/}
                            {/*    <p>Совершая заказ, вы соглашаетесь с условиями</p>*/}
                            {/*</div>*/}
                        </div>

                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        style={customStyles}
                    >
                        <div className="modal-header">
                            <span>Напишите сообщение</span>
                        </div>
                        <div className="spread">
                            <div className="single-input__wrapper">
                                <textarea
                                    placeholder={'Ваше сообщение...'}
                                    onChange={changeHandler}
                                    name={'message'}
                                    value={form.message}
                                    className={'contactTextArea'}
                                    rows={10}
                                    style={{borderRadius: '10px'}}
                                />
                            </div>
                            <button onClick={writeMessage}>Отправить</button>
                        </div>
                    </Modal>
                    <NavBar/>
                </>
            )
        }
        return (
            <>
                <div className="profile">
                    <div className="main-wrapper">

                        <div className="profile__info"
                             style={{backgroundImage: `url(${custAv})`}}>
                            <div className="header">
                                <div className="header-top">
                                    <a href={hashTagLink} data-target="slide-out"
                                       className="sidenav-trigger show-on-large">
                                        <img src={menu} alt=""/>
                                    </a>
                                    <span style={{color: 'white'}}>Страница заказа</span>
                                    <span className={'closeOrder'} onClick={() => setActive(false)}
                                          style={{color: 'white'}}>&times;</span>
                                </div>
                                <div className="header-bottom">
                                    <h3 style={{color: 'white'}}>{details.customer}</h3>
                                    <div>
                                        {/*<span>Земля</span> <span>&nbsp; | &nbsp;</span> <span>{years} лет</span>*/}
                                    </div>
                                    <div className="likes">
                                        {/*<img src={like} alt=""/><span style={{color: 'white'}}>&nbsp;&nbsp;425</span>*/}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile__details">

                            <div className="info-row">
                                <div className="wrapper">
                                    <span>Дата</span>
                                    <span>{details.date}</span>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="wrapper">
                                    <span>Время</span>
                                    <span>{details.time}</span>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="wrapper">
                                    <span>Комментарий</span>
                                    <span>{details.comment}</span>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="wrapper">
                                    <span>Кому</span>
                                    <span>{details.forWhom}</span>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="wrapper">
                                    <span>Имя заказчика</span>
                                    <span>{details.customer}</span>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="wrapper">
                                    <span>Цена</span>
                                    <span>{details.price}</span>
                                </div>
                            </div>

                        </div>
                        <div className="btn-wrapper">
                            {/*<label form="fileUpload" className={'custom-file-upload'}>*/}
                            {/*    <form id={'formElem'}>*/}
                            {/*        <input*/}
                            {/*            type="file"*/}
                            {/*            name={'video'}*/}
                            {/*            id="fileUpload"*/}
                            {/*            onChange={(e) => uploadVid(e)}*/}
                            {/*        />*/}
                            {/*        <span>Загрузить поздравление</span>*/}
                            {/*    </form>*/}
                            {/*</label>*/}
                            <form id={'formElem'} onSubmit={uploadVid}>
                                <label form="formElem" className={'custom-file-upload'}>
                                    <input
                                        type="file"
                                        accept={'image/*, video/*'}
                                        name={'video'}
                                        id="formElem"
                                        onChange={(e) => videoInputHandler(e)}
                                        // onChange={(e) => uploadVid(e)}
                                    />
                                    <span>Загрузить поздравление</span>
                                </label>
                                <label form="submit" className={'custom-file-upload'}>
                                    <input type="submit" id={'submit'}/>
                                    <span>Отправить</span>
                                </label>
                            </form>
                        </div>

                    </div>

                </div>
                <NavBar/>
            </>
        )
    }
    return []
}