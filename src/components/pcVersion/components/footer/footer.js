import React from 'react';
import './footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import visa from '../../../../img/pc/visa.png';
import mc from '../../../../img/pc/mc.png';
import mir from '../../../../img/pc/mir.png';
import {Container, Row, Col} from 'react-bootstrap'

export const Footer = () => {
    return (
        <div className={'footer'}>
            <Container>
                <Row>
                    <Col>
                        <div className="wrapper">
                            <div className="firstCol">
                                <span>Условия использования &nbsp;&nbsp;| &nbsp;&nbsp;<a href="/privacy-policy">Политика конфиденциальности</a> &nbsp;&nbsp;| &nbsp;&nbsp;Как это работает</span>
                                <span><a href="/#">Реквизиты компании</a></span>
                                <span>© 2020 MyStar</span>
                            </div>
                            <div className="secondCol">
                                <span>Мы в соц. сетях:</span>
                                <FontAwesomeIcon icon={['fab', 'vk']} size={'lg'}/>
                                <FontAwesomeIcon icon={['fab', 'instagram']} size={'lg'}/>
                                <FontAwesomeIcon icon={['fab', 'facebook']} size={'lg'}/>
                                <FontAwesomeIcon icon={['fab', 'tiktok']} size={'lg'}/>
                            </div>
                            <div className="thirdCol">
                                <span className="phone">+7 (495) 925-91-11</span>
                                <div className="paySystems">
                                    <img src={visa} alt="Visa"/>
                                    <img src={mc} alt="MasterCard"/>
                                    <img src={mir} alt="Mir"/>
                                </div>
                                <span className={'watermark'}><a href="https://www.divier.ru/">Создание сайта</a> ДиВиЕР</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}