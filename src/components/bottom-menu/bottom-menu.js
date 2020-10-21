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
                        <a href="/categories">
                            <img src={home} alt="Home"/>
                            <span>Главная</span>
                        </a>
                    </Col>
                    <Col>
                        <a href="/categories">
                            <img src={cats} alt="Categories"/>
                            <span>Категории</span>
                        </a>
                    </Col>
                    <Col>
                        <a href="/orders">
                            <img src={orders} alt="Orders"/>
                            <span>Мои заказы</span>
                        </a>
                    </Col>
                    <Col>
                        <a href="/profile">
                            <img src={account} alt="Account"/>
                            <span>Аккаунт</span>
                        </a>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}