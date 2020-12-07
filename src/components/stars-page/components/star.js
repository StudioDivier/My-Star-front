import React, {useContext} from 'react';
import './star.scss';
import {useHistory} from 'react-router-dom';
import {StarsContext} from "../../../context/StarsContext";
// import Ratings from 'react-ratings-declarative';
// import {useHttp} from "../../../hooks/http.hook";
// import {useMessage} from "../../../hooks/message.hook";
// import {AuthContext} from "../../../context/AuthContext";
// import Modal from 'react-bootstrap/Modal'; //unused
// import {Modal} from './rate-modal'; //unused
// import Modal from 'react-modal';
import orders from '../../../img/orders_amount.svg'

export const Star = ({id, price, name, rating, days, avatar, bgColor, likes, anotherPrice, profession}) => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL2;

    const history = useHistory();
    const star = useContext(StarsContext);
    // const authToken = useContext(AuthContext)
    // const message = useMessage();
    // const {request} = useHttp();
    // const [newRating, setNewRating] = useState(rating);
    // const [smShow, setSmShow] = useState(false);
    // const [modalIsOpen, setIsOpen] = useState(false);

    // console.log(authToken)
    // const rateHandler = async () => {
    //     try {
    //         const dataLog = await request('/api/ratestar/', 'PUT', {
    //             "rating": `${newRating}`,
    //             "adresat": authToken.id,
    //             "adresant": id,
    //         }, {Authorization: `Bearer ${authToken.token}`})
    //         message(dataLog);
    //         console.log(dataLog)
    //     } catch (e) {
    //         message(e);
    //         // console.log(e);
    //     }
    // }

    const chooseStar = () => {
        star.setStarId(id)
        star.setStarPrice(price)
        star.setStarName(name)
        star.setStarRating(rating)
        star.setStarDays(days)
        star.setAvatar(avatar)
        star.setLikes(likes)
        star.setAnotherPrice(anotherPrice)
        star.setProfession(profession)
        history.push(`/categories/stars/order`);
        // console.log(id)
    };

    const bgUrl = `${SERVER_URL}` + avatar;

    // const customStyles = {
    //     content: {
    //         top: '50%',
    //         left: '50%',
    //         right: 'auto',
    //         bottom: 'auto',
    //         marginRight: '-50%',
    //         transform: 'translate(-50%, -50%)',
    //         height: 'auto',
    //         width: '80%',
    //         borderRadius: '25px',
    //         padding: '20px 30px'
    //     }
    // };

    // const showModal = () => {
    //     setIsOpen(true)
    // }
    // const closeModal = () => {
    //     setIsOpen(false)
    // }
    // Modal.setAppElement('.App')

    const whatPage = () => {
        if (window.location.pathname !== "/search") {
            return (
                                    <div className="star-stats">
                        <div className="star-stats__likes">
                            <span>{likes}</span>
                            <span>Like</span>
                        </div>
                    </div>
            )
        }
    }


    return (
        <div onClick={chooseStar}>
            <div className={'star-card'} style={{backgroundImage: bgColor}}>

                <div className="avatar-img"
                     style={{backgroundImage: "url(" + bgUrl + ")"}}
                />
                <div className="orders-amount">
                    <span>&lt; 10</span>
                    <span>заказов</span>
                </div>
                <div className="star-info">
                    <div className="star-description">
                        <h5>{name}</h5>
                        <span>{profession}</span>
                    </div>
                    {whatPage()}
                    {/*<div className="star-stats">*/}
                    {/*    <div className="star-stats__likes">*/}
                    {/*        <span>{likes}</span>*/}
                    {/*        <span>Like</span>*/}
                    {/*    </div>*/}
                        {/*<div className="star-stats__likes">*/}
                        {/*    <span>999</span>*/}
                        {/*    <span>Like</span>*/}
                        {/*</div>*/}
                        {/*<div className="star-stats__likes">*/}
                        {/*    <span>999</span>*/}
                        {/*    <span>Like</span>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>

                <div className="orders">
                    <img src={orders} alt=""/>
                </div>

                {/*<Container fluid>*/}
                {/*    <Row>*/}
                {/*<Col xs={6}>*/}
                {/*<div className="star-info">*/}
                {/*<h3>{name}</h3>*/}

                {/*<Ratings*/}
                {/*    rating={newRating}*/}
                {/*    widgetRatedColors="orange"*/}
                {/*    widgetDimensions="14px"*/}
                {/*    widgetSpacings="3px"*/}
                {/*>*/}
                {/*    <Ratings.Widget/>*/}
                {/*    <Ratings.Widget/>*/}
                {/*    <Ratings.Widget/>*/}
                {/*    <Ratings.Widget/>*/}
                {/*    <Ratings.Widget/>*/}
                {/*</Ratings>*/}

                {/*<Modal*/}
                {/*    isOpen={modalIsOpen}*/}
                {/*    onRequestClose={closeModal}*/}
                {/*    contentLabel="Example Modal"*/}
                {/*    style={customStyles}*/}
                {/*>*/}
                {/*    <div className="modal-header">*/}
                {/*        <span>Оценить звезду</span>*/}
                {/*        <button onClick={closeModal}>х</button>*/}
                {/*    </div>*/}
                {/*    <div className="spread">*/}
                {/*        <Ratings*/}
                {/*            rating={newRating}*/}
                {/*            widgetRatedColors="orange"*/}
                {/*            widgetDimensions="14px"*/}
                {/*            widgetSpacings="3px"*/}
                {/*            changeRating={setNewRating}*/}
                {/*        >*/}
                {/*            <Ratings.Widget/>*/}
                {/*            <Ratings.Widget/>*/}
                {/*            <Ratings.Widget/>*/}
                {/*            <Ratings.Widget/>*/}
                {/*            <Ratings.Widget/>*/}
                {/*        </Ratings>*/}
                {/*        <button onClick={rateHandler}>Оценить</button>*/}
                {/*    </div>*/}
                {/*</Modal>*/}

                {/*</div>*/}
                {/*</Col>*/}
                {/*<Col xs={6}>*/}
                {/*    <div className="avatar-img"*/}
                {/*         style={{backgroundImage: "url(" + bgUrl + ")"}}*/}
                {/*    />*/}
                {/*    /!*<img src={url + avatar} alt="Star"/>*!/*/}
                {/*</Col>*/}
                {/*<Col xs={12}>*/}
                {/*    <div className="buttonContainer">*/}
                {/*        <button onClick={chooseStar}>Заказать</button>*/}
                {/*        <button onClick={() => showModal()}>Оцените</button>*/}
                {/*    </div>*/}
                {/*</Col>*/}
                {/*    </Row>*/}
                {/*</Container>*/}
            </div>
        </div>
    )
}