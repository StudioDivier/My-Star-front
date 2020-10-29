import React from 'react';
import './bottom-menu.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import home from '../../img/home.svg'
import cats from '../../img/categories.svg'
import orders from '../../img/orders.svg'
import account from '../../img/account.svg'
import {useHistory} from 'react-router-dom';

export const BottomMenu = () => {

    const history = useHistory();

    function homeA() {
        history.push('/')
    }

    function ordersA() {
        history.push('/orders')
    }

    function profileA() {
        history.push('/profile')
    }

    return (
        <div className={'bottom-menu'}>
            <Container>
                <Row>
                    <Col onClick={homeA}>
                        <img src={home} alt="Home"/>
                        <span>Главная</span>
                    </Col>
                    <Col onClick={homeA}>
                        <img src={cats} alt="Categories"/>
                        <span>Категории</span>
                    </Col>
                    <Col onClick={ordersA}>
                        <img src={orders} alt="Orders"/>
                        <span>Мои заказы</span>
                    </Col>
                    <Col onClick={profileA}>
                        <img src={account} alt="Account"/>
                        <span>Аккаунт</span>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}