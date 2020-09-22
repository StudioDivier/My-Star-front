import React from 'react';
import './category.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import icon from '../../../img/icon1.png';

export const Category = ({icon1, name}) => {
    return (
        <div className={'category-card'}>
            <Container fluid>
                <Row>
                    <Col xs={4}>
                        <div className="card-logo">
                            <div className="logo-gradient">
                                <img src={icon} alt={'icon'} />
                            </div>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <div className="card-info">
                            <Row>
                                <Col lg>
                                    Песня в подарок девушке
                                </Col>
                                <Col lg>
                                    <button>Заказать</button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}