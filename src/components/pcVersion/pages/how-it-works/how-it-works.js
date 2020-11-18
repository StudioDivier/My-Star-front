import React from 'react';
import '../../pages/star-card/star-card.scss';
import {Container, Row, Col} from 'react-bootstrap';
import step1 from '../../../../img/steps/icon1.png';
import step2 from '../../../../img/steps/icon2.png';
import step3 from '../../../../img/steps/icon3.png';
import step4 from '../../../../img/steps/icon4.png';
import step5 from '../../../../img/steps/icon5.png';
import step6 from '../../../../img/steps/icon6.png';


export const How = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div className="policy-wrapper">
                            <h1>Как это работает?</h1>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className={'star-card-pc'}>
                <div className="row how-it-works">
                    <div className="col-md-4 step-wrapper mb-5">
                        <img src={step1} alt="Note"/>
                        <span className="step">
                                        Шаг 1. Заполнение формы заказа
                                    </span>
                        <span className="step-info">
                                        Отправляете нам краткую информацию о человеке или событии
                                    </span>
                    </div>
                    <div className="col-md-4 step-wrapper mb-5">
                        <img src={step2} alt="Call us"/>
                        <span className="step">
                                        Шаг 2. Проверка информации
                        </span>
                        <span className="step-info">
                            Наши модераторы проверяют информацию и дают обратную связь
                        </span>
                    </div>
                    <div className="col-md-4 step-wrapper mb-5">
                        <img src={step3} alt="Credit card"/>
                        <span className="step">
                                        Шаг 3. Оплата поздравления
                                    </span>
                        <span className="step-info">
                                    Оплачиваете услугу. Деньги замораживаются до завершения работы
                                    </span>
                    </div>
                    <div className="col-md-4 step-wrapper mb-5">
                        <img src={step4} alt="Gift"/>
                        <span className="step">
                                        Шаг 4. Подтверждение
                                    </span>
                        <span className="step-info">
                                        Утверждаете выполненную работу
                                    </span>
                    </div>
                    <div className="col-md-4 step-wrapper mb-5">
                        <img src={step5} alt="Gift"/>
                        <span className="step">
                                        Шаг 5. Отправка поздравления
                                    </span>
                        <span className="step-info">
                                        Получаете готовое видео в хорошем качестве
                                    </span>
                    </div>
                    <div className="col-md-4 step-wrapper mb-5">
                        <img src={step6} alt="Gift"/>
                        <span className="step">
                                        Шаг 6. Готовое поздравление
                                    </span>
                        <span className="step-info">
                                        Радуете своих близких необычным подарком
                                    </span>
                    </div>
                </div>
            </Container>
        </>

    )
}