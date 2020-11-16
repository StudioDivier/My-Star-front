import React, {useState} from 'react';
import Modal from 'react-modal';
import {useHttp} from "../../../../hooks/http.hook";
import {useMessage} from "../../../../hooks/message.hook";
import close from '../../../../img/close.png';
import MaskedInput from "react-text-mask";

export const Navbar = () => {

    const {request} = useHttp();
    const message = useMessage();
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        name: '', phone: '', email: ''
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

    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
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

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#141414', color: 'white !important'}}>
                {/*<a className="navbar-brand" href="/">Exprome</a>*/}
                {/*<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"*/}
                {/*        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">*/}
                {/*    <span className="navbar-toggler-icon"></span>*/}
                {/*</button>*/}
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav" style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Главная</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/categories">Категории</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Как это работает</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Как заказть</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Примеры поздравлений</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={openModal}>Я исполнитель</a>
                        </li>

                    </ul>
                </div>
            </nav>
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
                            mask={['+', /[1-9]/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            placeholder={'+7(999)999-99-99'}
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
        </>
    )
}