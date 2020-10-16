import React from 'react';
import './bottom-menu.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import home from '../../img/home.svg'
import cats from '../../img/categories.svg'
import orders from '../../img/orders.svg'
import account from '../../img/account.svg'

export const BottomMenu = () => {
    return (
        <div className={'bottom-menu'}>
            <Container>
                <Row>
                    <Col>
                        <img src={home} alt="Home"/>
                        <span>Главная</span>
                    </Col>
                    <Col>
                        <img src={cats} alt="Categories"/>
                        <span>Категории</span>
                    </Col>
                    <Col>
                        <img src={orders} alt="Orders"/>
                        <span>Мои заказы</span>
                    </Col>
                    <Col>
                        <img src={account} alt="Account"/>
                        <span>Аккаунт</span>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}