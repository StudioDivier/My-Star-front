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
import MaskedInput from "react-text-mask";
import * as JivoSite from "react-jivosite";

export const Footer = () => {

    const {request} = useHttp();
    const message = useMessage();
    const [isOpen, setIsOpen] = useState(false);
    const [helpIsOpen, setHelpIsOpen] = useState(false);
    const [form, setForm] = useState({
        name: '', phone: '', email: '', comment: ''
    })

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

    Modal.setAppElement(document.querySelector('.App'))

    const openModal = () => {
        setIsOpen(true)
    }
    const openHelpModal = () => {
        setHelpIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
        setHelpIsOpen(false)
    }

    const handleQuery = async () => {
        if (!(form.name.length === 0) && !(form.phone.length === 0) && !(form.email.length === 0)) {
            try {
                const fetchQuery = await request('/api/form-request/star/', 'POST', {
                    name: form.name, phone: form.phone.replace(/[^0-9]/g, ''), email: form.email
                })
                message(fetchQuery[0]);
            } catch (e) {
                message(e)
            }
        } else {
            message(['Введите все необходимые данные!'])
        }
    }

    const handleQuery2 = async () => {
        if (!(form.name.length === 0) && !(form.email.length === 0) && !(form.comment.length === 0)) {
            try {
                const fetchQuery = await request('/api/support/', 'POST', {
                    username: form.name, text: form.comment, email: form.email
                })
                message(fetchQuery[0]);
            } catch (e) {
                message(e)
            }
        } else {
            message(['Введите все необходимые данные!'])
        }
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return (
        <div className={'footer'}>
            <Container>
                <Row>
                    <Col>
                        <div className="wrapper">
                            <div className="firstCol">
                                <span><a href="/terms-of-service">Условия использования</a> &nbsp;&nbsp;| &nbsp;&nbsp;<a
                                    href="/privacy-policy">Политика конфиденциальности</a> &nbsp;&nbsp;| &nbsp;&nbsp;<a
                                    href="/how-it-works">Как это работает</a></span>
                                <div>
                                    <span onClick={openHelpModal}><a href="/#">Связаться с тех. поддержкой</a></span>
                                    <span className={'requisites'}><a href="/requisites-page">Реквизиты компании</a></span>
                                    <span className={'becomeStar'} onClick={openModal}>Я исполнитель</span>
                                </div>
                                <span>© 2020 Exprome</span>
                            </div>
                            <div className="secondCol">
                                <span>Мы в соц. сетях:</span>
                                <a href={'https://vk.com/public200065985'}><FontAwesomeIcon icon={['fab', 'vk']}
                                                                                            size={'lg'}/></a>
                                <a href={'https://www.instagram.com/mystar.media'}><FontAwesomeIcon
                                    icon={['fab', 'instagram']} size={'lg'}/></a>
                                <a href={'https://www.facebook.com/groups/808735033247131'}><FontAwesomeIcon
                                    icon={['fab', 'facebook']} size={'lg'}/></a>
                                <a href={'https://www.tiktok.com/ru/'}><FontAwesomeIcon icon={['fab', 'tiktok']}
                                                                                        size={'lg'}/></a>
                            </div>
                            <div className="thirdCol">
                                <span className="phone">+7 (920) 173-00-00</span>
                                <span className="phone">info@exprome.ru</span>
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
                        <p>Если вы известный человек, и тоже хотели бы записывать поздравления для людей, оставьте
                            заявку и мы с вами свяжемся.</p>
                    </div>
                </div>

                <div className="signInInputs spread">
                    <div className="single-input__wrapper">
                        <span>Ваше имя</span>
                        <input
                            placeholder={'Иван Иванов'}
                            type="text"
                            name={'name'}
                            value={form.name}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="single-input__wrapper">
                        <span>Телефон</span>
                        <MaskedInput
                            mask={[/[1-9]/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            placeholder={'7(999)999-99-99'}
                            type="text"
                            name={'phone'}
                            value={form.phone}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="single-input__wrapper">
                        <span>Эл. почта</span>
                        <input
                            placeholder={'E-mail'}
                            type="text"
                            name={'email'}
                            value={form.email}
                            onChange={changeHandler}
                        />
                    </div>
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
            <Modal
                isOpen={helpIsOpen}
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
                        <span>Связаться с тех. поддержкой</span>
                        <p>Если у вас возникли какие-то вопросы или проблемы в использовании сервиса, оставьте
                            заявку и мы с вами свяжемся.</p>
                    </div>
                </div>

                <div className="signInInputs spread">
                    <div className="single-input__wrapper">
                        <span>Ваше имя</span>
                        <input
                            placeholder={'Иван Иванов'}
                            type="text"
                            name={'name'}
                            value={form.name}
                            onChange={changeHandler}
                        />
                    </div>
                    {/*<div className="single-input__wrapper">*/}
                    {/*    <span>Телефон</span>*/}
                    {/*    <MaskedInput*/}
                    {/*        mask={[/[1-9]/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}*/}
                    {/*        placeholder={'+7(999)999-99-99'}*/}
                    {/*        type="text"*/}
                    {/*        name={'phone'}*/}
                    {/*        value={form.phone}*/}
                    {/*        onChange={changeHandler}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className="single-input__wrapper">
                        <span>Эл. почта</span>
                        <input
                            placeholder={'E-mail'}
                            type="text"
                            name={'email'}
                            value={form.email}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="single-input__wrapper">
                        <span>Ваше обращение</span>
                        {/*<div style={{width: '70%'}}>*/}
                        <textarea
                            name={'comment'}
                            value={form.comment}
                            onChange={changeHandler}
                            placeholder={'У меня проблема...'}
                        />
                        {/*</div>*/}
                    </div>
                    <div className="login__btn-wrapper">
                        <div
                            className="pc-signInButton rateBtn"
                            onClick={handleQuery2}
                        >
                            Подать заявку
                        </div>
                    </div>
                </div>
            </Modal>
            <JivoSite.Widget id={'H8qH8X0wtp'}/>
        </div>
    )
}