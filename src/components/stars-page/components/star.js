import React, {useContext, useState} from 'react';
import './star.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useHistory} from 'react-router-dom';
import {StarsContext} from "../../../context/StarsContext";
import Ratings from 'react-ratings-declarative';
import {useHttp} from "../../../hooks/http.hook";
import {useMessage} from "../../../hooks/message.hook";
import {AuthContext} from "../../../context/AuthContext";
// import Modal from 'react-bootstrap/Modal';
// import {Modal} from './rate-modal';
import Modal from 'react-modal';

export const Star = ({id, price, name, rating, days, avatar}) => {
    const history = useHistory();
    const star = useContext(StarsContext);
    const authToken = useContext(AuthContext)
    const message = useMessage();
    const {request} = useHttp();
    const [newRating, setNewRating] = useState(rating);
    // const [smShow, setSmShow] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);


    console.log(authToken)
    const rateHandler = async () => {
        try {
            const dataLog = await request('/api/ratestar/', 'PUT', {
                "rating": `${newRating}`,
                "adresat": authToken.id,
                "adresant": id,
            }, {Authorization: `Bearer ${authToken.token}`})
            message(dataLog);
            console.log(dataLog)
        } catch (e) {
            message(e);
            // console.log(e);
        }
    }

    const chooseStar = () => {
        star.setStarId(id)
        star.setStarPrice(price)
        star.setStarName(name)
        star.setStarRating(rating)
        star.setStarDays(days)
        star.setAvatar(avatar)
        history.push(`/categories/stars/order`);
        // console.log(id)
    };

    const bgUrl = 'http://192.168.1.131:8080' + avatar;

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
            padding: '20px 30px'
        }
    };

    const showModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    Modal.setAppElement('.App')

    return (
        <div className={'star-card'}>
            <Container fluid>
                <Row>
                    <Col xs={6}>
                        <div className="star-info">
                            <h3>{name}</h3>

                            <Ratings
                                rating={newRating}
                                widgetRatedColors="orange"
                                widgetDimensions="14px"
                                widgetSpacings="3px"
                            >
                                <Ratings.Widget/>
                                <Ratings.Widget/>
                                <Ratings.Widget/>
                                <Ratings.Widget/>
                                <Ratings.Widget/>
                            </Ratings>

                            {/*<Modal*/}
                            {/*    size="sm"*/}
                            {/*    show={smShow}*/}
                            {/*    onHide={() => setSmShow(false)}*/}
                            {/*    aria-labelledby="example-modal-sizes-title-sm"*/}
                            {/*>*/}
                            {/*    <Modal.Header closeButton>*/}
                            {/*        <Modal.Title id="example-modal-sizes-title-sm">*/}
                            {/*            Поставьте рейтинг*/}
                            {/*        </Modal.Title>*/}
                            {/*    </Modal.Header>*/}

                            {/*    <Modal.Body>*/}
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
                            {/*    </Modal.Body>*/}
                            {/*</Modal>*/}
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                contentLabel="Example Modal"
                                style={customStyles}
                            >
                                <div className="modal-header">
                                    <span>Оценить звезду</span>
                                    <button onClick={closeModal}>х</button>
                                </div>
                                <div className="spread">
                                    <Ratings
                                        rating={newRating}
                                        widgetRatedColors="orange"
                                        widgetDimensions="14px"
                                        widgetSpacings="3px"
                                        changeRating={setNewRating}
                                    >
                                        <Ratings.Widget/>
                                        <Ratings.Widget/>
                                        <Ratings.Widget/>
                                        <Ratings.Widget/>
                                        <Ratings.Widget/>
                                    </Ratings>
                                    <button onClick={rateHandler}>Оценить</button>
                                </div>
                            </Modal>

                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className="avatar-img"
                             style={{backgroundImage: "url(" + bgUrl + ")"}}
                        />
                        {/*<img src={url + avatar} alt="Star"/>*/}
                    </Col>
                    <Col xs={12}>
                        <div className="buttonContainer">
                            <button onClick={chooseStar}>Заказать</button>
                            <button onClick={() => showModal()}>Оцените</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}