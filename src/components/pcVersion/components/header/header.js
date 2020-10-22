import React from 'react';
import './header.scss';
import {Container, Row, Col} from 'react-bootstrap';
import lupa from '../../../../img/pc/find_white.svg';

export const Header = ({ login, auth }) => {

    return (
        <div className="pc-header">
            <Container>
                <Row>
                    <Col lg={5} className={'customCol'}>
                        <div className="text-container">
                            <p><span className={'logo'}><a href="/">Exprome</a></span></p>
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
                            <div onClick={() => login()}><span>Вход</span></div>
                            <div onClick={() => auth()}><span style={{color: 'white'}}>Регистрация</span></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}