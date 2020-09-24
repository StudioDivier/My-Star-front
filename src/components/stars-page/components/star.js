import React, {useContext} from 'react';
import './star.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useHistory} from 'react-router-dom';
import {StarsContext} from "../../../context/StarsContext";

export const Star = ({id, price, name, rating, days, avatar}) => {
    const history = useHistory();
    const star = useContext(StarsContext);

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

    const url = 'http://192.168.1.131:8080/';

    return (
        <div className={'star-card'}>
            <Container fluid>
                <Row>
                    <Col xs={6}>
                        <div className="star-info">
                            <h3>{name}</h3>
                            {/*<Rating*/}
                            {/*    placeholderRating={rating}*/}
                            {/*    emptySymbol={<FontAwesomeIcon icon={['far', 'star']} size='xs'/>}*/}
                            {/*    placeholderSymbol={<FontAwesomeIcon icon={['fas', 'star']} size='xs'/>}*/}
                            {/*    fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} size='xs'/>}*/}
                            {/*/>*/}
                            <FontAwesomeIcon icon={['far', 'star']} size='xs'/>
                            <FontAwesomeIcon icon={['far', 'star']} size='xs'/>
                            <FontAwesomeIcon icon={['far', 'star']} size='xs'/>
                            <FontAwesomeIcon icon={['far', 'star']} size='xs'/>
                            <FontAwesomeIcon icon={['far', 'star']} size='xs'/>
                            <button onClick={chooseStar}>Заказать</button>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <img src={url + avatar} alt="Star"/>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}