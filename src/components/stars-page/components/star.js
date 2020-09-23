import React, {useContext} from 'react';
import './star.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import photo from '../../../img/photo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Rating from 'react-rating';
import {useHistory} from 'react-router-dom';
import {StarsContext} from "../../../context/StarsContext";

export const Star = ({id, price, name, rating, days}) => {
    const history = useHistory();
    const starId = useContext(StarsContext);

    const chooseStar = () => {
        starId.setStarId(id)
        history.push(`/categories/stars/order`);
        console.log(id)
    };

    return (
        <div className={'star-card'}>
            <Container fluid>
                <Row>
                    <Col xs={6}>
                        <div className="star-info">
                            <h3>{name}</h3>
                            <Rating
                                placeholderRating={rating}
                                emptySymbol={<FontAwesomeIcon icon={['far', 'star']} size='xs'/>}
                                placeholderSymbol={<FontAwesomeIcon icon={['fas', 'star']} size='xs'/>}
                                fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} size='xs'/>}
                            />
                            <button onClick={chooseStar}>Заказать</button>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <img src={photo} alt="Star photo"/>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}