import React from 'react';
import './header.scss';
import {Container, Row, Col} from 'react-bootstrap';
import lupa from '../../../../img/pc/find_white.svg';

export const Header = () => {
    return (
        <div className="header">
            <Container>
                <Row>
                    <Col lg={5} className={'customCol'}>
                        <div className="text-container">
                            <p><span>MY</span> <span>STAR</span></p>
                            <p>поздравление от звезды</p>
                        </div>
                    </Col>
                    <Col lg={4} className={'customCol'}>
                        <div className="search">
                            <input type="text" placeholder={'Поиск по звездам'}/>
                            <img src={lupa} alt="Лупа"/>
                        </div>
                    </Col>
                    <Col lg={3} className={'customCol'}>
                        <div className="auth">
                            <span>Вход</span>
                            <span>Регистрация</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}