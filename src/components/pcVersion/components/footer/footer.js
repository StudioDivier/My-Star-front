import React, {useState} from 'react';
import './footer.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import visa from '../../../../img/pc/visa.png';
import mc from '../../../../img/pc/mc.png';
import mir from '../../../../img/pc/mir.png';
import {Container, Row, Col} from 'react-bootstrap';
import Modal from 'react-modal';
import {useHttp} from "../../../../hooks/http.hook";
import {useMessage} from "../../../../hooks/message.hook";
import close from '../../../../img/close.png';

export const Footer = () => {

    const {request} = useHttp();
    const message = useMessage();
    const [isOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: 'auto',
            width: '60%',
            borderRadius: '25px',
            padding: '50px 60px',
            backgroundColor: `white`,
        }
    };

    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }

    const handleQuery = async () => {
        try {
            const fetchQuery = await request('')
        } catch (e) {
            message(e)
        }
    }

    return (
        <div className={'footer'}>
            <Container>
                <Row>
                    <Col>
                        <div className="wrapper">
                            <div className="firstCol">
                                <span>Условия использования &nbsp;&nbsp;| &nbsp;&nbsp;<a href="/privacy-policy">Политика конфиденциальности</a> &nbsp;&nbsp;| &nbsp;&nbsp;Как это работает</span>
                                <div>
                                    <span><a href="/#">Реквизиты компании</a></span>
                                    <span className={'becomeStar'} onClick={openModal}>Я исполнитель</span>
                                </div>
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
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <div className="pc-modal-header rating-header">
                    <div className={'close-btn'} onClick={closeModal}>
                        <img src={close}
                             alt="Close"
                        />
                    </div>
                    <div className="header-text">
                        <span>Участвовать как исполнитель</span>
                        <p>Если вы известный человек, и тоже хотели бы записывать поздравления для людей, оставьте заявку и мы с вами свяжемся.</p>
                    </div>
                </div>
                <div className="signInInputs spread">

                    <div className="login__btn-wrapper">
                        <div
                            className="pc-signInButton rateBtn"
                            onClick={handleQuery}
                        >
                            Подать заявку
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}