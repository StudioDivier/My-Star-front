import React, {useContext} from 'react';
import {StarsContext} from "../../context/StarsContext";
import './order.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Order = () => {
    const starInfo = useContext(StarsContext);
    const history = useHistory();
    console.log(starInfo)

    const url = 'http://192.168.1.131:8080/';

    return (
        <>
            <div className="order">
                <div className="chosen-star">
                    <div className="chosen-star__info">
                        <h3>{starInfo.starName}</h3>
                        <img src={url + starInfo.starAvatar} alt={'star'}/>
                    </div>
                    <Container>
                        <div className="order__details">
                            <Row>
                                <Col lg>
                                    <div className="price">
                                        <p>Стоимость поздравления:</p>
                                        <p>
                                            <strong>
                                                20 000 - 50 000
                                            </strong>
                                            &nbsp;&#8381;
                                        </p>
                                    </div>
                                </Col>
                                <Col lg>
                                    <div className="rating">
                                        <p>Рейтинг:</p>
                                        <p>
                                            <FontAwesomeIcon icon={['far', 'star']} size='xs'/>
                                            <FontAwesomeIcon icon={['far', 'star']} size='xs'/>
                                            <FontAwesomeIcon icon={['far', 'star']} size='xs'/>
                                            <FontAwesomeIcon icon={['far', 'star']} size='xs'/>
                                            <FontAwesomeIcon icon={['far', 'star']} size='xs'/>
                                        </p>
                                    </div>
                                </Col>
                                <Col lg>
                                    <div className="await-time">
                                        <p>Среднее время ожидания:</p>
                                        <p><strong>{starInfo.starDays} дней</strong></p>
                                    </div>
                                </Col>
                                <Col lg>
                                    <div className="place-order">
                                        <button onClick={() => history.push(`/categories/stars/order/confirm`)}>
                                            Заказать
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}